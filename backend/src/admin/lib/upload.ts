type UploadedFile = {
  url: string
  file_id: string
  filename: string
  mime_type: string
  width: number
  height: number
  original_filename: string
}

/** Upload one or more images through the blog WebP pipeline. */
export async function uploadBlogImages(files: File[]): Promise<UploadedFile[]> {
  if (!files.length) {
    throw new Error("No files selected")
  }

  const form = new FormData()
  for (const file of files) {
    form.append("files", file)
  }

  const response = await fetch("/admin/blog/uploads", {
    method: "POST",
    body: form,
    credentials: "include",
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || "Image upload failed")
  }

  return (data.files || []) as UploadedFile[]
}

export async function uploadBlogCover(
  postId: string,
  file: File
): Promise<{ cover_url: string }> {
  const form = new FormData()
  form.append("file", file)

  const response = await fetch(`/admin/blog/posts/${postId}/cover`, {
    method: "POST",
    body: form,
    credentials: "include",
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || "Cover upload failed")
  }

  return {
    cover_url: data.post?.cover_url || data.cover?.url,
  }
}
