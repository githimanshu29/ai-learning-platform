import React, { useState } from 'react'
import useme2 from '../../../public/useme2.jpg'
import Image from 'next/image';
import { LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
const BookOpenIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const SparklesIcon = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/>
        <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"/>
    </svg>
);







const CourseCard = ({course}) => {
  const Course = course?.courseJson;
  const [loading, setLoading]=useState(false);

  const onEnrollCourse=async()=>{
    try{
    setLoading(true);
    const result = await axios.post('/api/enroll-course', {
      courseId: course?.cid,

    })
    console.log(result.data);
    if(result.data.res){
      toast.warning('Already enrolled in this course');
      setLoading(false);
      return;
    }
    toast.success("Successfully enrolled in course!");
    setLoading(false);
  } catch(e){
    toast.error("Error enrolling in course. Please try again later.");
    setLoading(false);
  }
   
  }


  return (
    <div className="max-w-sm  bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col font-sans ">
    {/* Course Image */}
    <div className="relative w-full h-48">
      <Image
        className="rounded-t-2xl w-full h-full object-cover"
        src={useme2}
        alt={course?.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/600x400/E0E0E0/757575?text=Image+Not+Found";
        }}
      />
    </div>

    {/* Course Content */}
    <div className="p-5 flex flex-col flex-grow">
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
       {Course?.name}
      </h2>

      <p className="mt-2 text-gray-600 font-normal text-sm flex-grow line-clamp-3">
        {Course?.description || "No description available for this course."}
      </p>

   

      {/* Footer section with chapter count and button */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center text-gray-700">
          <BookOpenIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-sm font-medium">{Course?.noOfChapters}</span>
        </div>
        {
  course?.courseContent?.length ? (
    <Button
      className="inline-flex items-center py-2 px-4 text-sm font-semibold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-colors duration-300 cursor-pointer"
      onClick={onEnrollCourse}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <PlayCircle />}
      Enroll Now
    </Button>
  ) : (
    <Link href={`/workspace/edit-course/${course?.cid}`}>
      <Button variant="outline" className="cursor-pointer">
        <Settings />
        Generate Course
      </Button>
    </Link>
  )
}

      </div>
    </div>
  </div>
  )
}

export default CourseCard;
