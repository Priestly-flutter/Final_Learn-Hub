import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST (
    req: Request,
){
   
    try {
        const { userId } = auth();
        const { title } = await req.json()
    

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
                id: uuidv4(),
                updatedAt: new Date(),
            }
        })

        return NextResponse.json(course)

    }catch(error){
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
