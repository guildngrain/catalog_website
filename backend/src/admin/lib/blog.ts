import {
  applyLayoutPreset,
  applyStylePreset,
  defaultDesignConfig,
  parseDesignConfig,
} from "../types/blog-design"
import {
  BlogLayout,
  BlogPost,
  BlogPostFormValues,
  BlogStylePreset,
} from "../types/blog"

export function slugifyHandle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

export function emptyBlogForm(): BlogPostFormValues {
  const design = applyLayoutPreset(
    applyStylePreset(defaultDesignConfig(), "classic"),
    "default"
  )
  return {
    title: "",
    handle: "",
    subtitle: "",
    excerpt: "",
    content: "",
    status: "draft",
    author_name: "",
    seo_title: "",
    seo_description: "",
    category_id: "",
    layout: "default",
    style_preset: "classic",
    custom_css: "",
    design,
    is_featured: false,
    tags: "",
    cover_alt: "",
  }
}

export function postToFormValues(post: BlogPost): BlogPostFormValues {
  const layout = (post.layout as BlogLayout) || "default"
  const style_preset = (post.style_preset as BlogStylePreset) || "classic"
  let design = parseDesignConfig(post.design_config)
  // If no saved design_config, seed from presets
  if (!post.design_config) {
    design = applyLayoutPreset(applyStylePreset(design, style_preset), layout)
  }
  return {
    title: post.title || "",
    handle: post.handle || "",
    subtitle: post.subtitle || "",
    excerpt: post.excerpt || "",
    content: post.content || "",
    status: post.status || "draft",
    author_name: post.author_name || "",
    seo_title: post.seo_title || "",
    seo_description: post.seo_description || "",
    category_id: post.category_id || post.category?.id || "",
    layout,
    style_preset,
    custom_css: post.custom_css || "",
    design,
    is_featured: !!post.is_featured,
    tags: post.tags || "",
    cover_alt: post.cover_alt || "",
  }
}

export function toBlogPayload(values: BlogPostFormValues) {
  return {
    title: values.title.trim(),
    handle: values.handle.trim(),
    subtitle: values.subtitle.trim() || null,
    excerpt: values.excerpt.trim() || null,
    content: values.content.trim() || null,
    status: values.status,
    author_name: values.author_name.trim() || null,
    seo_title: values.seo_title.trim() || null,
    seo_description: values.seo_description.trim() || null,
    category_id: values.category_id || null,
    layout: values.layout,
    style_preset: values.style_preset,
    custom_css: values.custom_css.trim() || null,
    design_config: values.design,
    is_featured: values.is_featured,
    tags: values.tags.trim() || null,
    cover_alt: values.cover_alt.trim() || null,
  }
}

/** When user changes layout shortcut, rebuild hero/page defaults but keep custom colors */
export function withLayoutChange(
  values: BlogPostFormValues,
  layout: BlogLayout
): BlogPostFormValues {
  return {
    ...values,
    layout,
    design: applyLayoutPreset(values.design, layout),
  }
}

/** When user changes style preset, refresh colors (and font defaults) */
export function withStylePresetChange(
  values: BlogPostFormValues,
  style_preset: BlogStylePreset
): BlogPostFormValues {
  return {
    ...values,
    style_preset,
    design: applyStylePreset(values.design, style_preset),
  }
}
