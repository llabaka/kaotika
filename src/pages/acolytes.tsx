import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import {Slider} from "@nextui-org/react";
import KaotikaButton from '@/components/KaotikaButton';

interface Course {
  id: string;
  name: string;
}

interface Student {
	courseId: string;
	profile: {
		id: string;
		name: {
			familyName: string;
			fullName: string;
			givenName: string;
		}
	}
	userId: string;
}

const AcolytesPage = () => {
	const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
	const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (!session) return;
    const accessToken = session.accessToken;
    console.log('Access Token:', accessToken);
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/classroom/courses/');
        const data = await res.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [session]);

	useEffect(() => {
		if (!session) return;
    const accessToken = session.accessToken;
    console.log('Access Token:', accessToken);
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/classroom/courses/${selectedCourse}/students`);
        const data = await res.json();
        setStudents(data.students);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
	}, [selectedCourse])
	

	const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleClick = () => {

  }

	if (loading) {
		return <Loading />;
	}

  return (
		<Layout>
      <div className="flex justify-center mt-8">
				{!selectedCourse && (
					<div className="relative inline-block w-1/2">
						<select
							className="block w-full bg-gray-800 text-white border border-gray-800 rounded-md py-4 pl-6 pr-10 text-4xl"
							onChange={(e) => handleCourseSelect(e.target.value)}
							value={selectedCourse || ''}
						>
							<option value="" disabled>
								{loading ? 'Loading courses...' : 'Select a course'}
							</option>
							{courses?.map((course) => (
								<option key={course.id} value={course.id}>
									{course.name}
								</option>
							))}
						</select>
					</div>)}
				{selectedCourse && (
              <>
                <Table 
                  color="warning"
                  selectionMode="none" 
                  classNames={{
                    table: "text-xl",
                    td: "text-xl",
                    tr: "text-xl",
                    tbody: "text-xl"

                  }} 
                  aria-label="Kaotika Students">
                  <TableHeader>
                    <TableColumn className="mb-4 text-center">ID</TableColumn>
                    <TableColumn className="mb-4 text-center">NAME</TableColumn>
                    <TableColumn className="mb-4 text-center">GOLD</TableColumn>
                    <TableColumn className="mb-4 text-center">XP POINTS</TableColumn>
										<TableColumn className="mb-4 text-center">VALIDATE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.userId}>
                        <TableCell >{student.userId}</TableCell>
                        <TableCell className="text-center"><span>{student.profile.name.fullName}</span></TableCell>
                        <TableCell className='min-w-48'>
													<Slider 
														size='md'
														label="Gold" 
														step={5} 
														maxValue={500} 
														minValue={0} 
														defaultValue={0}
                            classNames={{
                              base: "max-w-md",
                              label: "text-2xl",
                              value: "text-2xl"
                            }}
													/>
												</TableCell>
                        <TableCell className='min-w-48'>
												<Slider 
													label="Experience" 
													step={100} 
													maxValue={1000} 
													minValue={0} 
													defaultValue={0}
													classNames={{
                            base: "max-w-md",
                            label: "text-2xl",
                            value: "text-2xl"
                          }}
												/>
												</TableCell>
												<TableCell ><KaotikaButton text={'SEND'} handleClick={() => handleClick()} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
    	</div>
    </Layout>
  )
}

export default AcolytesPage