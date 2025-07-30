import { coursesTable } from '@/config/schema';
import {
    GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
import db from '@/config/db';

import { currentUser } from '@clerk/nextjs/server';

const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mock-up screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette [blues, purples, oranges] with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format. Chapter Name, Topic under each chapters, Duration for each chapters etc. in .JSON format only.

Schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}, User Input:

`;

export async function POST(req) {
    try {
        const { courseId, ...formData } = await req.json();
        const user = await currentUser(); // Await currentUser() to ensure it resolves

        // Basic check to ensure user is available
        if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress) {
            return NextResponse.json({ error: "User not authenticated or email not found." }, { status: 401 });
        }

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
        const model = 'gemini-2.0-flash-lite'; // Using a stable model name
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT + JSON.stringify(formData),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });
        // console.log(response.candidates[0].content.parts[0].text); // Keep this for debugging if needed

        const RawResp = response.candidates[0]?.content.parts[0]?.text;

        // Clean the AI response by removing markdown fences (```json, ```)
        const RawJson = RawResp.replace('```json', '').replace('```', '').trim();

        let JSONResp;
        try {

            //console.log("Himanshu course  layout-Rawjson", RawJson);
            JSONResp = JSON.parse(RawJson);
            //console.log("Himanshu course layout-JsonREsp", JSONResp);
        } catch (parseError) {
            console.error("Error parsing AI response as JSON: course layout error", parseError);
            console.error("Raw AI Response causing parse error:", RawResp); // Log the problematic raw response
            return NextResponse.json({ error: "Failed to parse AI response. AI might not have returned valid JSON." }, { status: 500 });
        }

        // Extract the 'course' object directly from the parsed JSON response
        const courseDetails = JSONResp.course;
        

      
        const result = await db.insert(coursesTable).values({
            cid: courseId, // `courseId` comes from the request body
            name: courseDetails.name,
            description: courseDetails.description,
            noOfChapters: courseDetails.noOfChapters,
            includeVideo: courseDetails.includeVideo || false, // Use AI's value, default to false if undefined
            level: courseDetails.level,
            category: courseDetails.category,
            bannerImagePrompt: courseDetails.bannerImagePrompt, // Ensure this is mapped if it's a column
            courseJson: JSON.stringify(courseDetails), // Store the entire AI-generated object as a JSON string
            userEmail: user.primaryEmailAddress.emailAddress, // Use the awaited user's email
        });

        return NextResponse.json({ courseId: courseId });

    } catch (error) {
        console.error("Error in generate-course-layout API:", error);

        // More specific error handling for database constraint violations and AI overload
        if (error.code === '23502' && error.column) { // Check for specific PostgreSQL NOT NULL error code and column
            return NextResponse.json({ error: `Database error: Missing required data for column '${error.column}'. Please ensure all NOT NULL fields are provided.` }, { status: 500 });
        } else if (error.response && error.response.status === 503) {
            return NextResponse.json({ error: "AI service currently overloaded. Please try again in a few moments." }, { status: 503 });
        } else {
            return NextResponse.json({ error: "Failed to generate course layout due to an unexpected error.", details: error.message }, { status: 500 });
        }
    }
}