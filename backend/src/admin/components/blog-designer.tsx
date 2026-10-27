import {
  Button,
  Checkbox,
  Heading,
  Input,
  Label,
  Select,
  Text,
  Textarea,
} from "@medusajs/ui"
import { useState, type ReactNode } from "react"
import { withLayoutChange, withStylePresetChange } from "../lib/blog"
import {
  BlogDesignConfig,
  HERO_STYLE_OPTIONS,
  HeroStyle,
} from "../types/blog-design"
import {
  BlogLayout,
  BlogPostFormValues,
  BlogStylePreset,
  LAYOUT_OPTIONS,
  STYLE_PRESET_OPTIONS,
} from "../types/blog"

type TabId = "template" | "hero" | "theme" | "type" | "page" | "advanced"

const TABS: { id: TabId; label: string }[] = [
  { id: "template", label: "Template" },
  { id: "hero", label: "Hero & image" },
  { id: "theme", label: "Colors" },
  { id: "type", label: "Typography" },
  { id: "page", label: "Page" },
  { id: "advanced", label: "Advanced" },
]

type BlogDesignerProps = {
  values: BlogPostFormValues
  onChange: (next: BlogPostFormValues) => void
}

export function BlogDesigner({ values, onChange }: BlogDesignerProps) {
  const [tab, setTab] = useState<TabId>("template")

  const patchDesign = (patch: DeepPartial<BlogDesignConfig>) => {
    onChange({
      ...values,
      design: mergeDesign(values.design, patch),
    })
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Heading level="h2">Design studio</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Design the full article: template, hero image layout, colors,
          typography, and page chrome. Preview updates live.
        </Text>
      </div>

      <div className="flex flex-wrap gap-1 border-b border-ui-border-base pb-2">
        {TABS.map((t) => (
          <Button
            key={t.id}
            type="button"
            size="small"
            variant={tab === t.id ? "primary" : "secondary"}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {tab === "template" ? (
        <TemplateTab values={values} onChange={onChange} />
      ) : null}
      {tab === "hero" ? (
        <HeroTab design={values.design} patchDesign={patchDesign} values={values} onChange={onChange} />
      ) : null}
      {tab === "theme" ? (
        <ThemeTab design={values.design} patchDesign={patchDesign} />
      ) : null}
      {tab === "type" ? (
        <TypeTab design={values.design} patchDesign={patchDesign} />
      ) : null}
      {tab === "page" ? (
        <PageTab
          design={values.design}
          patchDesign={patchDesign}
          values={values}
          onChange={onChange}
        />
      ) : null}
      {tab === "advanced" ? (
        <AdvancedTab values={values} onChange={onChange} />
      ) : null}
    </div>
  )
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

function mergeDesign(
  base: BlogDesignConfig,
  patch: DeepPartial<BlogDesignConfig>
): BlogDesignConfig {
  return {
    version: 1,
    colors: { ...base.colors, ...(patch.colors || {}) },
    typography: { ...base.typography, ...(patch.typography || {}) },
    hero: { ...base.hero, ...(patch.hero || {}) },
    page: { ...base.page, ...(patch.page || {}) },
    media: { ...base.media, ...(patch.media || {}) },
  }
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-sm font-medium text-ui-fg-base">{children}</div>
}

function TemplateTab({
  values,
  onChange,
}: {
  values: BlogPostFormValues
  onChange: (next: BlogPostFormValues) => void
}) {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <SectionLabel>Page template</SectionLabel>
        <Text size="small" className="text-ui-fg-subtle">
          Starts from a layout, then fine-tune hero / type in other tabs.
        </Text>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {LAYOUT_OPTIONS.map((opt) => {
            const selected = values.layout === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onChange(withLayoutChange(values, opt.value as BlogLayout))
                }
                className={`rounded-lg border px-3 py-3 text-left ${
                  selected
                    ? "border-ui-border-interactive bg-ui-bg-interactive/10"
                    : "border-ui-border-base hover:bg-ui-bg-subtle"
                }`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="mt-0.5 text-xs text-ui-fg-subtle">{opt.hint}</div>
                <LayoutThumb layout={opt.value} active={selected} />
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <SectionLabel>Color / mood preset</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {STYLE_PRESET_OPTIONS.map((opt) => {
            const selected = values.style_preset === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onChange(
                    withStylePresetChange(values, opt.value as BlogStylePreset)
                  )
                }
                className={`rounded-lg border px-3 py-2 text-left ${
                  selected
                    ? "border-ui-border-interactive bg-ui-bg-interactive/10"
                    : "border-ui-border-base hover:bg-ui-bg-subtle"
                }`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-ui-fg-subtle">{opt.hint}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LayoutThumb({ layout, active }: { layout: string; active: boolean }) {
  const ink = active ? "#1f2937" : "#9ca3af"
  return (
    <div
      className="mt-2 grid h-14 grid-cols-3 gap-1 rounded border border-ui-border-base bg-ui-bg-base p-1.5"
      aria-hidden
    >
      {layout === "editorial" ? (
        <>
          <div className="col-span-3 rounded-sm" style={{ background: ink, opacity: 0.35 }} />
          <div className="col-span-2 h-2 rounded-sm" style={{ background: ink }} />
        </>
      ) : layout === "magazine" ? (
        <>
          <div className="col-span-2 space-y-1">
            <div className="h-2 rounded-sm" style={{ background: ink }} />
            <div className="h-1.5 w-3/4 rounded-sm" style={{ background: ink, opacity: 0.5 }} />
          </div>
          <div className="rounded-sm" style={{ background: ink, opacity: 0.35 }} />
        </>
      ) : layout === "minimal" ? (
        <>
          <div className="col-span-2 space-y-1">
            <div className="h-2 rounded-sm" style={{ background: ink }} />
            <div className="h-1.5 rounded-sm" style={{ background: ink, opacity: 0.45 }} />
          </div>
          <div className="h-10 w-8 justify-self-end rounded-sm" style={{ background: ink, opacity: 0.35 }} />
        </>
      ) : (
        <>
          <div className="col-span-3 rounded-sm" style={{ background: ink, opacity: 0.3 }} />
          <div className="col-span-3 h-2 rounded-sm" style={{ background: ink }} />
        </>
      )}
    </div>
  )
}

function HeroTab({
  design,
  patchDesign,
  values,
  onChange,
}: {
  design: BlogDesignConfig
  patchDesign: (p: DeepPartial<BlogDesignConfig>) => void
  values: BlogPostFormValues
  onChange: (next: BlogPostFormValues) => void
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <SectionLabel>Hero / image layout</SectionLabel>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {HERO_STYLE_OPTIONS.map((opt) => {
            const selected = design.hero.style === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  patchDesign({ hero: { style: opt.value as HeroStyle } })
                }
                className={`rounded-lg border px-3 py-2 text-left ${
                  selected
                    ? "border-ui-border-interactive bg-ui-bg-interactive/10"
                    : "border-ui-border-base hover:bg-ui-bg-subtle"
                }`}
              >
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-ui-fg-subtle">{opt.hint}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FieldSelect
          label="Hero height"
          value={design.hero.height}
          onChange={(v) => patchDesign({ hero: { height: v as any } })}
          options={[
            { value: "sm", label: "Small" },
            { value: "md", label: "Medium" },
            { value: "lg", label: "Large" },
            { value: "xl", label: "Extra large" },
          ]}
        />
        <FieldSelect
          label="Image fit"
          value={design.hero.imageFit}
          onChange={(v) => patchDesign({ hero: { imageFit: v as any } })}
          options={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
          ]}
        />
        <FieldSelect
          label="Focal position"
          value={design.hero.imagePosition}
          onChange={(v) => patchDesign({ hero: { imagePosition: v as any } })}
          options={[
            { value: "center", label: "Center" },
            { value: "top", label: "Top" },
            { value: "bottom", label: "Bottom" },
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
          ]}
        />
        <FieldSelect
          label="Overlay"
          value={design.hero.overlay}
          onChange={(v) => patchDesign({ hero: { overlay: v as any } })}
          options={[
            { value: "none", label: "None" },
            { value: "soft", label: "Soft" },
            { value: "strong", label: "Strong" },
            { value: "gradient", label: "Gradient up" },
          ]}
        />
        <FieldSelect
          label="Image corners"
          value={design.hero.imageRadius}
          onChange={(v) => patchDesign({ hero: { imageRadius: v as any } })}
          options={[
            { value: "none", label: "Square" },
            { value: "sm", label: "Slight" },
            { value: "md", label: "Rounded" },
            { value: "lg", label: "Soft" },
          ]}
        />
        <div className="flex flex-col gap-y-2">
          <Label>Overlay tint</Label>
          <input
            type="color"
            value={design.hero.overlayColor || "#000000"}
            onChange={(e) =>
              patchDesign({ hero: { overlayColor: e.target.value } })
            }
            className="h-9 w-full cursor-pointer rounded border border-ui-border-base"
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label className="flex items-center gap-x-2">
          <Checkbox
            checked={design.hero.showTitleOnImage}
            onCheckedChange={(c) =>
              patchDesign({ hero: { showTitleOnImage: !!c } })
            }
          />
          <span className="text-sm">Place title over the hero image</span>
        </label>
        <label className="flex items-center gap-x-2">
          <Checkbox
            checked={design.hero.imageShadow}
            onCheckedChange={(c) =>
              patchDesign({ hero: { imageShadow: !!c } })
            }
          />
          <span className="text-sm">Drop shadow on cover</span>
        </label>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label>Cover alt text</Label>
        <Input
          value={values.cover_alt}
          onChange={(e) => onChange({ ...values, cover_alt: e.target.value })}
          placeholder="Describe the cover for accessibility"
        />
      </div>
    </div>
  )
}

function ThemeTab({
  design,
  patchDesign,
}: {
  design: BlogDesignConfig
  patchDesign: (p: DeepPartial<BlogDesignConfig>) => void
}) {
  const fields: { key: keyof BlogDesignConfig["colors"]; label: string }[] = [
    { key: "background", label: "Background" },
    { key: "text", label: "Text" },
    { key: "muted", label: "Muted / secondary" },
    { key: "accent", label: "Accent" },
    { key: "border", label: "Border" },
  ]
  return (
    <div className="flex flex-col gap-y-4">
      <Text size="small" className="text-ui-fg-subtle">
        Override preset colors for this post only.
      </Text>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className="flex flex-col gap-y-2">
            <Label>{f.label}</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={design.colors[f.key]}
                onChange={(e) =>
                  patchDesign({ colors: { [f.key]: e.target.value } })
                }
                className="h-9 w-12 cursor-pointer rounded border border-ui-border-base"
              />
              <Input
                value={design.colors[f.key]}
                onChange={(e) =>
                  patchDesign({ colors: { [f.key]: e.target.value } })
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="rounded-lg border p-4"
        style={{
          background: design.colors.background,
          color: design.colors.text,
          borderColor: design.colors.border,
        }}
      >
        <div style={{ fontWeight: 600 }}>Sample headline</div>
        <div style={{ color: design.colors.muted, fontSize: 13, marginTop: 4 }}>
          Muted supporting line
        </div>
        <div style={{ color: design.colors.accent, marginTop: 8, fontSize: 13 }}>
          Accent link / label
        </div>
      </div>
    </div>
  )
}

function TypeTab({
  design,
  patchDesign,
}: {
  design: BlogDesignConfig
  patchDesign: (p: DeepPartial<BlogDesignConfig>) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <FieldSelect
        label="Display font"
        value={design.typography.displayFont}
        onChange={(v) => patchDesign({ typography: { displayFont: v as any } })}
        options={[
          { value: "serif", label: "Serif" },
          { value: "sans", label: "Sans" },
          { value: "display", label: "Display serif" },
        ]}
      />
      <FieldSelect
        label="Body font"
        value={design.typography.bodyFont}
        onChange={(v) => patchDesign({ typography: { bodyFont: v as any } })}
        options={[
          { value: "serif", label: "Serif" },
          { value: "sans", label: "Sans" },
          { value: "display", label: "Display serif" },
        ]}
      />
      <FieldSelect
        label="Title size"
        value={design.typography.titleSize}
        onChange={(v) => patchDesign({ typography: { titleSize: v as any } })}
        options={[
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "XL" },
          { value: "hero", label: "Hero" },
        ]}
      />
      <FieldSelect
        label="Title align"
        value={design.typography.titleAlign}
        onChange={(v) => patchDesign({ typography: { titleAlign: v as any } })}
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ]}
      />
      <FieldSelect
        label="Body size"
        value={design.typography.bodySize}
        onChange={(v) => patchDesign({ typography: { bodySize: v as any } })}
        options={[
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ]}
      />
      <FieldSelect
        label="Line height"
        value={design.typography.lineHeight}
        onChange={(v) => patchDesign({ typography: { lineHeight: v as any } })}
        options={[
          { value: "tight", label: "Tight" },
          { value: "normal", label: "Normal" },
          { value: "relaxed", label: "Relaxed" },
        ]}
      />
      <FieldSelect
        label="Letter spacing"
        value={design.typography.letterSpacing}
        onChange={(v) =>
          patchDesign({ typography: { letterSpacing: v as any } })
        }
        options={[
          { value: "tight", label: "Tight" },
          { value: "normal", label: "Normal" },
          { value: "wide", label: "Wide" },
        ]}
      />
      <label className="flex items-end gap-x-2 pb-2">
        <Checkbox
          checked={design.typography.dropCap}
          onCheckedChange={(c) =>
            patchDesign({ typography: { dropCap: !!c } })
          }
        />
        <span className="text-sm">Drop cap on first paragraph</span>
      </label>
    </div>
  )
}

function PageTab({
  design,
  patchDesign,
  values,
  onChange,
}: {
  design: BlogDesignConfig
  patchDesign: (p: DeepPartial<BlogDesignConfig>) => void
  values: BlogPostFormValues
  onChange: (next: BlogPostFormValues) => void
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FieldSelect
          label="Content width"
          value={design.page.contentWidth}
          onChange={(v) => patchDesign({ page: { contentWidth: v as any } })}
          options={[
            { value: "narrow", label: "Narrow" },
            { value: "medium", label: "Medium" },
            { value: "wide", label: "Wide" },
            { value: "full", label: "Full" },
          ]}
        />
        <FieldSelect
          label="Padding"
          value={design.page.padding}
          onChange={(v) => patchDesign({ page: { padding: v as any } })}
          options={[
            { value: "compact", label: "Compact" },
            { value: "normal", label: "Normal" },
            { value: "airy", label: "Airy" },
          ]}
        />
        <FieldSelect
          label="Divider"
          value={design.page.dividerStyle}
          onChange={(v) => patchDesign({ page: { dividerStyle: v as any } })}
          options={[
            { value: "none", label: "None" },
            { value: "line", label: "Hairline" },
            { value: "ornament", label: "Ornament" },
          ]}
        />
        <FieldSelect
          label="Inline images"
          value={design.media.inlineImageLayout}
          onChange={(v) =>
            patchDesign({ media: { inlineImageLayout: v as any } })
          }
          options={[
            { value: "full", label: "Full width" },
            { value: "center-medium", label: "Centered medium" },
            { value: "float-left", label: "Float left" },
            { value: "float-right", label: "Float right" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-y-2">
        {(
          [
            ["showExcerpt", "Show excerpt"],
            ["showTags", "Show tags"],
            ["showAuthor", "Show author"],
            ["showDate", "Show date placeholder"],
            ["stickyMeta", "Emphasize meta row"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center gap-x-2">
            <Checkbox
              checked={design.page[key]}
              onCheckedChange={(c) =>
                patchDesign({ page: { [key]: !!c } })
              }
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-y-2">
        <Label>Tags</Label>
        <Input
          value={values.tags}
          onChange={(e) => onChange({ ...values, tags: e.target.value })}
          placeholder="leather, care, guide"
        />
      </div>

      <label className="flex items-center gap-x-2">
        <Checkbox
          checked={values.is_featured}
          onCheckedChange={(c) =>
            onChange({ ...values, is_featured: !!c })
          }
        />
        <span className="text-sm">Featured on blog index</span>
      </label>
    </div>
  )
}

function AdvancedTab({
  values,
  onChange,
}: {
  values: BlogPostFormValues
  onChange: (next: BlogPostFormValues) => void
}) {
  return (
    <div className="flex flex-col gap-y-3">
      <SectionLabel>Custom CSS</SectionLabel>
      <Text size="small" className="text-ui-fg-subtle">
        Scoped to{" "}
        <code className="text-xs">
          .gg-blog-post-{values.handle || "your-handle"}
        </code>
        . Use for one-off tweaks beyond the studio controls.
      </Text>
      <Textarea
        rows={10}
        className="font-mono text-xs"
        value={values.custom_css}
        onChange={(e) => onChange({ ...values, custom_css: e.target.value })}
        placeholder={`.gg-blog-post-${values.handle || "slug"} .gg-body h2 {\n  text-transform: uppercase;\n}`}
      />
      <details className="rounded-lg border border-ui-border-base p-3">
        <summary className="cursor-pointer text-sm font-medium">
          Raw design JSON
        </summary>
        <Textarea
          rows={12}
          className="mt-2 font-mono text-xs"
          value={JSON.stringify(values.design, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value)
              onChange({ ...values, design: parsed })
            } catch {
              // ignore invalid JSON while typing
            }
          }}
        />
      </details>
    </div>
  )
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          {options.map((o) => (
            <Select.Item key={o.value} value={o.value}>
              {o.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}
