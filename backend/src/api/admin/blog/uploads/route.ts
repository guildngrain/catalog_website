import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { uploadFilesAsWebp } from "../../../../utils/upload-webp"

type UploadedRequest = MedusaRequest & {
  files?: Express.Multer.File[]
}

/**
 * Generic blog image upload (cover or inline editor images).
 * Always converts to WebP via sharp.
 */
export async function POST(req: UploadedRequest, res: MedusaResponse) {
  const files = req.files || []
  if (!files.length) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "No files were uploaded")
  }

  const uploaded = await uploadFilesAsWebp(req.scope, files)

  res.status(201).json({
    files: uploaded.map((file) => ({
      url: file.url,
      file_id: file.file_id,
      filename: file.filename,
      mime_type: file.mimeType,
      width: file.width,
      height: file.height,
      original_filename: file.originalFilename,
    })),
  })
}
