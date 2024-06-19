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
    photoUrl?: string;
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
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/3 p-4 mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Your Classroom Courses</h2>
        <div className="h-96 overflow-y-auto bg-gray-800 p-4 rounded-md">
          {courses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            <ul>
              {courses.map(course => (
                <li key={course.id} className="mb-2">
                  <button
                    onClick={() => handleCourseClick(course.id)}
                    className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                  >
                    {course.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-2/3 p-4">
        {selectedCourse && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Students in {selectedCourse}</h2>
            {students.length === 0 ? (
              <p>No students found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {students.map(student => (
                    <div className="bg-medievalGray p-4 rounded-md flex items-center border-4 border-medievalGold shadow-lg">
                    {student.profile.photoUrl && (
                      <img
                        src={student.profile.photoUrl}
                        alt={student.profile.name.fullName}
                        className="w-16 h-16 rounded-full mr-4 border-2 border-medievalGold"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-medievalGold">{student.profile.name.fullName}</h3>
                      <p>{student.profile.emailAddress}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}