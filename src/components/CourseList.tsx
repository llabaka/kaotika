import { useEffect, useState } from 'react';

interface Course {
  id: string;
  name: string;
}

interface CourseListProps {
  onSelectCourse: (courseId: string) => void;
}

export default function CourseList({ onSelectCourse }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/classroom/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  return (
    <div>
      <h2 className="text-center text-4xl mb-8 text-white">Classroom Courses</h2>
      <ul className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <li key={course.id} className="border rounded-lg p-4" onClick={() => onSelectCourse(course.id)}>
            <div className="flex justify-between items-center">
              <span className="text-3xl mb-8 text-white">{course.name}</span> 
            </div> 
          </li>
        ))}
      </ul>
    </div>
  );
}