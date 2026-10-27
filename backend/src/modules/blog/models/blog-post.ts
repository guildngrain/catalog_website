import { model } from "@medusajs/framework/utils"
import BlogCategory from "./blog-category"

const BlogPost = model.define("blog_post", {
  id: model.id().primaryKey(),
  title: model.text(),
  handle: model.text().unique(),
  subtitle: model.text().nullable(),
  excerpt: model.text().nullable(),
  content: model.text().nullable(),
  cover_url: model.text().nullable(),
  cover_file_id: model.text().nullable(),
  cover_alt: model.text().nullable(),
  status: model.enum(["draft", "published"]).default("draft"),
  published_at: model.dateTime().nullable(),
  author_name: model.text().nullable(),
  seo_title: model.text().nullable(),
  seo_description: model.text().nullable(),
  /** Visual layout of the article page on the storefront */
  layout: model
    .enum(["default", "editorial", "minimal", "magazine"])
    .default("default"),
  /** Named color/typography theme for the article */
  style_preset: model
    .enum(["classic", "dark", "warm", "contrast"])
    .default("classic"),
  /** Optional scoped CSS injected for this post on the storefront */
  custom_css: model.text().nullable(),
  /**
   * Full visual design studio config (colors, typography, hero, page, media).
   * See admin/types/blog-design.ts
   */
  design_config: model.json().nullable(),
  is_featured: model.boolean().default(false),
  /** Comma-separated tags for filtering/display */
  tags: model.text().nullable(),
  category: model
    .belongsTo(() => BlogCategory, {
      mappedBy: "posts",
    })
    .nullable(),
})

export default BlogPost
