import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import Loading from '../../../components/Loading';

const CoursePage: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { courseId } = router.query;
    const [course, setCourse] = useState<any>(null);
    const [topics, setTopics] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
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

  if (status === 'loading' || loading) {
    return <Loading />;
  }

  if (!session || !course) return null;

  return (
    <Layout>
      <div className="mt-8 text-center">
        <h1 className="text-4xl mb-4">{course.name}</h1>
        <div className="flex">
          <div className="w-1/3 p-4">
            <h2 className="text-4xl mb-4">Topics</h2>
            <div className="relative inline-block">
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
          </div>
          <div className="w-1/3 p-4">
          {selectedTopic && (
              <>
                <h2 className="text-4xl mb-4">Assignments</h2>
                <div className="relative inline-block">
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
                </div>
              </>
            )}
          </div>
          <div className="w-1/3 p-4">
          {selectedAssignment && (
              <>
                <h2 className="text-4xl mb-4">Student Grades</h2>
                <ul>
                  {studentsGrades.length > 0 ? (
                    studentsGrades.map((grade) => (
                      <li key={grade.id} className="mb-2 text-lg text-white">
                        {grade.studentName} - Grade: {grade.grade}
                      </li>
                    ))
                  ) : (
                    <li className="text-lg text-white">No grades found</li>
                  )}
                </ul>
              </>
            )}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;