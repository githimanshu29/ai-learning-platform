// // CourseList.jsx

"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import AddNewCourseDialog from "./AddNewCourseDialog";
import CourseCard2 from './CourseCard2'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner';
import axios from 'axios';



const CourseList = ({ courseList,enrolledCourses ,onDataChange }) => {

    console.log('courseList',courseList)
    const handleCourseEnrolled = () => {
        onDataChange();
    };

    if (courseList?.length === 0) {
        return (
            <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
                <Image src={'/online-education.png'} alt='edu' width={80} height={80} />
                <h2 className='my-2 text-lg font-bold'>Look like you haven't created any course yet!</h2>
                <AddNewCourseDialog>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md mt-2">+ Create your first course</Button>
                </AddNewCourseDialog>
            </div>
        );
    }
    

    const DeleteCourse = async(courseId,enrollmentId) => {
        try {
           
            
            const response = await axios.delete('/api/delete-unenrolled-course', {
                

                data: { courseId}
            });

            if (response.data.success) {
            toast.success("Course deleted successfully!");

                onDataChange();
            } else {
                toast.error("Failed to delete course on the server.");
            }

        } catch (error) {
            console.error('An error occurred during deletion:', error);
            toast.error('Failed to delete course. Please try again.');
        }
    };



    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl text-white'>Course List</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-4'>
                {courseList.map((course, index) => (
                    <div key={index} className="flex justify-center w-full">
                    <CourseCard2
                        course={course}
                        onEnrollSuccess={handleCourseEnrolled} 
                        key={course.id}

                        onDelete={() => DeleteCourse(course.cid,course)}
                    />
                </div>
                ))}
            </div>
        </div>
    )
}

export default CourseList;

