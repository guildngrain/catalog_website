import {
  Button,
  Container,
  Heading,
  Input,
  Label,
  Table,
  Text,
  Textarea,
  toast,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router-dom"
import { slugifyHandle } from "../../../lib/blog"
import { sdk } from "../../../lib/sdk"
import { BlogCategory } from "../../../types/blog"

const BlogCategoriesPage = () => {
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [description, setDescription] = useState("")

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-blog-categories"],
    queryFn: () =>
      sdk.client.fetch<{ categories: BlogCategory[]; count: number }>(
        "/admin/blog/categories"
      ),
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      return sdk.client.fetch<{ category: BlogCategory }>(
        "/admin/blog/categories",
        {
          method: "POST",
          body: {
            name: name.trim(),
            handle: handle.trim(),
            description: description.trim() || undefined,
          },
        }
      )
    },
    onSuccess: () => {
      setName("")
      setHandle("")
      setDescription("")
      queryClient.invalidateQueries({ queryKey: ["admin-blog-categories"] })
      toast.success("Category created")
    },
    onError: (err: Error) => {
      toast.error(err.message || "Could not create category")
    },
  })

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Blog categories</Heading>
          <Text size="small" className="text-ui-fg-subtle">
            Organize posts for the storefront blog.
          </Text>
        </div>
        <Button variant="secondary" asChild>
          <Link to="/blog">Back to posts</Link>
        </Button>
      </div>

      <div className="grid gap-8 px-6 py-6 lg:grid-cols-2">
        <div className="flex flex-col gap-y-4">
          <Heading level="h2">Create category</Heading>
          <div className="flex flex-col gap-y-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => {
                const next = e.target.value
                setName(next)
                if (!handle || handle === slugifyHandle(name)) {
                  setHandle(slugifyHandle(next))
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Handle</Label>
            <Input
              value={handle}
              onChange={(e) => setHandle(slugifyHandle(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            isLoading={createMutation.isPending}
            onClick={() => {
              if (!name.trim() || !handle.trim()) {
                toast.error("Name and handle are required")
                return
              }
              createMutation.mutate()
            }}
          >
            Create category
          </Button>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <Heading level="h2">Existing</Heading>
            <Button size="small" variant="transparent" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>
          {isLoading ? (
            <Text>Loading…</Text>
          ) : !data?.categories?.length ? (
            <Text>No categories yet.</Text>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Handle</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.categories.map((category) => (
                  <Table.Row key={category.id}>
                    <Table.Cell>{category.name}</Table.Cell>
                    <Table.Cell>
                      <Text size="small" className="text-ui-fg-subtle">
                        {category.handle}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    </Container>
  )
}

export default BlogCategoriesPage
