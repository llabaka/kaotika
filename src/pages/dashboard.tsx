import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import CourseList from '../components/CourseList';
import CourseTopics from '../components/CourseTopics';
import AssignmentSubmissions from '../components/AssignmentSubmissions';
import AssignmentStudents from '@/components/AssignmentStudents';

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  if (!session) {
    return <div>Loading...</div>;
  }

  const handleCourseSelect = async (courseId: string) => {
    
    try {
      const response = await fetch(`/api/classroom/${courseId}/topics`)
      const topics = await response.json();
      console.log(`Course ${courseId} topics:`);
      console.log(topics.topic);
      setTopics(topics.topic)
      setSelectedCourse(courseId);
      setSelectedAssignment(null);
    } catch(err) {
      console.error(`Course topics error: ${err}`);
    }
    finally {
    // End Loading
    }  
  };

  const handleAssignmentClick = (assignmentId: string) => {
    console.log(assignmentId)
    setSelectedAssignment(assignmentId);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <h1 className="text-center text-6xl mb-8 text-yellow-600">Welcome to Kaotika, {session.user?.name}</h1>
        <button
          onClick={handleSignOut}
          className="text-4xl mb-8 px-6 py-6  bg-red-500 border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-700"
        ></button>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {!selectedCourse ? (
            <CourseList onSelectCourse={handleCourseSelect} />
          ) : (
            
            <CourseTopics courseId={selectedCourse} topics={topics} onAssignmentClick={handleAssignmentClick} />
          )}
        </div>
        <div style={{ flex: 2 }}>
          {selectedAssignment && (
            <AssignmentStudents courseId={selectedCourse} assignmentId={selectedAssignment} />
          )}
        </div>
      </div>
    </div>
  );
}