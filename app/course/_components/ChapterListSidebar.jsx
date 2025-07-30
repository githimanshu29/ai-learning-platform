"use client"

import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

const ChapterListSidebar = ({courseInfo}) => {
  const course = courseInfo?.courses;
  const enrollCourse=courseInfo?.enrollCourse;
  const courseContent=courseInfo?.courses?.courseContent;

  const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext);

   
    
        



  return (
    <div className="w-80 bg-secondary h-screen">
        <h2 className="my-3 font-bold text-xl">Chapters ({courseContent?.length}) </h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter,index)=>(
           <AccordionItem value={chapter?.courseData?.chapterName} key={index} onClick={()=>setSelectedChapterIndex(index)}>
           <AccordionTrigger className='text-lg font-medium'>{index+1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
           <AccordionContent asChild>
             <div className='m-2'>
              {chapter?.courseData?.content?.map((topic,index)=>(
                <h2 className="p-3 bg-white my-1 rounded-lg" key={index}>{topic.topic}</h2>

              ))}

             </div>
           </AccordionContent>
         </AccordionItem>

        ))}



       
      </Accordion>
    </div>
  );
};

export default ChapterListSidebar;
