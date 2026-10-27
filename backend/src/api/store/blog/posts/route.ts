import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogModuleService from "../../../../modules/blog/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)

  const limit = Math.min(Number(req.query.limit) || 12, 100)
  const offset = Number(req.query.offset) || 0
  const categoryId = req.query.category_id as string | undefined
  const featured = req.query.featured as string | undefined
  const tag = (req.query.tag as string | undefined)?.trim()
  const q = (req.query.q as string | undefined)?.trim()

  const filters: Record<string, unknown> = {
    status: "published",
  }

  if (categoryId) {
    filters.category_id = categoryId
  }

  if (featured === "true" || featured === "1") {
    filters.is_featured = true
  }

  if (tag) {
    filters.tags = { $ilike: `%${tag}%` }
  }

  if (q) {
    filters.$or = [
      { title: { $ilike: `%${q}%` } },
      { excerpt: { $ilike: `%${q}%` } },
      { subtitle: { $ilike: `%${q}%` } },
      { tags: { $ilike: `%${q}%` } },
    ]
  }

  const [posts, count] = await blogService.listAndCountBlogPosts(filters, {
    take: limit,
    skip: offset,
    order: { published_at: "DESC" },
    relations: ["category"],
  })

  res.json({
    posts,
    count,
    limit,
    offset,
  })
}
