import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

const router = createRouter().basePath("/api").openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Concerts API"),
        "Concerts API Index"
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "Concerts API",
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;
