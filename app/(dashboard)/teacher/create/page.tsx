"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

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
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
})

export default function CourseCreate() {
    const router = useRouter();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            toast.success('Course created');
            router.push(`/teacher/courses/${response.data.id}`);
        } catch {
            toast.error("Something went wrong");
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })
    const { isValid, isSubmitting } = form.formState

    return (
        <div className="flex flex-col gap-y-3 pt-[20vh] pl-[20vw] h-full w-full">
            <h1 className="text-2xl">Name your course</h1>
            <p>Don't worry you can change name later</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Course name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. web development" {...field} />
                                </FormControl>
                                <FormDescription>
                                    What will you teach in this course?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="button" variant="secondary" onClick={() => router.push("/")}>cancel</Button>
                    <Button type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
