
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import db from '../../../config/db.jsx'
import axios from 'axios';
import { coursesTable } from '@/config/schema.js';
import { eq } from 'drizzle-orm';



const PROMPT = `Depends on Chapter name and topic Generate content for each topic in HTML and give response in JSON format.

Schema:{
chapterName:<>,
{
topic:<>,
content:<> 
}

}
:User Input:

`



// const PROMPT = `Generate content for the given chapter and its topics in HTML format.
// Provide the response as a single JSON object. DO NOT INCLUDE ANY INTRODUCTORY OR CONCLUDING TEXT.

// Schema:
// {
//   "chapterName": "string",
//   "content": [
//     {
//       "topic": "string",
//       "htmlContent": "string (HTML content for the topic)"
//     }
//   ]
// }

// User Input:
// `


// Helper function to escape control characters for JSON parsing
function escapeControlCharacters(str) {
    if (typeof str !== 'string') {
        return str; // Return as is if not a string
    }
    // Escape common problematic control characters (newline, tab, carriage return, backspace, form feed)
    // and also control characters in the 0-31 ASCII range
    return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, function (chr) {
        switch (chr) {
            case '\n': return '\\n';
            case '\r': return '\\r';
            case '\t': return '\\t';
            case '\b': return '\\b';
            case '\f': return '\\f';
            // Handle other control characters as unicode escapes
            default: {
                if (chr.charCodeAt(0) < 32) { // ASCII control characters 0-31
                    return '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
                }
                // Other non-printable characters or extended ASCII
                return ''; // Or escape them as desired, removing them might be safer
            }
        }
    });
}




export async function POST(req){
    const {courseJson, courseTitle, courseId}= await req.json();

    const promises = courseJson?.chapters?.map(async(chapter)=>{

          const ai = new GoogleGenAI({
                    apiKey: process.env.GEMINI_API_KEY,
                });
                const tools = [
                    {
                        googleSearch: {
                        }
                    },
                ];
                const config = {
                    thinkingConfig: {
                        thinkingBudget: 0,
                    },
                    tools,
                    responseMimeType: 'text/plain',
                };
                const model = 'gemini-2.5-flash-lite'; // Using a stable model name
                const contents = [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: PROMPT + JSON.stringify(chapter),
                            },
                        ],
                    },
                ];
        
                const response = await ai.models.generateContent({
                    model,
                    config,
                    contents,
                });

               
                // FIX: RawResp is also not defined. You need to get the text from the response object.
                const RawResp = response.candidates[0].content.parts[0].text; 
                if (!RawResp) {
                    console.warn("AI returned empty response for chapter:", chapter.chapterName);
                    return { youtubeVideo: null, courseData: { chapterName: chapter.chapterName, topics: [] } };
                }
                // Clean markdown fences and then apply custom escaping
            const cleanedResp = RawResp.replace(/```json\s*|\s*```/g, '').trim();


            // *** APPLY THE ESCAPING HERE ***
            const escapedResp = escapeControlCharacters(cleanedResp);

            let JSONResp;
            try {
                JSONResp = JSON.parse(escapedResp); // Parse the escaped string

                console.log("Himanshu course layout-JsonREsp-content", JSONResp);
            } catch (parseError) {
                console.error("Error parsing AI response for chapter:", chapter.chapterName, parseError);
                console.error("Problematic Raw AI Response (after cleaning and escaping):", escapedResp.substring(Math.max(0, parseError.at - 50), parseError.at + 50)); // Log around the error position
                return { youtubeVideo: null, courseData: { chapterName: chapter.chapterName, topics: [] } }; // Return default or throw
            }






                //GET Youtube Videos


                const youtubeData = await GetYoutubeVideo(chapter?.chapterName);
                console.log({
                    youtubeVideo: youtubeData,
                    courseData: JSONResp,
                })
                return{
                    youtubeVideo: youtubeData,
                    courseData: JSONResp,

                }
               
    })

    const CourseContent = await Promise.all(promises);

    // save to database
    const dbResp = await db.update(coursesTable).set({
        courseContent:CourseContent,
    }).where(eq(coursesTable.cid, courseId)); 



    return NextResponse.json({ 
        courseName: courseTitle,
CourseContent: CourseContent

     });

}

const YOUTUBE_BASE_URL='https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVideo = async(topic)=>{
    const params ={
        part: 'snippet',
        q: topic,
        type: 'video',
        maxResults: 4,
        key: process.env.YOUTUBE_API_KEY,
    }

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListResp = resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach(item=>{
        const data={
            videoId: item?.id?.videoId,
            title: item?.snippet?.title,
        }
        youtubeVideoList.push(data);
    })
    console.log(' youtubeVideoList ',youtubeVideoList); // Log the list of YouTube videos
    return youtubeVideoList;





}