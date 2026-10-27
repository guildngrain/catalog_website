import { Container, Heading, Text, toast } from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BlogPostForm } from "../../../components/blog-post-form"
import { emptyBlogForm, toBlogPayload } from "../../../lib/blog"
import { sdk } from "../../../lib/sdk"
import { BlogCategory, BlogPost, BlogPostFormValues } from "../../../types/blog"

const CreateBlogPostPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [values, setValues] = useState<BlogPostFormValues>(emptyBlogForm())

  const { data: categoriesData } = useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: () =>
      sdk.client.fetch<{ categories: BlogCategory[] }>(
        "/admin/blog/categories"
      ),
  })

  const createMutation = useMutation({
    mutationFn: async (payload: ReturnType<typeof toBlogPayload>) => {
      return sdk.client.fetch<{ post: BlogPost }>("/admin/blog/posts", {
        method: "POST",
        body: payload,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] })
      toast.success("Post created — upload a cover to complete the design")
      navigate(`/blog/posts/${data.post.id}`)
    },
    onError: (err: Error) => {
      toast.error(err.message || "Could not create post")
    },
  })

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h1">Create blog post</Heading>
        <Text size="small" className="text-ui-fg-subtle">
          Write content on the left. Use the Design studio on the right for
          template, hero image layout, colors, typography, and page chrome —
          with a live preview.
        </Text>
      </div>
      <div className="px-6 py-6">
        <BlogPostForm
          values={values}
          categories={categoriesData?.categories || []}
          submitting={createMutation.isPending}
          submitLabel="Create post"
          autoHandleFromTitle
          onChange={setValues}
          onCancel={() => navigate("/blog")}
          onSubmit={() => {
            if (!values.title.trim() || !values.handle.trim()) {
              toast.error("Title and handle are required")
              return
            }
            createMutation.mutate(toBlogPayload(values))
          }}
        />
      </div>
    </Container>
  )
}

export default CreateBlogPostPage
