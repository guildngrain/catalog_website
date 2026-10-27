import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { BLOG_MODULE } from "../../../../../modules/blog"
import BlogModuleService from "../../../../../modules/blog/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  const handle = req.params.handle

  const [posts] = await blogService.listAndCountBlogPosts(
    { handle, status: "published" },
    { take: 1, relations: ["category"] }
  )

  const post = posts[0]
  if (!post) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Blog post not found")
  }

  res.json({ post })
}
