import { Readable } from 'stream';
import { GOOGLE_DRIVE_ID, GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/server";
import { google } from 'googleapis';

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Extraer los campos del formulario
    const nombre = formData.get('nombreD');
    const dni = formData.get('dniD');
    const monto = formData.get('montoD');
    const fecha = formData.get('fechaD');
    const medio = formData.get('medioD');
    const file = formData.get('comprobante'); // Obtener el archivo

    // Verificar que el archivo se recibió correctamente
    if (!file || typeof file === 'string') {
      throw new Error("No se recibió un archivo válido.");
    }

    // Convertir el archivo en un Buffer
    const fileBuffer = await file.arrayBuffer();
    const fileStream = Readable.from(Buffer.from(fileBuffer));

    // ---------------------------
    // Subir archivo a Google Drive
    // ---------------------------
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    await auth.authorize();
    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
      name: `${Date.now()}_${file.name}`, // Nombre único
      parents: [GOOGLE_DRIVE_ID], // carpeta en Drive
    };

    const media = {
      mimeType: file.type,
      body: fileStream,
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id,webViewLink',
    });

    // ---------------------------
    // Agregar datos a Google Sheets
    // ---------------------------

    // Obtener la fecha y hora actual en Argentina (UTC-3)
    const fechaActual = new Date();
    const formatoFecha = new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(fechaActual);

    // Autenticación para Sheets
    const authSheet = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    await authSheet.authorize();
    const sheets = google.sheets({ version: 'v4', auth: authSheet });

    // Insertar la fila en la hoja (ajusta el nombre del rango/hoja si es necesario)
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'InformaTuPago!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            formatoFecha,                   // Fecha y hora actual
            nombre,                         // Nombre
            dni,                            // DNI
            monto,                          // Monto
            fecha,                          // Fecha de pago
            medio,                          // Medio de pago utilizado
            driveResponse.data.webViewLink, // Link del archivo
          ],
        ],
      },
    });

    // Responder con éxito
    return new Response(
      JSON.stringify({ success: true, fileLink: driveResponse.data.webViewLink }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error("Error en la API:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};