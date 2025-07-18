import { NextResponse } from "next/server";
import db from "@/config/db"
import { usersTable } from "@/config/schema.js";
import { eq } from 'drizzle-orm';



export async  function POST(req){
    const {email,name} = await req.json();

    // if user a;ready exists then return error
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));



    // if user does not exist then create user
    if(users.length === 0){
        const result = await db.insert(usersTable).values({
            email:email,
            name: name
        }).returning(usersTable);
        console.log(result);
        return NextResponse.json(result);
            
   
    }
    return NextResponse.json(users[0])
}