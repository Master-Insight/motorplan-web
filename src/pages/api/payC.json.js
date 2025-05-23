import { GOOGLE_SHEETS_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } from "astro:env/server"
import { google } from 'googleapis';

// Api: POST : escritura de datos en la planilla HOJA "Consultas"
export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    // Leer el cuerpo de la solicitud como JSON
    let { nombreC, dniC, contactoC } = body;

    // Obtener la fecha y hora actual en hora local de Argentina (UTC-3)
    const fechaActual = new Date();
    const formatoFecha = new Intl.DateTimeFormat('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(fechaActual);

    // Autenticación con Google Sheets
    // Tiene que tener el Sheet compartido al "email de servicio"
    const auth = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      GOOGLE_PRIVATE_KEY, // Ajuste para claves privadas
      ['https://www.googleapis.com/auth/spreadsheets'],
    );

    const sheets = google.sheets({ version: 'v4', auth });

    // Insertar datos en la hoja
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'SolicitudDebitoAutomatico!A:D', // Ajusta según tu hoja
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[formatoFecha, nombreC, dniC, contactoC]],
      },
    });

    // Responder con éxito
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error(error);
    // Responder con error
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
