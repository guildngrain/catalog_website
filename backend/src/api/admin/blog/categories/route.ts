import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogModuleService from "../../../../modules/blog/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  const [categories, count] = await blogService.listAndCountBlogCategories(
    {},
    { order: { name: "ASC" } }
  )
  res.json({ categories, count })
}

export async function POST(
  req: MedusaRequest<{ name: string; handle: string; description?: string }>,
  res: MedusaResponse
) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  const body = req.body

  if (!body?.name || !body?.handle) {
    res.status(400).json({ message: "name and handle are required" })
    return
  }

  const category = await blogService.createBlogCategories({
    name: body.name,
    handle: body.handle,
    description: body.description || null,
  })

  res.status(201).json({ category })
}
