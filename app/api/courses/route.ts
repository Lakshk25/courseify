import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const { title } = await req.json();
        const course = await db.course.create({
            data: {
                userId: userId,
                title: title
            }
        })
        return NextResponse.json(course)
    } catch (error) {
        return new NextResponse("Internal Error ", { status: 500 });
    }
}