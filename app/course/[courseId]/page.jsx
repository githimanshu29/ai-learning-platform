"use client"

import AppHeader2 from '@/app/workspace/_components/AppHeader2'
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'
const Course = () => {

    const {courseId} = useParams();
    const [courseInfo, setcourseInfo] = useState();



    useEffect(()=>{
        GetEnrollledCourseById();
    },[]);

    const GetEnrollledCourseById = async()=>{
        const result = await axios.get('/api/enroll-course?courseId='+courseId);
        console.log("himanshu-getenrolled-data-only-result-data",result);

        console.log("himanshu-getenrolled-data",result.data);
        setcourseInfo(result.data);

    }
    


  return ( 
    <div>
        <AppHeader2 hideSidebar={true} />
        <div className='bg-black'>
        <div className='flex gap-10'>
            <ChapterListSidebar courseInfo={courseInfo}/>
            <ChapterContent courseInfo={courseInfo}/>
        </div>
        </div>

      
    </div>
  )
}

export default Course


