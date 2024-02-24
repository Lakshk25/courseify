import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string }
}) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    postion: "asc"
                }
            },
        }
    })
    if (!course) {
        return redirect("/");
    }

    return (
        <div>
            <TitleForm
                initialData={course}
                courseId={params.courseId}
            />
        </div>
    )
}

export default CourseIdPage