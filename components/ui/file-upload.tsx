"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}
export default function FileUpload({
    endpoint,
    onChange
}: FileUploadProps) {
    return (
        <main className="flex h-auto flex-col items-center justify-between">
            <UploadDropzone
                className="w-full"
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    toast.error(error?.message)
                }}
            />
        </main>
    );
}