import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogModuleService from "../../../../modules/blog/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)

  const [categories, count] = await blogService.listAndCountBlogCategories(
    {},
    {
      order: { name: "ASC" },
    }
  )

  res.json({ categories, count })
}
