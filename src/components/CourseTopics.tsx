import { useState, useEffect } from 'react';

interface Topic {
  topicId: string;
  name: string;
}

interface CourseTopicsProps {
  courseId: string;
  topics: Topic[],
  onAssignmentClick: (assignmentId: string) => void;
}

export default function CourseTopics({ courseId, topics, onAssignmentClick }: CourseTopicsProps) {
  const [currentTopics, setTopics] = useState<Topic[]>();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);

  

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    fetch(`/api/classroom/${courseId}/topics/${topicId}/assignments`)
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  };

  useEffect(() => {
    console.log(topics);
    setTopics(topics);
  }, [])
  

  return (
    <div>
      <h1 className="text-4xl mb-8 text-red-500">Topics</h1>
      <ul>
        {currentTopics?.map((topic) => (
          <li className="text-2xl mb-8 text-white" key={topic.topicId} onClick={() => handleTopicClick(topic.topicId)}>
            {topic.name}
          </li>
        ))}
      </ul>
      {selectedTopic && (
        <div>
          <h3 className="text-4xl mb-8 text-red-500">Assignments</h3>
          <ul>
            {assignments.map((assignment) => (
              <li className="text-4xl mb-8 text-white" key={assignment.id}>
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