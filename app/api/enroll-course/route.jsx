import { currentUser } from "@clerk/nextjs/server";
import db from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";


import { and, eq, desc } from "drizzle-orm"; 
import { NextResponse } from "next/server";

export async function POST(req){
    const { courseId } = await req.json();
    const user = await currentUser(); 
    // 1. Robust User and Email Check at the beginning
    if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress) {
        console.error("POST /api/enroll-course: Unauthorized - User not authenticated or email missing.");
        return NextResponse.json({ error: "Authentication required or user email not found." }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress; 
    try {
        
        const enrollCourses = await db.select()
            .from(enrollCourseTable)
            .where(
                and(
                    eq(enrollCourseTable.userEmail, userEmail), 
                    eq(enrollCourseTable.cid, courseId)
                )
            );

        if (enrollCourses.length === 0) {
            // Not enrolled, proceed with enrollment
            const result = await db.insert(enrollCourseTable).values({
                cid: courseId,
                userEmail: userEmail, 
                completedChapters: {} 
            }).returning(); 

            console.log("Course enrolled successfully:", result);
            return NextResponse.json(result);

        } else {
            // Already enrolled
            console.log("User already enrolled in course:", courseId);
            return NextResponse.json({ res: "Already enrolled in this course" });
        }
    } catch (error) {
        console.error("Error in POST /api/enroll-course:", error);
        // More specific error handling could be added here if needed
        return NextResponse.json({ error: "Failed to process enrollment request." }, { status: 500 });
    }
}


export async function GET(req){
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // Define userEmail here, so it's available in both blocks
    if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress) {
        console.error("GET /api/enroll-course: Unauthorized - User not authenticated or email missing.");
        return NextResponse.json({ error: "Authentication required or user email not found." }, { status: 401 });
    }
    const userEmail = user.primaryEmailAddress.emailAddress;

    if(courseId){
        // Now userEmail is available here
        const result = await db.select()
            .from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(and(eq(enrollCourseTable.userEmail, userEmail), eq(enrollCourseTable.cid, courseId)))
            .orderBy(desc(enrollCourseTable.id))
            return NextResponse.json(result[0]);

    } else {
        // userEmail is also available here
        try {
            const result = await db.select()
                .from(coursesTable)
                .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
                .where(eq(enrollCourseTable.userEmail, userEmail))
                .orderBy(desc(enrollCourseTable.id));

            console.log("Himanshu----Enrolled courses for user from enroll api", userEmail, ":", result);
            return NextResponse.json(result);
        } catch (error) {
            console.error("Error in GET /api/enroll-course:", error);
            return NextResponse.json({ error: "Failed to retrieve enrolled courses." }, { status: 500 });
        }
    }
}

   
