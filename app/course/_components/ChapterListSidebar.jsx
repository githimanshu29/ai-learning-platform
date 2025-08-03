

import React, { useContext, useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

const ChapterListSidebar = ({ courseInfo, onChapterSelect }) => {
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const handleChapterSelect = (index) => {
    setSelectedChapterIndex(index);
    if(onChapterSelect) {
        onChapterSelect(index);
    }
  };

  return (
    <div className="h-screen min-w-[300px] w-full md:w-80 bg-slate-900/50 backdrop-blur-lg border-r border-slate-700/80 p-4 overflow-y-auto">
      <h2 className="my-3 font-bold text-xl text-white">Chapters ({courseContent?.length})</h2>
      
      <Accordion 
        className="w-full" 
        type="single" 
        collapsible 
        defaultValue={courseContent?.[0]?.courseData?.chapterName}
      >
        {courseContent?.map((chapter, index) => (
          <AccordionItem 
            value={chapter?.courseData?.chapterName} 
            key={index}
            className="border-b border-slate-700/80"
          >
            <AccordionTrigger 
              onClick={() => handleChapterSelect(index)}
              className={`text-lg font-medium text-slate-300 hover:text-white transition-colors [&[data-state=open]]:text-teal-400 ${selectedChapterIndex === index && 'text-teal-400'}`}
            >
              <span className="text-left w-full whitespace-normal">{index + 1}. {chapter?.courseData?.chapterName}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className='mt-2 flex flex-col gap-1'>
                {chapter?.courseData?.content?.map((topic, topicIndex) => (
                  <div 
                    key={topicIndex}
                    onClick={() => setActiveTopicIndex(topicIndex)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-start justify-between gap-2
                      ${activeTopicIndex === topicIndex && selectedChapterIndex === index 
                        ? 'bg-teal-500/20 text-white' 
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/80 hover:text-white'
                      }`
                    }
                  >
                    <span className="whitespace-normal flex-grow text-left">{topic.topic}</span>
                    {activeTopicIndex === topicIndex && selectedChapterIndex === index 
                        ? <CheckCircle2 className="h-5 w-5 text-teal-400 flex-shrink-0"/> 
                        : <Lock className="h-5 w-5 text-slate-500 flex-shrink-0"/>
                    }
                  </div>
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
