import { google, classroom_v1 } from 'googleapis';

// Función para obtener el perfil del usuario en Google Classroom
export async function getClassroomUserId(accessToken: string): Promise<classroom_v1.Schema$UserProfile | null> {
  const classroom = google.classroom({
    version: 'v1',
    auth: accessToken,
  });

  try {
    const response = await classroom.userProfiles.get({
      userId: 'me', // 'me' obtiene el perfil del usuario autenticado
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return null;
  }
}