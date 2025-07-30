import { Button } from '@/components/ui/button';
import { BookOpenIcon, DeleteIcon,  LoaderCircle, PlayCircle, Settings, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import useme2 from '../../../public/useme2.jpg'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';


const EnrollCourseCard = ({course,enrollCourse, onDelete}) => {
  /*
  how this cousre object looks

  course:{

  cid: "courseId",
  category: "category",

  courseContent: { ... },
  
  courseJson: { 
                    category: "category",
                    description: "Course description",
                    chapters: [{},{},.....],
                    level: "Beginner",
                    noOfChapters: 10,
                    includeVideo: true,
                    name: "Course Name"
                  },
    
  description: "Course description",
  id: 1,
  includeVideo: true,
  level: "Beginner",
  name: "Course Name",
  noOfChapters: 10,
  userEmail: "
  }



  enrollCourse: {
  cid: "courseId",
  completedChapters: {},
  userEmail: "
  id
  }
  
  */

  if (!course || !enrollCourse) {
    return null; // or some fallback UI
  }



  const Course = course.courseJson;

  const CalculatePerProgress =()=>{
    return (enrollCourse?.completedChapters?.length??0 /course?.courseContent?.length)*100;

  }







  return (
    <div className="max-w-sm  bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col font-sans ">
    {/* Course Image */}
    <div className="relative w-full h-48">
      <Image
        className="rounded-t-2xl w-full h-full object-cover"
        src={useme2}
        alt={Course?.name|| "Course Image"}
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

      <div className='mt-3 border p-2 rounded-lg bg-gray-50'>

         <h2 className='flex justify-between text-sm text-primary '> Progress <span>{CalculatePerProgress()}%</span></h2>
      <Progress  value={CalculatePerProgress()}/>

      <Link href={'/workspace/view-course/'+course?.cid} >

      <Button className={'w-full mt-3 cursor-pointer'}><PlayCircle/>Continue Learning</Button>
      </Link>
      </div>

      {/* Footer section with chapter count and button */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center text-gray-700">
          <BookOpenIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-sm font-medium">{Course?.noOfChapters}</span>
          
        </div>

        <Button className="inline-flex items-center py-2 px-4 text-sm font-semibold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-colors duration-300 cursor-pointer"  onClick={onDelete} >
          <Trash/>

        </Button>

      
      </div>
    </div>
  </div>
  )
}

export default EnrollCourseCard
