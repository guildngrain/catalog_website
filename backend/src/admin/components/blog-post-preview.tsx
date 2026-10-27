import { Text } from "@medusajs/ui"
import type { ReactNode } from "react"
import {
  BODY_SIZES,
  CONTENT_WIDTHS,
  FONT_STACKS,
  HERO_HEIGHTS,
  LETTER_SPACING,
  LINE_HEIGHTS,
  PAD,
  RADIUS,
  TITLE_SIZES,
} from "../types/blog-design"
import { BlogPostFormValues } from "../types/blog"

type BlogPostPreviewProps = {
  values: BlogPostFormValues
  coverUrl?: string | null
}

export function BlogPostPreview({ values, coverUrl }: BlogPostPreviewProps) {
  const d = values.design
  const tags = values.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
  const scopeClass = `gg-blog-post-${values.handle || "preview"}`
  const displayFont = FONT_STACKS[d.typography.displayFont]
  const bodyFont = FONT_STACKS[d.typography.bodyFont]
  const pad = PAD[d.page.padding]
  const maxW = CONTENT_WIDTHS[d.page.contentWidth]
  const titleSize = TITLE_SIZES[d.typography.titleSize]
  const bodySize = BODY_SIZES[d.typography.bodySize]
  const lineHeight = LINE_HEIGHTS[d.typography.lineHeight]
  const letterSpacing = LETTER_SPACING[d.typography.letterSpacing]
  const heroH = HERO_HEIGHTS[d.hero.height]
  const imgRadius = RADIUS[d.hero.imageRadius]
  const bodyRadius = RADIUS[d.media.bodyImageRadius]

  const overlayCss = (() => {
    const c = d.hero.overlayColor || "#000"
    switch (d.hero.overlay) {
      case "soft":
        return `linear-gradient(to top, ${c}66, ${c}22)`
      case "strong":
        return `linear-gradient(to top, ${c}cc, ${c}55)`
      case "gradient":
        return `linear-gradient(to top, ${c}e6, transparent 65%)`
      default:
        return "none"
    }
  })()

  const showCover = !!coverUrl && d.hero.style !== "text-only"

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between gap-2">
        <Text size="small" weight="plus">
          Live preview
        </Text>
        <Text size="small" className="text-ui-fg-subtle">
          {d.hero.style} · {values.style_preset}
        </Text>
      </div>

      <div
        className={`overflow-hidden rounded-lg border ${scopeClass}`}
        style={{
          borderColor: d.colors.border,
          background: d.colors.background,
          color: d.colors.text,
          fontFamily: bodyFont,
        }}
      >
        {values.custom_css ? <style>{values.custom_css}</style> : null}
        <style>{`
          .${scopeClass} .gg-body {
            font-size: ${bodySize};
            line-height: ${lineHeight};
          }
          .${scopeClass} .gg-body h2 {
            font-family: ${displayFont};
            font-size: 1.35em;
            margin: 1.1em 0 0.4em;
            letter-spacing: ${letterSpacing};
          }
          .${scopeClass} .gg-body h3 { font-size: 1.15em; margin: 1em 0 0.35em; }
          .${scopeClass} .gg-body p { margin: 0.65em 0; }
          .${scopeClass} .gg-body a { color: ${d.colors.accent}; }
          .${scopeClass} .gg-body blockquote {
            border-left: 3px solid ${d.colors.accent};
            padding-left: 0.85rem;
            margin: 0.9em 0;
            color: ${d.colors.muted};
            font-style: italic;
          }
          .${scopeClass} .gg-body img {
            max-width: ${
              d.media.inlineImageLayout === "center-medium" ? "70%" : "100%"
            };
            border-radius: ${bodyRadius};
            ${
              d.media.inlineImageLayout === "float-left"
                ? "float:left; width:42%; margin:0 1rem 0.75rem 0;"
                : ""
            }
            ${
              d.media.inlineImageLayout === "float-right"
                ? "float:right; width:42%; margin:0 0 0.75rem 1rem;"
                : ""
            }
            ${
              d.media.inlineImageLayout === "center-medium"
                ? "display:block; margin-left:auto; margin-right:auto;"
                : ""
            }
          }
          .${scopeClass} .gg-body ul { list-style: disc; padding-left: 1.3rem; }
          .${scopeClass} .gg-body ol { list-style: decimal; padding-left: 1.3rem; }
          ${
            d.typography.dropCap
              ? `.${scopeClass} .gg-body > p:first-of-type::first-letter {
            float: left;
            font-family: ${displayFont};
            font-size: 3.2em;
            line-height: 0.85;
            padding: 0.08em 0.12em 0 0;
            color: ${d.colors.accent};
          }`
              : ""
          }
        `}</style>

        {d.hero.style === "full-bleed" && showCover ? (
          <FullBleedHero
            values={values}
            coverUrl={coverUrl!}
            heroH={heroH}
            overlayCss={overlayCss}
            displayFont={displayFont}
            titleSize={titleSize}
            letterSpacing={letterSpacing}
            imageFit={d.hero.imageFit}
            imagePosition={d.hero.imagePosition}
            showTitle={d.hero.showTitleOnImage}
          />
        ) : null}

        <div
          style={{
            padding: pad,
            maxWidth: maxW,
            margin:
              d.page.contentWidth === "full" ? "0" : "0 auto",
          }}
        >
          {(d.hero.style === "split-left" || d.hero.style === "split-right") &&
          showCover ? (
            <SplitIntro
              values={values}
              coverUrl={coverUrl!}
              design={d}
              tags={tags}
              displayFont={displayFont}
              titleSize={titleSize}
              letterSpacing={letterSpacing}
              heroH={heroH}
              imgRadius={imgRadius}
              imageLeft={d.hero.style === "split-left"}
            />
          ) : d.hero.style === "portrait-aside" ? (
            <PortraitIntro
              values={values}
              coverUrl={showCover ? coverUrl! : null}
              design={d}
              tags={tags}
              displayFont={displayFont}
              titleSize={titleSize}
              letterSpacing={letterSpacing}
              imgRadius={imgRadius}
            />
          ) : d.hero.style !== "full-bleed" ? (
            <>
              {d.hero.style === "image-top" && showCover ? (
                <CoverImage
                  src={coverUrl!}
                  alt={values.cover_alt}
                  height={heroH}
                  fit={d.hero.imageFit}
                  position={d.hero.imagePosition}
                  radius={imgRadius}
                  shadow={d.hero.imageShadow}
                  overlayCss={overlayCss}
                />
              ) : null}
              <TitleBlock
                values={values}
                design={d}
                tags={tags}
                displayFont={displayFont}
                titleSize={titleSize}
                letterSpacing={letterSpacing}
                light={false}
              />
            </>
          ) : (
            <TitleBlock
              values={values}
              design={d}
              tags={tags}
              displayFont={displayFont}
              titleSize={titleSize}
              letterSpacing={letterSpacing}
              light={false}
              skipTitle={d.hero.showTitleOnImage}
            />
          )}

          {d.page.dividerStyle !== "none" ? (
            <Divider
              style={d.page.dividerStyle}
              color={d.colors.border}
              accent={d.colors.accent}
            />
          ) : (
            <div style={{ height: "1rem" }} />
          )}

          <Body html={values.content} />
        </div>
      </div>
    </div>
  )
}

function FullBleedHero({
  values,
  coverUrl,
  heroH,
  overlayCss,
  displayFont,
  titleSize,
  letterSpacing,
  imageFit,
  imagePosition,
  showTitle,
}: {
  values: BlogPostFormValues
  coverUrl: string
  heroH: string
  overlayCss: string
  displayFont: string
  titleSize: string
  letterSpacing: string
  imageFit: string
  imagePosition: string
  showTitle: boolean
}) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: heroH,
        backgroundImage: `url(${coverUrl})`,
        backgroundSize: imageFit,
        backgroundPosition: imagePosition,
        display: "flex",
        alignItems: "flex-end",
        color: "#fff",
      }}
    >
      {overlayCss !== "none" ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: overlayCss,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />
      )}
      {showTitle ? (
        <div style={{ position: "relative", padding: "1.5rem", maxWidth: "40rem" }}>
          <h1
            style={{
              fontFamily: displayFont,
              fontSize: titleSize,
              letterSpacing,
              margin: 0,
              lineHeight: 1.15,
              textAlign: values.design.typography.titleAlign,
            }}
          >
            {values.title || "Untitled post"}
          </h1>
          {values.subtitle ? (
            <p style={{ margin: "0.5rem 0 0", opacity: 0.9 }}>{values.subtitle}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

function SplitIntro({
  values,
  coverUrl,
  design,
  tags,
  displayFont,
  titleSize,
  letterSpacing,
  heroH,
  imgRadius,
  imageLeft,
}: {
  values: BlogPostFormValues
  coverUrl: string
  design: BlogPostFormValues["design"]
  tags: string[]
  displayFont: string
  titleSize: string
  letterSpacing: string
  heroH: string
  imgRadius: string
  imageLeft: boolean
}) {
  const image = (
    <CoverImage
      src={coverUrl}
      alt={values.cover_alt}
      height={heroH}
      fit={design.hero.imageFit}
      position={design.hero.imagePosition}
      radius={imgRadius}
      shadow={design.hero.imageShadow}
      overlayCss="none"
    />
  )
  const text = (
    <TitleBlock
      values={values}
      design={design}
      tags={tags}
      displayFont={displayFont}
      titleSize={titleSize}
      letterSpacing={letterSpacing}
      light={false}
    />
  )
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.25rem",
        alignItems: "center",
      }}
    >
      {imageLeft ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          {text}
          {image}
        </>
      )}
    </div>
  )
}

function PortraitIntro({
  values,
  coverUrl,
  design,
  tags,
  displayFont,
  titleSize,
  letterSpacing,
  imgRadius,
}: {
  values: BlogPostFormValues
  coverUrl: string | null
  design: BlogPostFormValues["design"]
  tags: string[]
  displayFont: string
  titleSize: string
  letterSpacing: string
  imgRadius: string
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: coverUrl ? "1.4fr 0.7fr" : "1fr",
        gap: "1.25rem",
        alignItems: "start",
      }}
    >
      <TitleBlock
        values={values}
        design={design}
        tags={tags}
        displayFont={displayFont}
        titleSize={titleSize}
        letterSpacing={letterSpacing}
        light={false}
      />
      {coverUrl ? (
        <img
          src={coverUrl}
          alt={values.cover_alt || ""}
          style={{
            width: "100%",
            aspectRatio: "3/4",
            objectFit: design.hero.imageFit,
            objectPosition: design.hero.imagePosition,
            borderRadius: imgRadius,
            boxShadow: design.hero.imageShadow
              ? "0 12px 28px rgba(0,0,0,0.18)"
              : "none",
          }}
        />
      ) : null}
    </div>
  )
}

function CoverImage({
  src,
  alt,
  height,
  fit,
  position,
  radius,
  shadow,
  overlayCss,
}: {
  src: string
  alt: string
  height: string
  fit: string
  position: string
  radius: string
  shadow: boolean
  overlayCss: string
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: radius,
        overflow: "hidden",
        marginBottom: "1.1rem",
        boxShadow: shadow ? "0 14px 32px rgba(0,0,0,0.18)" : "none",
      }}
    >
      <img
        src={src}
        alt={alt || ""}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit as any,
          objectPosition: position,
          display: "block",
        }}
      />
      {overlayCss !== "none" ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: overlayCss,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </div>
  )
}

function TitleBlock({
  values,
  design,
  tags,
  displayFont,
  titleSize,
  letterSpacing,
  light,
  skipTitle,
}: {
  values: BlogPostFormValues
  design: BlogPostFormValues["design"]
  tags: string[]
  displayFont: string
  titleSize: string
  letterSpacing: string
  light: boolean
  skipTitle?: boolean
}) {
  const color = light ? "#fff" : design.colors.text
  const muted = light ? "rgba(255,255,255,0.85)" : design.colors.muted
  return (
    <div style={{ textAlign: design.typography.titleAlign }}>
      {!skipTitle ? (
        <h1
          style={{
            fontFamily: displayFont,
            fontSize: titleSize,
            letterSpacing,
            margin: 0,
            lineHeight: 1.15,
            color,
          }}
        >
          {values.title || "Untitled post"}
        </h1>
      ) : null}
      {values.subtitle ? (
        <p style={{ color: muted, margin: "0.45rem 0 0", fontSize: "1.05rem" }}>
          {values.subtitle}
        </p>
      ) : null}
      <MetaRow values={values} design={design} tags={tags} muted={muted} />
      {design.page.showExcerpt && values.excerpt ? (
        <p style={{ marginTop: "0.85rem", color: muted }}>{values.excerpt}</p>
      ) : null}
    </div>
  )
}

function MetaRow({
  values,
  design,
  tags,
  muted,
}: {
  values: BlogPostFormValues
  design: BlogPostFormValues["design"]
  tags: string[]
  muted: string
}) {
  const items: ReactNode[] = []
  if (design.page.showAuthor && values.author_name) {
    items.push(<span key="a">By {values.author_name}</span>)
  }
  if (design.page.showDate) {
    items.push(<span key="d">Published date</span>)
  }
  if (values.is_featured) {
    items.push(
      <span key="f" style={{ color: design.colors.accent, fontWeight: 600 }}>
        Featured
      </span>
    )
  }
  if (design.page.showTags) {
    tags.forEach((tag) =>
      items.push(
        <span
          key={tag}
          style={{
            border: `1px solid ${design.colors.border}`,
            padding: "0.1rem 0.45rem",
            borderRadius: 999,
          }}
        >
          {tag}
        </span>
      )
    )
  }
  if (!items.length) return null
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem 1rem",
        fontSize: "0.75rem",
        color: muted,
        marginTop: "0.75rem",
        fontWeight: design.page.stickyMeta ? 600 : 400,
      }}
    >
      {items}
    </div>
  )
}

function Divider({
  style,
  color,
  accent,
}: {
  style: string
  color: string
  accent: string
}) {
  if (style === "ornament") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "1.25rem 0",
          color: accent,
        }}
      >
        <div style={{ flex: 1, height: 1, background: color }} />
        <span style={{ fontSize: 12 }}>◆</span>
        <div style={{ flex: 1, height: 1, background: color }} />
      </div>
    )
  }
  return (
    <div
      style={{
        height: 1,
        background: color,
        margin: "1.25rem 0",
      }}
    />
  )
}

function Body({ html }: { html: string }) {
  if (!html || html === "<p></p>") {
    return (
      <p style={{ opacity: 0.5, fontStyle: "italic" }}>
        Start writing to see body content here…
      </p>
    )
  }
  return (
    <div className="gg-body" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
