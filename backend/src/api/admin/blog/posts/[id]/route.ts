import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../../modules/blog"
import BlogModuleService from "../../../../../modules/blog/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  const post = await blogService.retrieveBlogPost(req.params.id, {
    relations: ["category"],
  })
  res.json({ post })
}

type UpdateBody = {
  title?: string
  handle?: string
  subtitle?: string | null
  excerpt?: string | null
  content?: string | null
  cover_url?: string | null
  cover_file_id?: string | null
  cover_alt?: string | null
  status?: "draft" | "published"
  published_at?: string | null
  author_name?: string | null
  seo_title?: string | null
  seo_description?: string | null
  category_id?: string | null
  layout?: "default" | "editorial" | "minimal" | "magazine"
  style_preset?: "classic" | "dark" | "warm" | "contrast"
  custom_css?: string | null
  design_config?: Record<string, unknown> | null
  is_featured?: boolean
  tags?: string | null
}

export async function POST(req: MedusaRequest<UpdateBody>, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  const body = req.body as UpdateBody

  const data: Record<string, unknown> = { id: req.params.id, ...body }

  if (body.status === "published" && body.published_at === undefined) {
    data.published_at = new Date()
  }
  if (body.published_at) {
    data.published_at = new Date(body.published_at)
  }

  const post = await blogService.updateBlogPosts(data)
  res.json({ post })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  await blogService.deleteBlogPosts(req.params.id)
  res.status(200).json({ id: req.params.id, deleted: true })
}
