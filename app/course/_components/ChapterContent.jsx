import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

const ChapterContent = ({courseInfo}) => {

  const course = courseInfo?.courses;
  const enrollCourse=courseInfo?.enrollCourse;
  const courseContent=courseInfo?.courses?.courseContent;
  const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext)
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo
  // console.log("video id", videoData.videoId)
  const content = courseContent?.[selectedChapterIndex]?.courseData?.content


  return (
    <div className='p-4'>
      <Link href={'/workspace'}>
         
         <Button className='mt-1 mb-2 cursor-pointer w-15'><HomeIcon/></Button></Link>

        <h2 className='text-2xl font-bold'>
          {selectedChapterIndex+1}. {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>

          <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
            {
              videoData?.map((video,index)=> index<3 &&(
                <div key={index}>
                  <YouTube

                  videoId={video?.videoId}

                  opts={{
                    height:'250',
                     width:'360',
               }}             
                  />
            </div>

            ))
            }
          </div>
          <div>
            {
              content?.map((data, index) => (
                <div key={index} className='mt-10 p-5 bg-secondary rounded-2xl'> 
                  <h2 className='font-bold text-2xl text-primary'>{index+1}. {data?.topic}</h2>
                  {/* //<p>{topic?.topic?.content}</p> */}

                  <div dangerouslySetInnerHTML={{__html:data?.htmlContent}}
                  style={{
                    lineHeight:'2'
                  }}
                  
                  ></div>

                </div>
              ))
            }
          </div>
      
    </div>
  )
}

export default ChapterContent
