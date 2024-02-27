import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import { LayoutDashboard, Menu } from "lucide-react";

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
        <div className="pt-5 px-5 space-y-3">
            <div>
                <h1 className="text-3xl py-1">Course setup</h1>
                <p className="text-gray-500">complete all fields {`(${completionText})`}</p>
            </div>
            <div className="text-2xl flex items-center gap-x-2 pt-10">
                <LayoutDashboard />
                Customize
            </div>
            <div className="flex flex-col md:flex-row w-full justify-between py-3">
                <div className="flex flex-col md:flex-grow gap-2">
                    <TitleForm
                        initialData={course}
                        courseId={params.courseId}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />

                </div>
                <div className="flex flex-col md:flex-grow">
                    <TitleForm
                        initialData={course}
                        courseId={params.courseId}
                    />
                </div>
            </div>
        </div>
    )
}

export default CourseIdPage