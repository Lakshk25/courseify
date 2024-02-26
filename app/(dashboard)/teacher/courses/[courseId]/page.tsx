import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";

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

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),   // check total published chapters (atleast one chap should be published then it change to true)
    ];
    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length;
    const completionText = `${completedFields}/${totalFields}`

    return (
        <div className="flex flex-col md:flex-row w-full justify-between gap-x-4 px-3">
            <div className="flex flex-col md:flex-grow">
                <TitleForm
                    initialData={course}
                    courseId={params.courseId}
                />
                <DescriptionForm
                    initialData={course}
                    courseId={params.courseId}
                />
                <ImageForm
                />
            </div>
            <div className="flex flex-col md:flex-grow">
                <TitleForm
                    initialData={course}
                    courseId={params.courseId}
                />
            </div>
        </div>

    )
}

export default CourseIdPage