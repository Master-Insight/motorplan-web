import { Readable } from 'stream';
import { GOOGLE_DRIVE_ID_RRHH, GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/server";
import { google } from 'googleapis';

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Extraer datos del formulario
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const experiencia = formData.get('experiencia');
    const file = formData.get('cv'); // Archivo adjunto (CV)

    // Validar archivo
    if (!file || typeof file === 'string') {
      throw new Error("No se recibió un archivo válido.");
    }

    // Convertir archivo en Buffer y Stream
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
      parents: [GOOGLE_DRIVE_ID_RRHH], // Carpeta en Drive
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
    const fechaActual = new Date();
    const formatoFecha = new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(fechaActual);

    const authSheet = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    await authSheet.authorize();
    const sheets = google.sheets({ version: 'v4', auth: authSheet });

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Postulaciones!A:E', // Ajustar si es necesario
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            formatoFecha,                   // Fecha y hora de postulación
            nombre,                         // Nombre
            email,                          // Email
            telefono,                       // Teléfono
            experiencia,                    // Puesto de interes
            driveResponse.data.webViewLink, // Link al CV
          ],
        ],
      },
    });

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
