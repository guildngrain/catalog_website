import {
  Button,
  Container,
  Heading,
  Label,
  Text,
  toast,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BlogPostForm } from "../../../../components/blog-post-form"
import { emptyBlogForm, postToFormValues, toBlogPayload } from "../../../../lib/blog"
import { sdk } from "../../../../lib/sdk"
import { uploadBlogCover } from "../../../../lib/upload"
import {
  BlogCategory,
  BlogPost,
  BlogPostFormValues,
} from "../../../../types/blog"

const EditBlogPostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [values, setValues] = useState<BlogPostFormValues>(emptyBlogForm())
  const [uploadingCover, setUploadingCover] = useState(false)
  const [localCoverPreview, setLocalCoverPreview] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["admin-blog-post", id],
    enabled: !!id,
    queryFn: () =>
      sdk.client.fetch<{ post: BlogPost }>(`/admin/blog/posts/${id}`),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: () =>
      sdk.client.fetch<{ categories: BlogCategory[] }>(
        "/admin/blog/categories"
      ),
  })

  useEffect(() => {
    if (!data?.post) return
    setValues(postToFormValues(data.post))
    // Prefer server URL once refreshed after upload
    if (data.post.cover_url) {
      setLocalCoverPreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev)
        return null
      })
    }
  }, [data?.post])

  const updateMutation = useMutation({
    mutationFn: async (payload: ReturnType<typeof toBlogPayload>) => {
      return sdk.client.fetch<{ post: BlogPost }>(`/admin/blog/posts/${id}`, {
        method: "POST",
        body: payload,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] })
      queryClient.invalidateQueries({ queryKey: ["admin-blog-post", id] })
      toast.success("Post saved")
    },
    onError: (err: Error) => {
      toast.error(err.message || "Could not save post")
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return sdk.client.fetch(`/admin/blog/posts/${id}`, {
        method: "DELETE",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] })
      toast.success("Post deleted")
      navigate("/blog")
    },
    onError: (err: Error) => {
      toast.error(err.message || "Could not delete post")
    },
  })

  const onCoverSelected = async (file?: File | null) => {
    if (!file || !id) return
    const objectUrl = URL.createObjectURL(file)
    setLocalCoverPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev)
      return objectUrl
    })
    setUploadingCover(true)
    try {
      await uploadBlogCover(id, file)
      await queryClient.invalidateQueries({ queryKey: ["admin-blog-post", id] })
      toast.success("Cover uploaded (converted to WebP)")
    } catch (err: any) {
      setLocalCoverPreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev)
        return null
      })
      toast.error(err.message || "Cover upload failed")
    } finally {
      setUploadingCover(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="p-6">
        <Text>Loading post…</Text>
      </Container>
    )
  }

  if (!data?.post) {
    return (
      <Container className="p-6">
        <Text>Post not found.</Text>
        <Button className="mt-4" onClick={() => navigate("/blog")}>
          Back to blog
        </Button>
      </Container>
    )
  }

  const coverUrl = localCoverPreview || data.post.cover_url || null

  return (
    <Container className="divide-y p-0">
      <div className="flex items-start justify-between gap-4 px-6 py-4">
        <div>
          <Heading level="h1">Edit post</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            {data.post.title} · /{data.post.handle} — design the full article in
            the Design studio (hero, colors, type, page).
          </Text>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" onClick={() => navigate("/blog")}>
            Back
          </Button>
          <Button
            variant="danger"
            isLoading={deleteMutation.isPending}
            onClick={() => {
              if (window.confirm("Delete this blog post?")) {
                deleteMutation.mutate()
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6 rounded-lg border border-ui-border-base p-4 lg:max-w-md">
          <Label className="mb-2">Cover image</Label>
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={data.post.cover_alt || values.cover_alt || ""}
              className="mb-3 aspect-[16/10] w-full rounded-md object-cover"
            />
          ) : (
            <Text size="small" className="mb-3 text-ui-fg-subtle">
              No cover yet. Choose a file — it is converted to WebP and used in
              the hero / live preview.
            </Text>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer">
              <span className="rounded-md bg-ui-bg-interactive px-3 py-1.5 text-sm text-ui-fg-on-color">
                {uploadingCover ? "Uploading…" : "Choose cover image"}
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
                disabled={uploadingCover}
                className="hidden"
                onChange={(e) => onCoverSelected(e.target.files?.[0])}
              />
            </label>
            {data.post.cover_url ? (
              <Text size="small" className="text-ui-fg-subtle break-all">
                {data.post.cover_url}
              </Text>
            ) : null}
          </div>
        </div>

        <BlogPostForm
          values={values}
          categories={categoriesData?.categories || []}
          submitting={updateMutation.isPending}
          submitLabel="Save changes"
          coverUrl={coverUrl}
          onChange={setValues}
          onSubmit={() => {
            if (!values.title.trim() || !values.handle.trim()) {
              toast.error("Title and handle are required")
              return
            }
            updateMutation.mutate(toBlogPayload(values))
          }}
        />
      </div>
    </Container>
  )
}

export default EditBlogPostPage
