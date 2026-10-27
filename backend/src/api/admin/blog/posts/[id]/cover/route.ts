import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { BLOG_MODULE } from "../../../../../../modules/blog"
import BlogModuleService from "../../../../../../modules/blog/service"
import { uploadFilesAsWebp } from "../../../../../../utils/upload-webp"

type UploadedRequest = MedusaRequest & {
  file?: Express.Multer.File
}

export async function POST(req: UploadedRequest, res: MedusaResponse) {
  if (!req.file) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "No file was uploaded")
  }

  const [uploaded] = await uploadFilesAsWebp(req.scope, [req.file])
  const blogService = req.scope.resolve<BlogModuleService>(BLOG_MODULE)

  const post = await blogService.updateBlogPosts({
    id: req.params.id,
    cover_url: uploaded.url,
    cover_file_id: uploaded.file_id,
  })

  // Never return the binary buffer — it blows up the JSON response for real photos.
  res.json({
    post,
    cover: {
      url: uploaded.url,
      file_id: uploaded.file_id,
      filename: uploaded.filename,
      mime_type: uploaded.mimeType,
      width: uploaded.width,
      height: uploaded.height,
      original_filename: uploaded.originalFilename,
    },
  })
}
