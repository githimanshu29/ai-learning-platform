import { NextResponse } from 'next/server'; // Import NextResponse
import db from "@/config/db";
import { enrollCourseTable } from "@/config/schema";
import { eq } from 'drizzle-orm';

// The function is named DELETE to handle DELETE requests
// The 'res' parameter is not needed in the app router.
export async function DELETE(req) {
    try {
        // Correctly parse the request body as JSON
        const { enrollmentId } = await req.json();

        if (!enrollmentId) {
            // Use NextResponse to return a JSON response with a status code
            return NextResponse.json(
                { success: false, message: 'Enrollment ID is required.' },
                { status: 400 }
            );
        }

        // Use Drizzle ORM to delete the enrollment record
        const deletedEnrollments = await db
            .delete(enrollCourseTable)
            .where(eq(enrollCourseTable.id, enrollmentId))
            .returning();

        // Check if a record was actually deleted
        if (deletedEnrollments.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Enrollment not found.' },
                { status: 404 }
            );
        }

        // Return a successful response
        return NextResponse.json(
            { success: true, message: 'Enrollment deleted successfully.' },
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