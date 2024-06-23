import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { courseId, assignmentId } = req.query;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const classroom = google.classroom({ version: 'v1', auth });

  try {
    const { data } = await classroom.courses.courseWork.studentSubmissions.list({
      courseId: courseId as string,
      courseWorkId: assignmentId as string,
    });

    const students = data.studentSubmissions?.map((submission) => ({
      id: submission.id,
      userId: submission.userId,
      grade: submission.assignedGrade,
    }));

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error });
  }
}