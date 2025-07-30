import { currentUser } from "@clerk/nextjs/server";
import db from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";

// Ensure all necessary Drizzle-orm functions are imported
import { and, eq, desc } from "drizzle-orm"; // Added 'desc' here
import { NextResponse } from "next/server";

export async function POST(req){
    const { courseId } = await req.json();
    const user = await currentUser(); // Await currentUser() to ensure it resolves

    // --- Start of POST function improvements ---
    // 1. Robust User and Email Check at the beginning
    if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress) {
        console.error("POST /api/enroll-course: Unauthorized - User not authenticated or email missing.");
        return NextResponse.json({ error: "Authentication required or user email not found." }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress; // Safely extract the user's email

    try {
        // Check if already enrolled
        const enrollCourses = await db.select()
            .from(enrollCourseTable)
            .where(
                and(
                    eq(enrollCourseTable.userEmail, userEmail), // Correctly comparing column to user's email
                    eq(enrollCourseTable.cid, courseId)
                )
            );

        if (enrollCourses.length === 0) {
            // Not enrolled, proceed with enrollment
            const result = await db.insert(enrollCourseTable).values({
                cid: courseId,
                userEmail: userEmail, // Use the safely extracted userEmail
                completedChapters: {} // Provide an empty object if 'completedChapters' is NOT NULL and doesn't have a default
            }).returning(); // .returning() without arguments returns all columns of the inserted row

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

    // --- Start of GET function improvements ---
    // 1. Robust User and Email Check at the beginning
    if (!user || !user.primaryEmailAddress || !user.primaryEmailAddress.emailAddress) {
        console.error("GET /api/enroll-course: Unauthorized - User not authenticated or email missing.");
        // For a GET endpoint that fetches user-specific data, returning 401 with an empty array is appropriate.
        return NextResponse.json({ error: "Authentication required or user email not found." }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress; // Safely extract the user's email

    try {
        const result = await db.select()
            .from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(eq(enrollCourseTable.userEmail, userEmail)) // <-- CORRECTED WHERE CLAUSE
            .orderBy(desc(enrollCourseTable.id)); // `desc` is now imported

        console.log("Himanshu----Enrolled courses for user from enroll api", userEmail, ":", result);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in GET /api/enroll-course:", error);
        return NextResponse.json({ error: "Failed to retrieve enrolled courses." }, { status: 500 });
    }
}