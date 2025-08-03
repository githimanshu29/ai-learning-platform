

"use client"

import AppHeader2 from '@/app/workspace/_components/AppHeader2'
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { useParams } from 'next/navigation'
import axios from 'axios'

const Course = () => {
    const { courseId } = useParams();
    const [courseInfo, setcourseInfo] = useState();

    useEffect(() => {
        if (courseId) {
            GetEnrollledCourseById();
        }
    }, [courseId]);

    const GetEnrollledCourseById = async () => {
        const result = await axios.get('/api/enroll-course?courseId=' + courseId);
        setcourseInfo(result.data);
    }

    return (
        <div className='flex flex-col h-screen'>
            <AppHeader2 hideSidebar={true} />
            <div className='flex flex-1 overflow-hidden bg-black'>
                <div className="hidden md:block">
                    <ChapterListSidebar courseInfo={courseInfo} />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <ChapterContent courseInfo={courseInfo} />
                </div>
            </div>
        </div>
    )
}

export default Course


