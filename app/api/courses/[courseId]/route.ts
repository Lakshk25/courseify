import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const courseId = params.courseId;
        const values = await req.json();

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        })
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        return new NextResponse("[COURSE_UPDATE_ERROR]", { status: 500 });
    }
}