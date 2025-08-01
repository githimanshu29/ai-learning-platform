import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import db from '../../../config/db.jsx';
import axios from 'axios';
import { coursesTable } from '@/config/schema.js';
import { eq } from 'drizzle-orm';
import { jsonrepair } from 'jsonrepair';
import MODEL from '../../../Model.js'

// Your PROMPT is fine, no changes needed here.
const PROMPT = `You are an expert and professional course creator and tutor.

Generate course chapter content in VALID JSON format.
Crate as much content as you can very vast content , it should like a complete course content.

strict order 1-> for each and every topic,even for small heading generate as much content as you can , generate examples related to even small heading, try visualize the heading and topic, do not just give the general information behave like proffessional tutor and coach

strict order 2-> For definitions or introductory headings don't just gererate some lines, you have to generate a vast content for each and every definition or introductory heading, you have to generate examples

strict order 3-> Generate all the chapters provided to you with thier topics and the try to complete the entire course in given chapters, if chapters are less then generate more topics as you can inside a chapter and make it a complete course content. Take course from beginning to advance


Rules:
- Use double quotes for all keys and string values
- No markdown (no \`\`\')
- No explanations or extra text
- HTML content must be properly escaped inside strings

Schema:
{
  "chapterName": "string",
  "content": [
    {
      "topic": "string",
      "htmlContent": "string (HTML content for the topic)"
    }
  ]
}

User Input:
`;

// ❌ REMOVED the unnecessary escapeControlCharacters function.

export async function POST(req) {
  const { courseJson, courseTitle, courseId } = await req.json();

  const promises = courseJson?.chapters?.map(async (chapter) => {
    // This part of your code is fine.
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const tools = [{ googleSearch: {} }];
    const config = {
      thinkingConfig: { thinkingBudget: 0 },
      tools,
      responseMimeType: 'text/plain',
    };
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
        model: 'gemini-2.5-flash-lite', // Using a more standard model name
        config,
        contents,
    });

    const RawResp = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanedResp = RawResp.replace(/```json\s*|\s*```/g, '').trim();

    let JSONResp;
    try {
      // ✅ KEY CHANGE: Instead of fragile string replacement, we parse first,
      // then safely fix the keys inside the JavaScript object. This is robust.
      
      // 1. Let jsonrepair fix any minor syntax issues (like trailing commas).
      const repairedJSONString = jsonrepair(cleanedResp);

      // 2. Parse the repaired string into a JavaScript object.
      let tempObject = JSON.parse(repairedJSONString);

      // 3. Remap the keys to match your desired final schema.
      // This handles inconsistencies like the AI using "topics" or "title".
      const finalObject = {
        chapterName: tempObject.chapterName,
        content: (tempObject.content || tempObject.topics || []).map(item => ({
          topic: item.topic || item.title,
          htmlContent: item.htmlContent || item.content || item.text,
        })),
      };

      JSONResp = finalObject;
      console.log("✅ Parsed and standardized JSON for:", chapter.chapterName);

    } catch (parseError) {
      console.error("❌ Error parsing AI response for chapter:", chapter.chapterName);
      console.error("Error message:", parseError.message);
      // Log the problematic string that failed to parse.
      console.error("Problematic response from AI:", cleanedResp); 
      return {
        youtubeVideo: null,
        courseData: {
          chapterName: chapter.chapterName,
          content: [],
        },
      };
    }

    const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

    return {
      youtubeVideo: youtubeData,
      courseData: JSONResp,
    };
  });

  const CourseContent = await Promise.all(promises);

  await db
    .update(coursesTable)
    .set({ courseContent: JSON.stringify(CourseContent) }) // Stringify for DB
    .where(eq(coursesTable.cid, courseId));

  return NextResponse.json({
    courseName: courseTitle,
    CourseContent,
  });
}

// Your YouTube function is fine, no changes needed.
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const GetYoutubeVideo = async (topic) => {
  const params = {
    part: 'snippet',
    q: topic,
    type: 'video',
    maxResults: 4,
    key: process.env.YOUTUBE_API_KEY,
  };

  const resp = await axios.get(YOUTUBE_BASE_URL, { params });
  const youtubeVideoList = resp.data.items.map((item) => ({
    videoId: item?.id?.videoId,
    title: item?.snippet?.title,
  }));

  console.log('📹 YouTube videos for:', topic, youtubeVideoList.length);
  return youtubeVideoList;
};