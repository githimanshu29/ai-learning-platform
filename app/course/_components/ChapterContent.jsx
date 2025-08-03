"use client"

import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { HomeIcon, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

const ChapterContent = ({courseInfo}) => {
  const {selectedChapterIndex} = useContext(SelectedChapterIndexContext)
  const courseContent = courseInfo?.courses?.courseContent;
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const content = courseContent?.[selectedChapterIndex]?.courseData?.content;

  return (
   
    <div className='p-4 md:p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-white'>
          {selectedChapterIndex + 1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
        </h2>
        <Link href={'/workspace'}>
          <Button className='bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:border-teal-400 hover:text-white transition-all duration-200'>
            <HomeIcon className='h-5 w-5'/>
          </Button>
        </Link>
      </div>

      {/* Related Videos Section */}
      <div>
        <h3 className='my-4 font-bold text-xl text-teal-400 flex items-center gap-2'>
          <Video />
          Related Videos
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {videoData?.map((video, index) => index < 3 && (
            <div key={index} className='rounded-xl overflow-hidden border-2 border-slate-700/80 shadow-lg hover:shadow-cyan-400/20 hover:border-cyan-400/80 transition-all duration-300'>
              <YouTube
                videoId={video?.videoId}
                opts={{
                  width: '100%',
                  height: '250',
                }}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className='mt-10'>
        {content?.map((data, index) => (
         
          <div key={index} className='mt-8 p-6 md:p-8 bg-cyan-950 backdrop-blur-lg border border-slate-700/80 rounded-2xl'> 
            <h2 className='font-bold text-2xl text-teal-300 mb-4'>{index + 1}. {data?.topic}</h2>
            
            {/* This div will render the HTML content with proper styling */}
            <div 
              className='prose-styles  '
              dangerouslySetInnerHTML={{__html: data?.htmlContent}}
            ></div>
          </div>
        ))}
      </div>

     
      <style jsx global>{`
        .prose-styles {
          color: #d1d5db; /* Light gray text */
          line-height: 1.75;
        }
        .prose-styles h1, .prose-styles h2, .prose-styles h3, .prose-styles h4, .prose-styles h5, .prose-styles h6 {
          color: #ffffff; /* White headings */
          margin-bottom: 1rem;
        }
        .prose-styles a {
          color: #2dd4bf; /* Teal links */
          text-decoration: none;
          transition: color 0.2s;
        }
        .prose-styles a:hover {
          color: #5eead4;
        }
        .prose-styles strong {
          color: #f9fafb; /* Slightly brighter for bold */
        }
        .prose-styles pre {
          background-color: #1e293b; /* Dark blue for code blocks */
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid #334155;
        }
        .prose-styles code {
          background-color: #334155;
          color: #f1f5f9;
          padding: 0.2em 0.4em;
          margin: 0;
          font-size: 85%;
          border-radius: 0.3rem;
        }
        .prose-styles pre code {
          background-color: transparent;
          padding: 0;
        }
        .prose-styles ul, .prose-styles ol {
            padding-left: 1.5rem;
        }
        .prose-styles li::marker {
            color: #5eead4;
        }
      `}</style>
    </div>
  )
}

export default ChapterContent;

