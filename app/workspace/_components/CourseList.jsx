// // CourseList.jsx

"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import AddNewCourseDialog from "./AddNewCourseDialog";
import CourseCard2 from './CourseCard2'
import { LoaderCircle } from 'lucide-react'


const CourseList = ({ courseList, onDataChange }) => {

    const handleCourseEnrolled = () => {
        onDataChange();
    };

    if (courseList?.length === 0) {
        return (
            <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
                <Image src={'/online-education.png'} alt='edu' width={80} height={80} />
                <h2 className='my-2 text-lg font-bold'>Look like you haven't created any course yet!</h2>
                <AddNewCourseDialog>
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md mt-2">+ Create your first course</Button>
                </AddNewCourseDialog>
            </div>
        );
    }
    
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl text-white'>Course List</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 mt-4'>
                {courseList.map((course, index) => (
                    <div key={index} className="flex justify-center w-full">
                    <CourseCard2
                        course={course}
                        onEnrollSuccess={handleCourseEnrolled} 
                    />
                </div>
                ))}
            </div>
        </div>
    )
}

export default CourseList;


// CourseList.jsx

// "use client"
// import { Button } from '@/components/ui/button'
// import React from 'react'
// import Image from 'next/image'
// import AddNewCourseDialog from "./AddNewCourseDialog";
// import CourseCard from './CourseCard'
// import { LoaderCircle } from 'lucide-react'


// const CourseList = ({ courseList, onDataChange }) => {

//     const handleCourseEnrolled = () => {
//         onDataChange();
//     };

//     if (courseList?.length === 0) {
//         return (
//             <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
//                 <Image src={'/online-education.png'} alt='edu' width={80} height={80} />
//                 <h2 className='my-2 text-lg font-bold'>Look like you haven't created any course yet!</h2>
//                 <AddNewCourseDialog>
//                     <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md mt-2">+ Create your first course</Button>
//                 </AddNewCourseDialog>
//             </div>
//         );
//     }
    
//     return (
//         <div className='mt-10'>
//             <h2 className='font-bold text-3xl '>Course List</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
//                 {courseList.map((course, index) => (
//                     <CourseCard 
//                         course={course} 
//                         key={index}
//                         onEnrollSuccess={handleCourseEnrolled} 
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default CourseList;

// "use client"
// import { Button } from '@/components/ui/button'
// import React from 'react'
// import { useState,useEffect } from 'react'
// import Image from 'next/image'
// import AddNewCourseDialog from "./AddNewCourseDialog";
// import axios from 'axios'
// import {useUser} from '@clerk/nextjs'
// import CourseCard from './CourseCard'
// import { LoaderCircle } from 'lucide-react'


// const CourseList = () => {
//   const [courseList, setCourseList] = useState([]);
//   const [loading, setLoading] = useState(true); // Added loading state
//   const { user } = useUser();

//   useEffect(() => {
//     if (user) {
//       GetCourseList();
//     }
//   }, [user]);

//   const GetCourseList = async() => {
//     try {
//       setLoading(true); // Set loading to true before fetching
//       const result = await axios.get('/api/courses');
//       setCourseList(result.data);
//       console.log("Himanshu-course-layout", result.data);
//     } catch (error) {
//       console.error("Failed to fetch courses:", error);
//       // Handle error (e.g., set an error state)
//     } finally {
//       setLoading(false); // Set loading to false after fetching (success or failure)
//     }
//   }

//   // This is the new function that will be called after a course is enrolled
//   const handleCourseEnrolled = () => {
//     // Re-fetch the course list to get the updated data from the server
//     GetCourseList();
//   };

//   // Check for loading state first
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <LoaderCircle className="animate-spin h-10 w-10 text-gray-400" />
//       </div>
//     );
//   }

//   // The rest of your component remains largely the same
//   return (
//     <div className='mt-10'>
//       <h2 className='font-bold text-3xl '>Course List</h2>

//       {courseList?.length === 0 ? (
//         <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary'>
//           <Image src={'/online-education.png'} alt='edu' width={80} height={80} />
//           <h2 className='my-2 text-lg font-bold'>Look like you haven't created any course yet!</h2>
//           <AddNewCourseDialog>
//             <Button className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-3 rounded-lg shadow-md mt-2">+ Create your first course</Button>
//           </AddNewCourseDialog>
//         </div>
//       ) : (
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
//           {courseList.map((course, index) => (
//             <CourseCard
//               course={course}
//               key={index}
//               // Pass the new callback function to the child
//               onEnrollSuccess={handleCourseEnrolled}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default CourseList;