import { useState, useEffect } from 'react';

interface Topic {
  topicId: string;
  name: string;
}

interface CourseTopicsProps {
  courseId: string;
  onAssignmentClick: (assignmentId: string) => void;
}

export default function CourseTopics({ courseId, onAssignmentClick }: CourseTopicsProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/classroom/${courseId}/topics`)
      .then((res) => res.json())
      .then((data) => setTopics(data.topic));
  }, [courseId]);

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    fetch(`/api/classroom/${courseId}/topics/${topicId}/assignments`)
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  };

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8 text-white">Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li className="text-4xl font-bold mb-8 text-white" key={topic.topicId} onClick={() => handleTopicClick(topic.topicId)}>
            {topic.name}
          </li>
        ))}
      </ul>
      {selectedTopic && (
        <div>
          <h3>Assignments</h3>
          <ul>
            {assignments.map((assignment) => (
              <li className="text-4xl font-bold mb-8 text-white" key={assignment.id}>
                {assignment.title}
                <button onClick={() => onAssignmentClick(assignment.id)}>View Submissions</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}