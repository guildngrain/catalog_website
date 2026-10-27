import { MedusaContainer } from "@medusajs/framework/types"
import { uploadFilesWorkflow } from "@medusajs/core-flows"
import { convertUploadToWebp } from "./webp"

type MulterFile = {
  buffer: Buffer
  mimetype: string
  originalname: string
  size?: number
}

export async function uploadFilesAsWebp(
  container: MedusaContainer,
  files: MulterFile[]
) {
  const converted = await Promise.all(files.map((f) => convertUploadToWebp(f)))

  const { result } = await uploadFilesWorkflow(container).run({
    input: {
      files: converted.map((file) => ({
        filename: file.filename,
        mimeType: file.mimeType,
        content: file.buffer.toString("base64"),
        access: "public" as const,
      })),
    },
  })

  return converted.map((file, index) => ({
    ...file,
    url: result[index]?.url as string,
    file_id: result[index]?.id as string,
  }))
}
