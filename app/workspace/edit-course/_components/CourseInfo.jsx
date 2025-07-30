import React, { useState } from 'react';
import { Clock, BookOpen, BarChart3, ArrowRight, Zap, BrainCircuit, PlayCircle } from 'lucide-react';

import Image from 'next/image';
import usme from '../../../../public/useme.png';
import useme2 from '../../../../public/useme2.jpg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Main Component for the Course Layout
// This component is designed to be placed within your existing page structure.
// It's self-contained and does not include headers or sidebars.
const CourseInfo = ({course, viewCourse}) => {
  const courseLayout = course?.courseJson;
  const [isGenerating, setIsGenerating] = useState(false);
  // Check if course and course.courseJson exist before parsing
  const router = useRouter();
  
  // if (course && course.courseJson) {
  //     try {
  //         // Parse the courseJson string into a JavaScript object
          
  //         // Now access the 'course' property from the parsed object
  //         courseLayout = course.courseJson;  // Assuming the structure is { course: { ... } }
  //     } catch (error) {
  //         console.error("Error parsing courseJson:", error);
  //         // Handle parsing error, e.g., set courseLayout to a default or show an error message
  //     }
  // }

  // Add checks to ensure courseLayout and its properties exist before rendering
  if (!courseLayout) {
      return <p>Loading course information or course data is unavailable...</p>;
  }
  // Mock data for the course. In a real app, this would likely come from props or an API.

  // const [course, setCourse] = useState({
  //   title: 'Python Programming for Beginners',
  //   description: 'A comprehensive introductory course to Python programming, designed for individuals with little to no prior coding experience. Learn the fundamentals of Python syntax, data structures...',
  //   imageUrl: 'https://placehold.co/600x600/a78bfa/ffffff?text=Python',
  //   duration: '2 Hours',
  //   chapters: '12 Chapters',
  //   difficulty: 'Beginner',
  // });





  // Handler for the generate button click
  const handleGenerateContent = async() => {
    setIsGenerating(true);
    // call api to generate content
     

    try{
      //await new Promise(resolve => setTimeout(resolve, 5000));
    const result = await axios.post('/api/generate-course-content', {
      courseJson: courseLayout,
      courseTitle: course?.name,
       courseId: course?.cid

    });
    console.log( "Himanshu---course--layout",result.data);
   
    router.replace('/workspace');
    toast.success("Course content generated successfully!");
    } catch (error) {
      console.error("Error generating course content:", error);
      // Handle error, e.g., show a notification or alert
     toast.error("Failed to generate course content. Please try again.");

    }
    finally {
      setIsGenerating(false);
    }
   
  };




  return (
    // The main container is relative to position the absolute overlay inside it.
    <div className="font-sans bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-shadow duration-300 hover:shadow-2xl overflow-hidden md:flex md:gap-8 relative">
        
        {/* --- Generating Animation Overlay --- */}
        {isGenerating && (
          <div className="absolute inset-0 bg-slate-900 bg-opacity-90 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-2xl">
            <div className="w-48 h-48 relative">
                <BrainCircuit className="text-violet-400 w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                <div className="absolute inset-0 border-2 border-violet-500 rounded-full animate-pulse-grow"></div>
                <div className="absolute inset-0 border-2 border-violet-400 rounded-full animate-pulse-grow" style={{animationDelay: '0.5s'}}></div>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute bg-sky-400 rounded-full w-3 h-3 animate-orbit" style={{
                        animationDuration: `${3 + i * 0.5}s`,
                        top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
                        left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`,
                    }}></div>
                ))}
            </div>
            <p className="text-white text-xl font-semibold mt-8 tracking-wider animate-pulse">Generating Knowledge...</p>
            <p className="text-violet-300 mt-2">Please wait while we craft your course.</p>
          </div>
        )}

        {/* Left Column: Image */}
        <div className="md:w-1/3 flex-shrink-0">
          <div className="w-full h-48 md:h-full rounded-xl overflow-hidden border border-slate-200">
            {/* Using a placeholder as I can't access local files like `useme2.jpg`. */}
            <Image
              src={useme2}
              alt={`${courseLayout?.name} course thumbnail`} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/fecaca/991b1b?text=Image+Error'; }}
            />
          </div>
        </div>
        
        {/* Right Column: All Content Details */}
        <div className="md:w-2/3 flex flex-col justify-between mt-6 md:mt-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight">
              {courseLayout?.name || 'Course Title'}
            </h1>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {courseLayout.description}
            </p>
          </div>
          
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <InfoCard 
                icon={<Clock className="text-violet-500" />} 
                label="Duration" 
                value="2 Hours" 
              />
              <InfoCard 
                icon={<BookOpen className="text-sky-500" />} 
                label="Chapters" 
                value={courseLayout.noOfChapters} 
              />
              <InfoCard 
                icon={<BarChart3 className="text-amber-500" />} 
                label="Difficulty" 
                value={courseLayout.level} 
              />
            </div>
            
            {!viewCourse ?<button 
              onClick={handleGenerateContent}
              disabled={isGenerating}
              className="w-full bg-violet-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center group cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Zap className="mr-2 h-5 w-5" />
              Generate Content
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>  : <Link href={'/course/'+course?.cid}><Button className={'w-full cursor-pointer'}><PlayCircle/>Continue Learning</Button></Link> }
          </div>
        </div>

        {/* Add this style block for the animations */}
        <style>{`
          @keyframes pulse-grow {
            0% { transform: scale(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scale(1.2); opacity: 0; }
          }
          .animate-pulse-grow {
            animation: pulse-grow 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(70px) rotate(0deg) scale(0.5); opacity: 0.5; }
            50% { transform: rotate(180deg) translateX(70px) rotate(-180deg) scale(1); opacity: 1; }
            to { transform: rotate(360deg) translateX(70px) rotate(-360deg) scale(0.5); opacity: 0.5; }
          }
          .animate-orbit {
            transform-origin: -60px -60px; /* Adjust based on translateX value */
            animation: orbit linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

// A reusable InfoCard component for displaying key course details.
const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center space-x-3 transition-all duration-300 hover:border-violet-300 hover:shadow-sm">
      <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-base font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default CourseInfo;
