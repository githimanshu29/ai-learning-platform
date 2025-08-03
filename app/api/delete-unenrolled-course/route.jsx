import { NextResponse } from 'next/server'; 
import db from "@/config/db";
import { enrollCourseTable } from "@/config/schema";
import { eq } from 'drizzle-orm';
import { coursesTable } from '@/config/schema';

export async function DELETE(req) {
    try {
        // Correctly parse the request body as JSON
        const { courseId } = await req.json();
        console.log('Received courseId:', courseId)

        if (!courseId) {
            // Use NextResponse to return a JSON response with a status code
            return NextResponse.json(
                { success: false, message: 'Enrollment ID is required.' },
                { status: 400 }
            );
        }

        await db
        .delete(enrollCourseTable)
        .where(eq(enrollCourseTable.cid, courseId));


        // Use Drizzle ORM to delete the enrollment record
        const deletedCourses = await db
            .delete(coursesTable)
            .where(eq(coursesTable.cid, courseId))
            .returning();

        // Check if a record was actually deleted
        if (deletedCourses.length === 0) {
            return NextResponse.json(
                { success: false, message: 'course not found.' },
                { status: 404 }
            );
        }

        // Return a successful response
        return NextResponse.json(
            { success: true, message: 'course deleted successfully.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Drizzle DB Error:', error);
        // Return a server error response
        return NextResponse.json(
            { success: false, message: 'Failed to delete enrollment due to a server error.' },
            { status: 500 }
        );
    }
}