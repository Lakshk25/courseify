"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Pencil } from "lucide-react"

const formSchema = z.object({
    price: z.coerce.number(),
})

interface PriceFormProps {
    initialData: {
        price: number | null
    }
    courseId: string
}
export default function PriceForm({
    initialData,
    courseId
}: PriceFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined,
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
                    <h1>Course price</h1>
                    <Button onClick={toggleEdit} variant="ghost">
                        {
                            !isEditing ?
                                <>
                                    <Pencil className="h-4 w-4 mx-1" />
                                    Edit price
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
                                ₹ {initialData.price}
                            </div>
                        </>
                        :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    disabled={isSubmitting}
                                                    placeholder={initialData?.price ? `${initialData.price}` : "price"}
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


