// // EnrollCourseList.jsx

"use client"
import React from 'react';
import axios from 'axios';
import EnrollCourseCard2 from './EnrolledCourseCard2';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import AnimatedSpinner from './AnimatedSpinner';
import Image from 'next/image';

const EnrollCourseList = ({ enrolledCourses, onDataChange }) => {

    const handleDeleteEnrolledCourse = async (enrollmentId) => {
        try {
            toast.success("Course deleted successfully!");
            
            const response = await axios.delete('/api/delete-course', {
                data: { enrollmentId: enrollmentId }
            });

            if (response.data.success) {
                onDataChange();
            } else {
                toast.error("Failed to delete course on the server.");
            }

        } catch (error) {
            console.error('An error occurred during deletion:', error);
            toast.error('Failed to delete course. Please try again.');
        }
    };
    
    if (enrolledCourses.length === 0) {
        return <div className="text-center text-gray-500">You are not enrolled in any courses.</div>;
    }

    return (
        <div className='mt-3 '>
            <h2 className='font-bold text-xl mb-3 text-white'>Enrolled Courses</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 '>
                {enrolledCourses.map((course) => (
                    <EnrollCourseCard2
                        course={course.courses} 
                        enrollCourse={course.enrollCourse} 
                        key={course.enrollCourse.id} 
                        onDelete={() => handleDeleteEnrolledCourse(course.enrollCourse.id)} 
                    />
                ))}
            </div>
        </div>
    )
}

export default EnrollCourseList;


