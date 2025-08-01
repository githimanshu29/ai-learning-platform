// import db from "@/config/db";
// import { coursesTable } from "@/config/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";





// export async function GET(req){
//     const { searchParams } = new URL(req.url);
//     const courseId = searchParams?.get('courseId');
//     const user= await currentUser();
    



//     if(courseId){
//     const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId));

//     //console.log("Himasnhu --- course ---- layout array from course api ",result);

//     return NextResponse.json(result[0]);

// } else{

//     const result = await db.select().from(coursesTable).where(eq(coursesTable.userEmail,  user.primaryEmailAddress?.emailAddress));

//     //console.log("Himasnhu --- course ---- layout array from course api ",result);

//     return NextResponse.json(result);
//     //this result is the complete aray of courses for the user

// }



// }


import db from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // If courseId is present, fetch a specific course
    if (courseId) {
      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.cid, courseId));

      if (!result.length) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(result[0]);
    }

    // Else, fetch courses for the current logged-in user
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress));

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET /api/courses error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


