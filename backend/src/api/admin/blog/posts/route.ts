import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogModuleService from "../../../../modules/blog/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)

  const limit = Math.min(Number(req.query.limit) || 50, 100)
  const offset = Number(req.query.offset) || 0
  const status = req.query.status as string | undefined

  const filters: Record<string, unknown> = {}
  if (status) filters.status = status

  const [posts, count] = await blogService.listAndCountBlogPosts(filters, {
    take: limit,
    skip: offset,
    order: { created_at: "DESC" },
    relations: ["category"],
  })

  res.json({ posts, count, limit, offset })
}

type CreateBody = {
  title: string
  handle: string
  subtitle?: string
  excerpt?: string
  content?: string
  cover_url?: string
  cover_alt?: string
  status?: "draft" | "published"
  published_at?: string
  author_name?: string
  seo_title?: string
  seo_description?: string
  category_id?: string
  layout?: "default" | "editorial" | "minimal" | "magazine"
  style_preset?: "classic" | "dark" | "warm" | "contrast"
  custom_css?: string
  design_config?: Record<string, unknown> | null
  is_featured?: boolean
  tags?: string
}

export async function POST(req: MedusaRequest<CreateBody>, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)
  const body = req.body as CreateBody

  if (!body.title || !body.handle) {
    res.status(400).json({ message: "title and handle are required" })
    return
  }

  const status = body.status || "draft"
  const post = await blogService.createBlogPosts({
    title: body.title,
    handle: body.handle,
    subtitle: body.subtitle || null,
    excerpt: body.excerpt || null,
    content: body.content || null,
    cover_url: body.cover_url || null,
    cover_alt: body.cover_alt || null,
    status,
    published_at:
      status === "published"
        ? body.published_at
          ? new Date(body.published_at)
          : new Date()
        : null,
    author_name: body.author_name || null,
    seo_title: body.seo_title || null,
    seo_description: body.seo_description || null,
    category_id: body.category_id || null,
    layout: body.layout || "default",
    style_preset: body.style_preset || "classic",
    custom_css: body.custom_css || null,
    design_config: body.design_config || null,
    is_featured: !!body.is_featured,
    tags: body.tags || null,
  })

  res.status(201).json({ post })
}
