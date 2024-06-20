import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CourseList from '../components/CourseList';
import CourseTopics from '../components/CourseTopics';
import AssignmentSubmissions from '../components/AssignmentSubmissions';

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    setSelectedAssignment(null);
    fetch(`/api/classroom/${courseId}/assignments`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAssignments(data)
      });
      
  };

  const handleAssignmentClick = (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome, {session.user?.name}</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {!selectedCourse ? (
            <CourseList onSelectCourse={handleCourseSelect} />
          ) : (
            <CourseTopics courseId={selectedCourse} onAssignmentClick={handleAssignmentClick} />
          )}
        </div>
        <div style={{ flex: 2 }}>
          {selectedAssignment && (
            <AssignmentSubmissions courseId={selectedCourse as string} assignments={assignments} />
          )}
        </div>
      </div>
    </div>
  );
}