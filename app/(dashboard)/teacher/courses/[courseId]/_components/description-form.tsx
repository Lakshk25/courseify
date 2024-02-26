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
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Course } from "@prisma/client"

const formSchema = z.object({
    description: z.string(),
})

interface DescriptionFormProps {
    initialData: Course
    courseId: string
}
export default function DescriptionForm({
    initialData,
    courseId
}: DescriptionFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || "",
        },
    })
    const { isSubmitting, isValid } = form.formState;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("course updated");
            router.refresh();
        }
        catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Course Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isSubmitting}
                                    placeholder={initialData?.description || "Enter course description"}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
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
    )
}


