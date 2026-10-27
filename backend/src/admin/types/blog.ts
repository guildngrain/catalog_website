import { BlogDesignConfig } from "./blog-design"

export type BlogStatus = "draft" | "published"
export type BlogLayout = "default" | "editorial" | "minimal" | "magazine"
export type BlogStylePreset = "classic" | "dark" | "warm" | "contrast"

export type BlogCategory = {
  id: string
  name: string
  handle: string
  description?: string | null
}

export type BlogPost = {
  id: string
  title: string
  handle: string
  subtitle?: string | null
  excerpt?: string | null
  content?: string | null
  cover_url?: string | null
  cover_file_id?: string | null
  cover_alt?: string | null
  status: BlogStatus
  published_at?: string | null
  author_name?: string | null
  seo_title?: string | null
  seo_description?: string | null
  layout?: BlogLayout | null
  style_preset?: BlogStylePreset | null
  custom_css?: string | null
  design_config?: BlogDesignConfig | null
  is_featured?: boolean | null
  tags?: string | null
  category_id?: string | null
  category?: BlogCategory | null
  created_at?: string
  updated_at?: string
}

export type BlogPostFormValues = {
  title: string
  handle: string
  subtitle: string
  excerpt: string
  content: string
  status: BlogStatus
  author_name: string
  seo_title: string
  seo_description: string
  category_id: string
  layout: BlogLayout
  style_preset: BlogStylePreset
  custom_css: string
  design: BlogDesignConfig
  is_featured: boolean
  tags: string
  cover_alt: string
}

export const LAYOUT_OPTIONS: { value: BlogLayout; label: string; hint: string }[] =
  [
    {
      value: "default",
      label: "Default",
      hint: "Cover on top, then title and body",
    },
    {
      value: "editorial",
      label: "Editorial",
      hint: "Full-bleed hero with title over image",
    },
    {
      value: "minimal",
      label: "Minimal",
      hint: "Text-first with small portrait media",
    },
    {
      value: "magazine",
      label: "Magazine",
      hint: "Split intro with wide media",
    },
  ]

export const STYLE_PRESET_OPTIONS: {
  value: BlogStylePreset
  label: string
  hint: string
}[] = [
  {
    value: "classic",
    label: "Classic",
    hint: "Warm paper background, dark text",
  },
  {
    value: "dark",
    label: "Dark",
    hint: "Charcoal background, light type",
  },
  {
    value: "warm",
    label: "Warm leather",
    hint: "Tan / cognac accents",
  },
  {
    value: "contrast",
    label: "High contrast",
    hint: "Bold black & white",
  },
]

export type { BlogDesignConfig }
