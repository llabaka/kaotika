import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  name: string;
}

interface Student {
  userId: string;
  profile: {
    name: {
      fullName: string;
    };
    emailAddress: string;
  };
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.accessToken) {
      const fetchCourses = async () => {
        try {
          const res = await fetch('/api/classroom', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });

          if (!res.ok) {
            throw new Error(`Failed to fetch courses: ${res.statusText}`);
          }

          const data = await res.json();
          console.log('Fetched Courses:', data);
          setCourses(data.courses || []);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchCourses();
    } else {
      console.error('Session or Access Token is not available');
    }
  }, [session]);

  const handleCourseClick = async (courseId: string) => {
    setSelectedCourse(courseId);

    try {
      const res = await fetch(`/api/students?courseId=${courseId}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch students: ${res.statusText}`);
      }

      const data = await res.json();
      console.log('Fetched Students:', data);
      setStudents(data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-white">Welcome {session.user?.email}</h1>
      <h2 className="text-4xl font-bold mb-8 text-white">Your Classroom Courses</h2>
      {courses.length === 0 ? (
        <p className="text-4xl font-bold mb-8 text-white">No courses found.</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li className="text-4xl font-bold mb-8 text-white" key={course.id}>
              <button onClick={() => handleCourseClick(course.id)}>
                {course.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedCourse && (
        <div>
          <h2 className="text-4xl font-bold mb-8 text-white">Students in {selectedCourse}</h2>
          {students.length === 0 ? (
            <p className="text-4xl font-bold mb-8 text-white">No students found.</p>
          ) : (
            <ul>
              {students.map(student => (
                <li className="text-4xl font-bold mb-8 text-white" key={student.userId}>
                  {student.profile.name.fullName} ({student.profile.emailAddress})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}