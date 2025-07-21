import { NextResponse } from "next/server";
import db from "@/config/db"
import { usersTable } from "@/config/schema.js";
import { eq } from 'drizzle-orm';



export async  function POST(req){
    const {email,name} = await req.json();//This receives the request and extracts JSON data from body.

    // if user aLready exists then return error
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));//fetched user from db on the basis of email,This only matches one user, because email is expected to be unique (you usually enforce this in the DB schema).



    // if user does not exist then create user
    if(users.length === 0){
        const result = await db.insert(usersTable).values({
            email:email,
            name: name
        }).returning(usersTable);
        console.log(result);
        return NextResponse.json(result);// // ✨ sends response
            
   
    }
    return NextResponse.json(users[0])// // ✨ sends response to frontend.  “Here, frontend, take this JSON as the response of the request you just sent.”

    //Axios internally listens for the backend response.
}