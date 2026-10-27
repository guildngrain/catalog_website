import {
  defineMiddlewares,
  authenticate,
} from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 5 },
})

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/custom-designs/upload",
      method: "POST",
      bodyParser: false,
      middlewares: [upload.array("files", 5)],
    },
    {
      matcher: "/admin/blog/posts/:id/cover",
      method: "POST",
      bodyParser: false,
      middlewares: [upload.single("file")],
    },
    {
      matcher: "/admin/blog/uploads",
      method: "POST",
      bodyParser: false,
      middlewares: [upload.array("files", 5)],
    },
    {
      matcher: "/admin/custom-designs/upload",
      method: "POST",
      bodyParser: false,
      middlewares: [upload.array("files", 5)],
    },
    {
      matcher: "/store/order-messages",
      method: "POST",
      middlewares: [
        // optional customer auth — guests can still leave cart messages
        authenticate("customer", ["bearer", "session"], {
          allowUnauthenticated: true,
        }),
      ],
    },
  ],
})
