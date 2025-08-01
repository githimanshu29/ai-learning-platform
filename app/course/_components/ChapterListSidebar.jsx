// "use client"

// import React, { useContext, useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

// const ChapterListSidebar = ({courseInfo}) => {
//   const course = courseInfo?.courses;
//   const enrollCourse=courseInfo?.enrollCourse;
//   const courseContent=courseInfo?.courses?.courseContent;

//   const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext);

   
    
        



//   return (
//     <div className="w-80 bg-secondary h-screen ">
//         <h2 className="my-3 font-bold text-xl">Chapters ({courseContent?.length}) </h2>
//       <Accordion className="w-full" style={{ width: '100%' }}type="single" collapsible>
//         {courseContent?.map((chapter,index)=>(
//            <AccordionItem value={chapter?.courseData?.chapterName} key={index} onClick={()=>setSelectedChapterIndex(index)} style={{ width: '100%' }}>
//            <AccordionTrigger className='text-lg font-medium'>{index+1}. {chapter?.courseData?.chapterName}</AccordionTrigger>
//            <AccordionContent asChild>
//              <div className='m-2'>
//               {chapter?.courseData?.content?.map((topic,index)=>(
//                 <h2 className="p-3 bg-white my-1 rounded-lg" key={index}>{topic.topic}</h2>

//               ))}

//              </div>
//            </AccordionContent>
//          </AccordionItem>

//         ))}



       
//       </Accordion>
//     </div>
//   );
// };

// export default ChapterListSidebar;

"use client"

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
  const [activeTopicIndex, setActiveTopicIndex] = useState(0); // To track the active topic

  const handleChapterSelect = (index) => {
    setSelectedChapterIndex(index);
    if(onChapterSelect) {
        onChapterSelect(index); // Notify parent component
    }
  };

  return (
    // 1. Main container now has the glass style
    <div className="h-screen  inset-0 w-80 bg-slate-900/50 backdrop-blur-lg border-r border-slate-700/80 p-4 overflow-y-auto ">
      {/* 2. Header is styled for the dark theme */}
      <h2 className="my-3 font-bold text-xl text-white">Chapters ({courseContent?.length})</h2>
      
      {/* 3. Accordion is styled for the dark theme */}
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
            // 4. Accordion items have a subtle border
            className="border-b border-slate-700/80"
          >
            <AccordionTrigger 
              onClick={() => handleChapterSelect(index)}
              // 5. Trigger is styled for dark theme, with a glowing active state
              className={`text-lg font-medium text-slate-300 hover:text-white transition-colors [&[data-state=open]]:text-teal-400 ${selectedChapterIndex === index && 'text-teal-400'}`}
            >
              <span className="text-left w-full">{index + 1}. {chapter?.courseData?.chapterName}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className='mt-2 flex flex-col gap-1'>
                {chapter?.courseData?.content?.map((topic, topicIndex) => (
                  <div 
                    key={topicIndex}
                    onClick={() => setActiveTopicIndex(topicIndex)}
                    // 6. Topic items are styled to match, with an active state
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between
                      ${activeTopicIndex === topicIndex && selectedChapterIndex === index 
                        ? 'bg-teal-500/20 text-white' 
                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/80 hover:text-white'
                      }`
                    }
                  >
                    <span>{topic.topic}</span>
                    {/* Example of completion status icon */}
                    {activeTopicIndex === topicIndex && selectedChapterIndex === index 
                        ? <CheckCircle2 className="h-5 w-5 text-teal-400"/> 
                        : <Lock className="h-5 w-5 text-slate-500"/>
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


