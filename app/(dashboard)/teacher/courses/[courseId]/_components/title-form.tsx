"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Pencil } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
})

interface TitleFormProps {
    initialData: {
        title: string
    }
    courseId: string
}
export default function TitleForm({
    initialData,
    courseId
}: TitleFormProps) {
    const [isEditing, setIsEditing] = useState(true);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
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
            <div className="bg-gray-100 px-5 w-full py-3 rounded-md">
                <div className="flex justify-between">
                    <h1>Course title</h1>
                    <Button onClick={toggleEdit} variant="ghost">
                        {
                            !isEditing ?
                                <>
                                    <Pencil className="h-4 w-4 mx-1" />
                                    Edit title
                                </>
                                :
                                <>
                                    Cancel
                                </>
                        }
                    </Button>
                </div>
                <div className="pt-2">
                    {!isEditing ?
                        <>
                            <div className="">
                                {initialData.title}
                            </div>
                        </>
                        :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder={initialData.title}
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type="submit">
                                    Save
                                </Button>
                            </form>
                        </Form>
                    }
                </div>
            </div>
        </>
    )
}


