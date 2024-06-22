import { useEffect, useState } from 'react';

interface StudentSubmission {
  id: string;
  userId: string;
  grade?: number;
}

interface AssignmentStudentsProps {
  courseId: string;
  assignmentId: string;
}

export default function AssignmentStudents({ courseId, assignmentId }: AssignmentStudentsProps) {
  const [students, setStudents] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    fetch(`/api/classroom/${courseId}/assignments/${assignmentId}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, [courseId, assignmentId]);

  return (
    <div>
      <h1 className="text-4xl mb-8 text-yellow-500">STUDENTS</h1>
      <ul>
        {students.map((student) => (
          <li className="text-2xl mb-4 text-white cursor-pointer hover:text-yellow-500" key={student.userId}>
            Student: {student.userId}, Grade: {student.grade || 'Not graded'}
          </li>
        ))}
      </ul>
    </div>
  );
}