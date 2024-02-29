"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Pencil } from "lucide-react"
import { Course } from "@prisma/client"
import { cn } from "@/lib/utils"

interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string; }[];
};

const formSchema = z.object({
    categoryId: z.string().min(1),
});


export default function CategoryForm({
    initialData,
    courseId,
    options
}: CategoryFormProps) {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        },
    });

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

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return (
        <>
            <div className="bg-gray-100 px-5 w-full py-3 rounded-md">
                <div className="flex font-medium justify-between">
                    Course category
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
                        (
                            <p className={cn(
                                "text-sm mt-2",
                                !initialData.categoryId && "text-slate-500 italic"
                            )}>
                                {selectedOption?.label || "No category"}
                            </p>
                        )
                        :
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Combobox
                                                    options={options}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center gap-x-2">
                                    <Button 
                                    disabled={!isValid || isSubmitting}
                                    type="submit">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    }
                </div>
            </div>
        </>
    )
}


