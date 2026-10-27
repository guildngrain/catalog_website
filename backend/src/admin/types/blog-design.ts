export type HeroStyle =
  | "image-top"
  | "full-bleed"
  | "split-left"
  | "split-right"
  | "portrait-aside"
  | "text-only"

export type OverlayStyle = "none" | "soft" | "strong" | "gradient"
export type ImageFit = "cover" | "contain"
export type ImagePosition = "center" | "top" | "bottom" | "left" | "right"
export type ContentWidth = "narrow" | "medium" | "wide" | "full"
export type SpacingScale = "compact" | "normal" | "airy"
export type TitleSize = "md" | "lg" | "xl" | "hero"
export type FontChoice = "serif" | "sans" | "display"
export type Align = "left" | "center" | "right"
export type InlineImageLayout = "full" | "float-left" | "float-right" | "center-medium"
export type DividerStyle = "none" | "line" | "ornament"
export type HeroHeight = "sm" | "md" | "lg" | "xl"

export type BlogDesignConfig = {
  version: 1
  colors: {
    background: string
    text: string
    muted: string
    accent: string
    border: string
  }
  typography: {
    displayFont: FontChoice
    bodyFont: FontChoice
    titleSize: TitleSize
    titleAlign: Align
    bodySize: "sm" | "md" | "lg"
    lineHeight: "tight" | "normal" | "relaxed"
    letterSpacing: "tight" | "normal" | "wide"
    dropCap: boolean
  }
  hero: {
    style: HeroStyle
    height: HeroHeight
    overlay: OverlayStyle
    overlayColor: string
    imageFit: ImageFit
    imagePosition: ImagePosition
    showTitleOnImage: boolean
    imageRadius: "none" | "sm" | "md" | "lg"
    imageShadow: boolean
  }
  page: {
    contentWidth: ContentWidth
    padding: SpacingScale
    showExcerpt: boolean
    showTags: boolean
    showAuthor: boolean
    showDate: boolean
    dividerStyle: DividerStyle
    stickyMeta: boolean
  }
  media: {
    inlineImageLayout: InlineImageLayout
    captionStyle: "plain" | "italic" | "muted"
    bodyImageRadius: "none" | "sm" | "md" | "lg"
  }
}

export const FONT_STACKS: Record<FontChoice, string> = {
  serif: "Georgia, 'Times New Roman', serif",
  sans: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  display: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
}

export const TITLE_SIZES: Record<TitleSize, string> = {
  md: "1.5rem",
  lg: "1.85rem",
  xl: "2.25rem",
  hero: "2.75rem",
}

export const BODY_SIZES = {
  sm: "0.925rem",
  md: "1.05rem",
  lg: "1.175rem",
} as const

export const LINE_HEIGHTS = {
  tight: 1.45,
  normal: 1.7,
  relaxed: 1.9,
} as const

export const LETTER_SPACING = {
  tight: "-0.02em",
  normal: "0",
  wide: "0.04em",
} as const

export const HERO_HEIGHTS: Record<HeroHeight, string> = {
  sm: "180px",
  md: "260px",
  lg: "340px",
  xl: "420px",
}

export const CONTENT_WIDTHS: Record<ContentWidth, string> = {
  narrow: "36rem",
  medium: "42rem",
  wide: "52rem",
  full: "100%",
}

export const RADIUS = {
  none: "0",
  sm: "4px",
  md: "10px",
  lg: "18px",
} as const

export const PAD = {
  compact: "1rem",
  normal: "1.5rem",
  airy: "2.25rem",
} as const

export function defaultDesignConfig(): BlogDesignConfig {
  return {
    version: 1,
    colors: {
      background: "#F7F3EB",
      text: "#1A1612",
      muted: "#6B635A",
      accent: "#8B6914",
      border: "#E0D6C8",
    },
    typography: {
      displayFont: "serif",
      bodyFont: "serif",
      titleSize: "xl",
      titleAlign: "left",
      bodySize: "md",
      lineHeight: "normal",
      letterSpacing: "normal",
      dropCap: false,
    },
    hero: {
      style: "image-top",
      height: "md",
      overlay: "none",
      overlayColor: "#000000",
      imageFit: "cover",
      imagePosition: "center",
      showTitleOnImage: false,
      imageRadius: "md",
      imageShadow: false,
    },
    page: {
      contentWidth: "medium",
      padding: "normal",
      showExcerpt: true,
      showTags: true,
      showAuthor: true,
      showDate: false,
      dividerStyle: "line",
      stickyMeta: false,
    },
    media: {
      inlineImageLayout: "full",
      captionStyle: "muted",
      bodyImageRadius: "md",
    },
  }
}

const PRESET_COLORS: Record<
  string,
  BlogDesignConfig["colors"]
> = {
  classic: {
    background: "#F7F3EB",
    text: "#1A1612",
    muted: "#6B635A",
    accent: "#8B6914",
    border: "#E0D6C8",
  },
  dark: {
    background: "#141414",
    text: "#F4F1EA",
    muted: "#A8A29E",
    accent: "#C4A35A",
    border: "#333333",
  },
  warm: {
    background: "#F3E8D8",
    text: "#3D2914",
    muted: "#7A5C3E",
    accent: "#A0522D",
    border: "#D4B896",
  },
  contrast: {
    background: "#FFFFFF",
    text: "#0A0A0A",
    muted: "#525252",
    accent: "#0A0A0A",
    border: "#0A0A0A",
  },
}

/** Apply a named style preset onto colors + sensible typography defaults */
export function applyStylePreset(
  design: BlogDesignConfig,
  preset: string
): BlogDesignConfig {
  const colors = PRESET_COLORS[preset] || PRESET_COLORS.classic
  return {
    ...design,
    colors: { ...colors },
    typography: {
      ...design.typography,
      displayFont: preset === "contrast" ? "sans" : "serif",
      bodyFont: preset === "warm" || preset === "contrast" ? "sans" : "serif",
    },
  }
}

/** Map page layout shortcut → hero / page structure */
export function applyLayoutPreset(
  design: BlogDesignConfig,
  layout: string
): BlogDesignConfig {
  const next = { ...design, hero: { ...design.hero }, page: { ...design.page }, typography: { ...design.typography } }
  switch (layout) {
    case "editorial":
      next.hero.style = "full-bleed"
      next.hero.height = "lg"
      next.hero.overlay = "gradient"
      next.hero.showTitleOnImage = true
      next.typography.titleSize = "hero"
      next.typography.titleAlign = "left"
      next.page.contentWidth = "medium"
      break
    case "minimal":
      next.hero.style = "portrait-aside"
      next.hero.height = "sm"
      next.hero.showTitleOnImage = false
      next.typography.titleSize = "lg"
      next.typography.titleAlign = "left"
      next.page.contentWidth = "narrow"
      next.page.padding = "airy"
      break
    case "magazine":
      next.hero.style = "split-right"
      next.hero.height = "md"
      next.hero.showTitleOnImage = false
      next.typography.titleSize = "xl"
      next.page.contentWidth = "wide"
      break
    case "default":
    default:
      next.hero.style = "image-top"
      next.hero.height = "md"
      next.hero.overlay = "none"
      next.hero.showTitleOnImage = false
      next.typography.titleSize = "xl"
      next.page.contentWidth = "medium"
      break
  }
  return next
}

export function parseDesignConfig(raw: unknown): BlogDesignConfig {
  const base = defaultDesignConfig()
  if (!raw || typeof raw !== "object") return base
  const d = raw as Partial<BlogDesignConfig>
  return {
    version: 1,
    colors: { ...base.colors, ...(d.colors || {}) },
    typography: { ...base.typography, ...(d.typography || {}) },
    hero: { ...base.hero, ...(d.hero || {}) },
    page: { ...base.page, ...(d.page || {}) },
    media: { ...base.media, ...(d.media || {}) },
  }
}

export const HERO_STYLE_OPTIONS: {
  value: HeroStyle
  label: string
  hint: string
}[] = [
  { value: "image-top", label: "Image on top", hint: "Cover above title & body" },
  { value: "full-bleed", label: "Full-bleed hero", hint: "Cover as full-width banner" },
  { value: "split-left", label: "Split · image left", hint: "Image | title column" },
  { value: "split-right", label: "Split · image right", hint: "Title | image column" },
  { value: "portrait-aside", label: "Portrait aside", hint: "Small image beside intro" },
  { value: "text-only", label: "Text only", hint: "No hero image in layout" },
]
