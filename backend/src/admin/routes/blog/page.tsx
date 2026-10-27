import { defineRouteConfig } from "@medusajs/admin-sdk"
import { DocumentText, PlusMini } from "@medusajs/icons"
import {
  Badge,
  Button,
  Container,
  Heading,
  Table,
  Text,
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { sdk } from "../../lib/sdk"
import { BlogPost } from "../../types/blog"

type PostsResponse = {
  posts: BlogPost[]
  count: number
}

const BlogListPage = () => {
  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: () =>
      sdk.client.fetch<PostsResponse>("/admin/blog/posts", {
        query: { limit: 100, offset: 0 },
      }),
  })

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Blog</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Full design studio: templates, hero image layouts, colors, type, and CSS.
          </Text>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" asChild>
            <Link to="/blog/categories">Categories</Link>
          </Button>
          <Button asChild>
            <Link to="/blog/create">
              <PlusMini />
              New post
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-6 py-4">
        {isLoading ? (
          <Text>Loading posts…</Text>
        ) : !data?.posts?.length ? (
          <div className="flex flex-col items-start gap-y-3 py-10">
            <Text>No blog posts yet.</Text>
            <Button onClick={() => navigate("/blog/create")}>
              Create your first post
            </Button>
          </div>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Style</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.posts.map((post) => (
                <Table.Row
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/blog/posts/${post.id}`)}
                >
                  <Table.Cell>
                    <div className="flex flex-col gap-y-0.5">
                      <span className="font-medium">{post.title}</span>
                      <Text size="small" className="text-ui-fg-subtle">
                        /{post.handle}
                        {post.is_featured ? " · Featured" : ""}
                      </Text>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="small" className="text-ui-fg-subtle">
                      {post.layout || "default"} · {post.style_preset || "classic"}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>{post.category?.name || "—"}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={post.status === "published" ? "green" : "grey"}
                    >
                      {post.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/blog/posts/${post.id}`)
                      }}
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      <div className="flex justify-end px-6 py-3">
        <Button size="small" variant="transparent" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Blog",
  icon: DocumentText,
})

export default BlogListPage
