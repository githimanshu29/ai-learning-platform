import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import EnrollCourseList from './_components/EnrollCourseList'

const Workspace = () => {
  return (
    <div>
      <WelcomeBanner />
      <EnrollCourseList />
      <CourseList />

    </div>
  )
}

export default Workspace
