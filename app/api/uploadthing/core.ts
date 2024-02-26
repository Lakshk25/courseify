import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const authenticate = () => {
    const { userId } = auth();
    if (!userId) {
        throw new UploadThingError("Unauthorized");
    }
    return { userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => authenticate())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;