import { Readable } from 'stream';
import { GOOGLE_DRIVE_ID, GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/server"
import { google } from 'googleapis';

// Api: POST : escritura de datos en la planilla HOJA "Consultas"
export const POST = async ({ request }) => {
  try {
    const formData = await request.formData(); // Usar formData en lugar de json

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
    const fileBuffer = await file.arrayBuffer(); // Convertir a ArrayBuffer
    const fileStream = Readable.from(Buffer.from(fileBuffer)); // Convertir a Strem (de node)

    const data = {
      nombre,
      dni,
      monto,
      fecha,
      medio,
      file: file ? file.name : "No se recibió archivo",
    }
    console.log('Clave privada inicial:', GOOGLE_PRIVATE_KEY);
    console.log('Clave privada:', GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''));

    const key = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, '')
    // Obtener la fecha y hora actual en hora local de Argentina (UTC-3)
    // const fechaActual = new Date();
    // const formatoFecha = new Intl.DateTimeFormat('es-AR', {
    //   dateStyle: 'short',
    //   timeStyle: 'short',
    //   timeZone: 'America/Argentina/Buenos_Aires',
    // }).format(fechaActual);

    // Autenticación con Google Drive ------------------
    // Tiene que tener la carpeta compartida al "email de servicio"
    const authDrive = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      key,
      ['https://www.googleapis.com/auth/drive'], // Aquí defines el alcance
    );
    const drive = google.drive({ version: 'v3', authDrive });

    // Se asigna nombre y ubicacion donde guardar
    const fileMetadata = {
      name: `${file.name}_${Date.now()}`, // Nombre único para evitar colisiones
      parents: [GOOGLE_DRIVE_ID], // ID de la carpeta en Drive -- 1avWf_7jXWK4quj9T63h71MbVGwb7dUr9
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

    console.log("Archivo subido a Drive:", driveResponse.data.webViewLink);

    // Autenticación con Google Sheets ------------------
    // Tiene que tener la carpeta compartida al "email de servicio"
    // const authSheet = new google.auth.JWT(
    //   GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   null,
    //   GOOGLE_PRIVATE_KEY,
    //   ['https://www.googleapis.com/auth/spreadsheets'],
    // );

    // const sheets = google.sheets({ version: 'v4', authSheet });

    // // Insertar datos en la hoja
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: GOOGLE_SHEETS_ID,
    //   range: 'InformaTuPago!A:F', // Ajusta según tu hoja
    //   valueInputOption: 'USER_ENTERED',
    //   requestBody: {
    //     values: [[formatoFecha, nombreD, dniD, montoD, fechaD, medioD]],
    //   },
    // });


    // Responder con éxito ------------------
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error("Error en la API:", error);
    // Responder con error
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
