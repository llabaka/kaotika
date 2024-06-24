import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

interface Assignment {
  title: string;
  maxPoints: number;
}

const CoursePage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { courseId } = router.query;
    const [course, setCourse] = useState<any>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [currentAssignment, setCurrentAssignment] = useState<Assignment>();
    const [studentsGrades, setStudentsGrades] = useState<any[]>([]);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/'); 
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const [courseRes, topicsRes] = await Promise.all([
          fetch(`/api/classroom/courses/${courseId}`),
          fetch(`/api/classroom/courses/${courseId}/topics`)
        ]);

        const courseData = await courseRes.json();
        const topicsData = await topicsRes.json();

        setCourse(courseData.course);
        setTopics(topicsData.topics);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [session, status, router, courseId]);

  const handleTopicSelect = async (topicId: string) => {
    setSelectedTopic(topicId);
    setLoading(true);
    try {
      const res = await fetch(`/api/classroom/courses/${courseId}/topics/${topicId}/assignments`);
      const assignments = await res.json();
      console.log('Assignments:', assignments);
      setAssignments(assignments);
      setSelectedAssignment(null);  // Clear selected assignment when topic changes
      setStudentsGrades([]);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentSelect = async (assignmentId: string) => {
    setSelectedAssignment(assignmentId);
    const currentAssignment = await assignments.filter(assignement => assignement.id === assignmentId)[0];
    setCurrentAssignment(currentAssignment);
    setLoading(true);
    try {                       
      const res = await fetch(`/api/classroom/courses/${courseId}/assignments/${assignmentId}/students`);
      const data = await res.json();
      setStudentsGrades(data);
    } catch (error) {
      console.error('Failed to fetch student grades:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session || !course) return null;

  return (
    <Layout>
      {(loading) ? <Loading /> : null}
      <div className="mt-8 text-center">
        <h1 className="text-4xl mb-4">{course.name}</h1>
        <div className="flex">
          <div className="w-1/2 p-4">
            <h2 className="text-4xl mb-4">Topics</h2>        
                <select
                    className="block w-full bg-gray-800 text-white border py-4 pl-6 pr-10 text-3xl"
                    onChange={(e) => handleTopicSelect(e.target.value)}
                    value={selectedTopic || ''}
                >
                <option value="" disabled>
                    {loading ? 'Loading topics...' : 'Select a topic'}
                </option>
                {topics.map((topic) => (
                    <option key={topic.topicId} value={topic.topicId}>
                    {topic.name}
                    </option>
                ))}
                </select>
          </div>
          <div className="w-1/2 p-4">
          {selectedTopic && (
              <>
                <h2 className="text-4xl mb-4">Assignments</h2>
                <select
                    className="block w-full bg-gray-800 text-white border py-4 pl-6 pr-10 text-3xl"
                    onChange={(e) => handleAssignmentSelect(e.target.value)}
                    value={selectedAssignment || ''}
                >
                <option value="" disabled>
                    {loading ? 'Loading assignments...' : 'Select a assignment'}
                </option>
                {assignments
                  .filter((assignment) => assignment.maxPoints) 
                  .map((assignment) => (
                    <option key={assignment.id} value={assignment.id}>
                      {assignment.title} - Max Points: {assignment.maxPoints}
                    </option>
                       
                  ))}
                </select> 
              </>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-full p-4">
          {selectedAssignment && (
              <>
                <h2 className="text-4xl mb-4">Student Grades</h2>
                <Table 
                  color="warning"
                  selectionMode="single"  
                  aria-label="Kaotika Students">
                  <TableHeader>
                    <TableColumn className="text-3xl mb-4 text-center">NAME</TableColumn>
                    <TableColumn className="text-3xl mb-4 text-center">TASK</TableColumn>
                    <TableColumn className="text-3xl mb-4 text-center">MAX POINTS</TableColumn>
                    <TableColumn className="text-3xl mb-4 text-center">POINTS</TableColumn>
                    <TableColumn className="text-3xl mb-4 text-center">PENDING</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {studentsGrades.map((grade,index) => (
                      <TableRow key={index}>
                      <TableCell>{grade.studentName}</TableCell>
                      <TableCell className="text-3xl mb-4 text-center">{currentAssignment?.title}</TableCell>
                      <TableCell className="text-3xl mb-4 text-center">{currentAssignment?.maxPoints}</TableCell>
                      <TableCell className="text-3xl mb-4 text-center">{grade.grade}</TableCell>
                      <TableCell className="text-3xl mb-4 text-center">TRUE</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;