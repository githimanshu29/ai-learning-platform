"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EnrollCourseCard from './EnrollCourseCard';
import useme2 from '../../../public/useme2.jpg'
import { toast } from 'sonner';



const EnrollCourseList = () => {

    useEffect(()=>{

    },[])
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        GetEnrollledCourse();
    },[]);




    const GetEnrollledCourse = async()=>{
        const result = await axios.get('/api/enroll-course');
        console.log("himanshu-getenrolled-data-only-result-data",result);

        console.log("himanshu-getenrolled-data",result.data);
        setEnrolledCourses(result.data);

    }
    // deleting a enrolledcourse

    const handleDeleteEnrolledCourse = async (enrollmentId) => {
      try{
        const response = await axios.delete('/api/delete-course',{
          data: {enrollmentId: enrollmentId }
        });

        if(response.data.success){
          setEnrolledCourses((prevCourses) => 
            prevCourses.filter(course => course.id !==enrollmentId)
          );
          toast.success("Course deleted successfully");
        } else{
          toast.error("Failed to delete course");
        }



      } catch (error) {
        console.error('An error occurred during deletion:', error);
        toast.error('Failed to delete course. Please try again.');

      }
    };


    if (loading) {
      return <div className="flex justify-center items-center h-screen"><LoaderCircle className="animate-spin" /></div>;
    }
  
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }
  
    if (enrolledCourses.length === 0) {
      return <div className="text-center text-gray-500">You are not enrolled in any courses.</div>;
    }
  


    






  return  (
    <div className='mt-3 '>
      <h2 className='font-bold text-xl mb-3'>Continue Learning</h2>
 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 '>
      { enrolledCourses?.map((course, index) => (
        <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={course?.enrollCourse.id} onDelete ={()=>handleDeleteEnrolledCourse(course?.enrollCourse.id)} />

      )) }
      </div>
    </div>
  )
}

export default EnrollCourseList
