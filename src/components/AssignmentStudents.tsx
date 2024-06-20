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
      <h3>Students</h3>
      <ul>
        {students.map((student) => (
          <li key={student.userId}>
            Student: {student.userId}, Grade: {student.grade || 'Not graded'}
          </li>
        ))}
      </ul>
    </div>
  );
}