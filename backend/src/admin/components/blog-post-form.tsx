import {
  Button,
  Heading,
  Input,
  Label,
  Select,
  Text,
  Textarea,
} from "@medusajs/ui"
import { slugifyHandle } from "../lib/blog"
import { BlogCategory, BlogPostFormValues } from "../types/blog"
import { BlogDesigner } from "./blog-designer"
import { BlogPostPreview } from "./blog-post-preview"
import { RichTextEditor } from "./rich-text-editor"

type BlogPostFormProps = {
  values: BlogPostFormValues
  categories: BlogCategory[]
  submitting?: boolean
  submitLabel: string
  onChange: (next: BlogPostFormValues) => void
  onSubmit: () => void
  onCancel?: () => void
  autoHandleFromTitle?: boolean
  coverUrl?: string | null
  showPreview?: boolean
}

export function BlogPostForm({
  values,
  categories,
  submitting,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
  autoHandleFromTitle = false,
  coverUrl,
  showPreview = true,
}: BlogPostFormProps) {
  const set = <K extends keyof BlogPostFormValues>(
    key: K,
    value: BlogPostFormValues[K]
  ) => onChange({ ...values, [key]: value })

  return (
    <form
      className="flex flex-col gap-y-8"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <div className="flex flex-col gap-y-8">
          <section className="flex flex-col gap-y-4">
            <Heading level="h2">Content</Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-y-2">
                <Label>Title</Label>
                <Input
                  required
                  value={values.title}
                  onChange={(e) => {
                    const title = e.target.value
                    if (autoHandleFromTitle) {
                      onChange({
                        ...values,
                        title,
                        handle: slugifyHandle(title),
                      })
                    } else {
                      set("title", title)
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Handle (URL slug)</Label>
                <Input
                  required
                  value={values.handle}
                  onChange={(e) => set("handle", slugifyHandle(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Subtitle</Label>
              <Input
                value={values.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="Optional deck / standfirst"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-y-2">
                <Label>Status</Label>
                <Select
                  value={values.status}
                  onValueChange={(value) =>
                    set("status", value as BlogPostFormValues["status"])
                  }
                >
                  <Select.Trigger>
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="draft">Draft</Select.Item>
                    <Select.Item value="published">Published</Select.Item>
                  </Select.Content>
                </Select>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Category</Label>
                <Select
                  value={values.category_id || "none"}
                  onValueChange={(value) =>
                    set("category_id", value === "none" ? "" : value)
                  }
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select category" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="none">No category</Select.Item>
                    {categories.map((category) => (
                      <Select.Item key={category.id} value={category.id}>
                        {category.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Author</Label>
              <Input
                value={values.author_name}
                onChange={(e) => set("author_name", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Excerpt</Label>
              <Textarea
                rows={3}
                value={values.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Short summary for cards and SEO"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Body</Label>
              <Text size="small" className="text-ui-fg-subtle">
                Rich text is stored as HTML. Inline images follow the Design →
                Page → Inline images setting.
              </Text>
              <RichTextEditor
                value={values.content}
                onChange={(html) => set("content", html)}
              />
            </div>
          </section>

          <section className="flex flex-col gap-y-4">
            <Heading level="h2">SEO</Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-y-2">
                <Label>SEO title</Label>
                <Input
                  value={values.seo_title}
                  onChange={(e) => set("seo_title", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>SEO description</Label>
                <Input
                  value={values.seo_description}
                  onChange={(e) => set("seo_description", e.target.value)}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-y-6 xl:sticky xl:top-4 xl:self-start">
          <section className="rounded-lg border border-ui-border-base p-4">
            <BlogDesigner values={values} onChange={onChange} />
          </section>

          {showPreview ? (
            <section className="rounded-lg border border-ui-border-base p-4">
              <BlogPostPreview values={values} coverUrl={coverUrl} />
            </section>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-2 border-t border-ui-border-base pt-4">
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" isLoading={submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
