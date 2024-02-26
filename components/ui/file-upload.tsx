"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps {
    endpoint: keyof typeof ourFileRouter;
}
export default function FileUpload({
    endpoint
}: FileUploadProps) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {

                }}
                onUploadError={(error: Error) => {
                    toast.error(error?.message)
                }}
            />
        </main>
    );
}