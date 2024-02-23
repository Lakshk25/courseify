"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();

    const onClick = () => {
        router.push("/teacher/create")
    }
    return (
        <Button onClick={onClick}>New Course</Button>
    )
}

export default page