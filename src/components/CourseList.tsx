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
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li className="text-4xl font-bold mb-8 text-white" key={course.id} onClick={() => onSelectCourse(course.id)}>
            {course.name}
          </li>
        ))}
      </ul>
    </div>
  );
}