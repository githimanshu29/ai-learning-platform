// page.jsx

"use client"
import React, { useEffect, useState } from 'react';
import WelcomeBanner from './_components/WelcomeBanner';
import CourseList from './_components/CourseList';
import EnrollCourseList from './_components/EnrollCourseList';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { LoaderCircle } from 'lucide-react';
import AnimatedSpinner from './_components/AnimatedSpinner';
import AnimatedBackground from '../AnimatedBackground'

const Workspace = () => {
  const [courseList, setCourseList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const [coursesResult, enrolledResult] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/enroll-course'),
      ]);
      setCourseList(coursesResult.data);
      setEnrolledCourses(enrolledResult.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllCourses();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AnimatedSpinner />
      </div>
    );
  }

  return (
    <div>
      {/* <AnimatedBackground /> */}
      <WelcomeBanner />
      <EnrollCourseList enrolledCourses={enrolledCourses} onDataChange={fetchAllCourses} />
      <CourseList courseList={courseList} onDataChange={fetchAllCourses} />
    </div>
  );
};

export default Workspace;


