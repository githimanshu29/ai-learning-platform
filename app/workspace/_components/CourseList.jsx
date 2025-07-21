"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

const CourseList = () => {
    const [courseList, setCourseList] = useState([])
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl '>Course List</h2>

        {courseList?.length==0 ? <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>

            <Image src={'/online-education.png'} alt='edu' width={80} height={80}/>
            <h2 className='ny-2 text-lg font-bold'>Look like you haven't created any course yet!</h2>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md mt-2">+ Create your first course</Button>
        </div> : <div>
            List of Courses
            </div>}
      
    </div>
  )
}

export default CourseList
