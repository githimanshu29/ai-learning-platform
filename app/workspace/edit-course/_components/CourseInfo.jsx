"use client"

import React, { useState } from 'react';
import { Clock, BookOpen, BarChart3, ArrowRight, Zap, BrainCircuit, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// A reusable InfoCard component with the new glass style
const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/80 rounded-lg p-4 flex items-center space-x-4 transition-all duration-300 hover:border-teal-400/80 hover:bg-slate-800/80">
      <div className="flex-shrink-0 text-teal-400">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div>
        <p className="text-sm text-slate-400 font-medium">{label}</p>
        <p className="text-base font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

// The main, upgraded CourseInfo component
const CourseInfo = ({ course, viewCourse }) => {
  const courseLayout = course?.courseJson;
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  if (!courseLayout) {
    return (
        <div className="flex items-center justify-center h-64 text-white">
            <p>Loading course information...</p>
        </div>
    );
  }

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      await axios.post('/api/generate-course-content', {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid
      });
      router.replace('/workspace');
      toast.success("Course content generated successfully!");
    } catch (error) {
      console.error("Error generating course content:", error);
      toast.error("Failed to generate course content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    // The main container now has a glass effect
    <div className="w-full max-w-7xl bg-slate-900/50 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-2xl p-6 md:p-8 md:flex md:gap-8 relative overflow-hidden">
      
      {/* --- Generating Animation Overlay (Unchanged, it's already great) --- */}
      {isGenerating && (
        <div className="absolute inset-0 bg-slate-900 bg-opacity-90 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-2xl">
            <div className="w-48 h-48 relative">
                <BrainCircuit className="text-teal-400 w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                <div className="absolute inset-0 border-2 border-teal-500 rounded-full animate-pulse-grow"></div>
                <div className="absolute inset-0 border-2 border-teal-400 rounded-full animate-pulse-grow" style={{animationDelay: '0.5s'}}></div>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute bg-sky-400 rounded-full w-3 h-3 animate-orbit" style={{
                        animationDuration: `${3 + i * 0.5}s`,
                        top: `${50 + 45 * Math.sin(i * Math.PI / 4)}%`,
                        left: `${50 + 45 * Math.cos(i * Math.PI / 4)}%`,
                    }}></div>
                ))}
            </div>
            <p className="text-white text-xl font-semibold mt-8 tracking-wider animate-pulse">Generating Knowledge...</p>
            <p className="text-teal-300 mt-2">Please wait while we craft your course.</p>
        </div>
      )}

      {/* Left Column: Image */}
      <div className="md:w-1/3 flex-shrink-0">
        <div className="w-full h-48 md:h-full rounded-xl overflow-hidden border-2 border-slate-700/80">
          <Image
            src={'/useme2.jpg'} // Using a placeholder as local files can't be accessed
            width={600}
            height={600}
            alt={`${courseLayout?.name} course thumbnail`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/1e293b/94a3b8?text=Course'; }}
          />
        </div>
      </div>
      
      {/* Right Column: All Content Details */}
      <div className="md:w-2/3 flex flex-col justify-between mt-6 md:mt-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {courseLayout?.name || 'Course Title'}
          </h1>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            {courseLayout.description}
          </p>
        </div>
        
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <InfoCard 
              icon={<Clock />} 
              label="Duration" 
              value="2 Hours" 
            />
            <InfoCard 
              icon={<BookOpen />} 
              label="Chapters" 
              value={courseLayout.noOfChapters} 
            />
            <InfoCard 
              icon={<BarChart3 />} 
              label="Difficulty" 
              value={courseLayout.level} 
            />
          </div>
          
          {/* --- Upgraded Action Buttons --- */}
          {!viewCourse ? (
            <button 
              onClick={handleGenerateContent}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-cyan-400/40 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center group disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
            >
              <Zap className="mr-2 h-5 w-5" />
              Generate Content
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <Link href={'/course/'+course?.cid} className="w-full">
                <Button className={'w-full py-4 h-auto text-base bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-400/40 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer'}>
                    <PlayCircle className="mr-2"/>Continue Learning
                </Button>
            </Link>
          )}
        </div>
      </div>

      {/* --- Keyframe Animations (Unchanged) --- */}
      <style>{`
        @keyframes pulse-grow { 0% { transform: scale(0.5); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(1.2); opacity: 0; } }
        .animate-pulse-grow { animation: pulse-grow 2s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes orbit { from { transform: rotate(0deg) translateX(70px) rotate(0deg) scale(0.5); opacity: 0.5; } 50% { transform: rotate(180deg) translateX(70px) rotate(-180deg) scale(1); opacity: 1; } to { transform: rotate(360deg) translateX(70px) rotate(-360deg) scale(0.5); opacity: 0.5; } }
        .animate-orbit { transform-origin: -60px -60px; animation: orbit linear infinite; }
      `}</style>
    </div>
  );
};

export default CourseInfo;

