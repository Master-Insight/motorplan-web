import { Readable } from 'stream';
import { GOOGLE_DRIVE_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/server";
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

    console.log("Datos recibidos:", {
      nombre,
      dni,
      monto,
      fecha,
      medio,
      file: file.name,
    });

    // Autenticación con Google Drive
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/^"|"$/g, ''),
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    // Verificar la autenticación
    await auth.authorize();
    console.log("Autenticación exitosa con Google Drive");

    const drive = google.drive({ version: 'v3', auth });

    // Subir el archivo a Google Drive
    const fileMetadata = {
      name: `${Date.now()}_${file.name}`, // Nombre único para evitar colisiones
      parents: [GOOGLE_DRIVE_ID], // ID de la carpeta en Drive
    };

    const media = {
      mimeType: file.type,
      body: fileStream, // Usar el stream del archivo
    };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id,webViewLink',
    });

    console.log("Archivo subido a Drive:", driveResponse.data.webViewLink);

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