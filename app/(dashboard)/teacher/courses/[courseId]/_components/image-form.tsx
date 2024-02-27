"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ImageIcon, Pencil } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import Image from "next/image"
import { Course } from "@prisma/client"

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    })
})

interface ImageFormProps {
    initialData: Course
    courseId: string
}
export default function ImageForm({
    initialData,
    courseId
}: ImageFormProps) {
    const [isEditing, setIsEditing] = useState(true);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData.imageUrl || ""
        },
    })
    const { isSubmitting, isValid } = form.formState;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("course updated");
            toggleEdit();
            router.refresh();
        }
        catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <div className="bg-gray-100 relative h-auto px-5 w-full py-3 rounded-md">
                <div className="flex justify-between">
                    <h1>Course Image</h1>
                    <Button onClick={toggleEdit} variant="ghost">
                        {
                            !isEditing ?
                                <>
                                    <Pencil className="h-4 w-4 mx-1" />
                                    Edit image
                                </>
                                :
                                <>
                                    Cancel
                                </>
                        }
                    </Button>
                </div>
                {
                    !isEditing && (
                        !initialData.imageUrl ? (
                            <div className="flex w-full">
                                <ImageIcon />
                            </div>
                        ) : (
                            <div className="relative aspect-video mt-2">
                                <Image
                                    alt="Upload"
                                    fill
                                    src={initialData.imageUrl} />
                            </div>
                        )
                    )
                }
                {
                    isEditing && (
                        <div>
                            <FileUpload
                                endpoint="courseImage"
                                onChange={(url) => {
                                    if (url) {
                                        onSubmit({ imageUrl: url })
                                    }
                                }}
                            />
                            <div className="text-xs text-muted-foreground mt-4">
                                16:9 aspect ratio recommended
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}


