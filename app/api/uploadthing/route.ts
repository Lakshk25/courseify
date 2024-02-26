import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
console.log("route called");
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
    config: {},
});