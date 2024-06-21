import { useState } from 'react';
import AssignmentStudents from './AssignmentStudents';

interface Assignment {
  id: string;
  title: string;
}

interface AssignmentSubmissionsProps {
  courseId: string;
  assignments: Assignment[];
}

export default function AssignmentSubmissions({ courseId, assignments }: AssignmentSubmissionsProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const handleAssignmentClick = (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8 text-yellow">Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li className="text-4xl font-bold mb-8 text-yellow" key={assignment.id} onClick={() => handleAssignmentClick(assignment.id)}>
            {assignment.title}
          </li>
        ))}
      </ul>
      {selectedAssignment && (
        <AssignmentStudents courseId={courseId} assignmentId={selectedAssignment} />
      )}
    </div>
  );
}