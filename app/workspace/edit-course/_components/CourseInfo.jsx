import React, { useState } from 'react';
import { Clock, BookOpen, BarChart3, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import usme from '../../../../public/useme.png';

// Main Component for the Course Layout
// This component is designed to be placed within your existing page structure.
// It's self-contained and does not include headers or sidebars.
const CourseInfo = ({course}) => {
  // Check if course and course.courseJson exist before parsing
  let courseLayout = null;
  if (course && course.courseJson) {
      try {
          // Parse the courseJson string into a JavaScript object
          
          // Now access the 'course' property from the parsed object
          courseLayout = course.courseJson;  // Assuming the structure is { course: { ... } }
      } catch (error) {
          console.error("Error parsing courseJson:", error);
          // Handle parsing error, e.g., set courseLayout to a default or show an error message
      }
  }

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
  const handleGenerateContent = () => {
    console.log("Generating content for:", course.title);
    // Add your logic here to call an API or perform an action
  };

  return (
    // The component now consists of only the main course card.
    // The width has been increased to max-w-6xl.
    // You should add margins in your parent layout to space it from the header/sidebar.
    <div className="-mt-7.5 w-full max-w-7xl bg-white rounded-2xl shadow-lg p-3 md:p-4 transition-shadow duration-300 hover:shadow-2xl overflow-hidden md:flex md:gap-8">
      
      {/* Left Column: Image */}
      <div className="md:w-1/3 flex-shrink-0">
        <div className="w-full h-48 md:h-full rounded-xl overflow-hidden border border-slate-200">
          <Image
            src={usme}
            alt={`${courseLayout?.name} course thumbnail`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/fecaca/991b1b?text=Image+Error'; }}
          />
        </div>
      </div>
      
      {/* Right Column: All Content Details */}
      <div className="md:w-2/3 flex flex-col justify-between mt-6 md:mt-0">
        
        {/* Top section with title and description */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 tracking-tight">
            {courseLayout?.name || 'Course Title'}
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-6">
            {courseLayout.description}
          </p>
        </div>
        
        {/* Bottom section with info cards and button */}
        <div>
          {/* Info Cards in a responsive grid */}
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
          
          {/* Generate Button */}
          <button 
            onClick={handleGenerateContent}
            className="w-full bg-violet-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center group"
          >
            Generate Content
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
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
