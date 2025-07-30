"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// Go up one level from [courseId] to edit-course
import CourseInfo from '../_components/CourseInfo.jsx';
import ChapterTopicList from '../_components/ChapterTopicList.jsx';
import { LoaderCircle } from 'lucide-react';


const EditCourse = ({viewCourse=false}) => {
    const {courseId} = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({});
    const [error, setError] = useState(null); 
    console.log("Himanshu-from page.jsx to confirm cuorse id ",courseId);

    useEffect(() => {
      if (courseId) {
          GetCourseInfo();
      } else {
          setLoading(false);
          setError("No course ID provided.");
      }
  }, [courseId]); 

    const GetCourseInfo=async()=>{
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
          const result = await axios.get(`/api/courses?courseId=${courseId}`);

          console.log("Himanshu-from page.jsx to confirm cuorse id ",courseId);
          console.log("this is from edit-course-id-page.jsx", result.data);
          setCourse(result.data);
      } catch (err) {
          console.error("Error fetching course:", err);
          // Handle the specific 404 error
          if (axios.isAxiosError(err) && err.response && err.response.status === 404) {
              setError("Course not found. Please check the URL.");
          } else {
              setError("Failed to fetch course details.");
          }
      } finally {
          setLoading(false);
      }

    }



    if (loading) {
      return (
          <div className="flex justify-center items-center h-screen">
              <LoaderCircle className="animate-spin text-primary" />
          </div>
      );
  }

  if (error) {
      return (
          <div className="flex justify-center items-center h-screen text-red-500 text-lg font-bold">
              {error}
          </div>
      );
  }

  if (!course || Object.keys(course).length === 0) {
      return (
          <div className="flex justify-center items-center h-screen text-gray-500">
              No course data available.
          </div>
      );
  }






  return (
    <div>
        <CourseInfo course={course} viewCourse={viewCourse} />
        <ChapterTopicList course={course} />

    </div>
  )
}

export default EditCourse;
