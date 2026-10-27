import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { CUSTOM_DESIGN_MODULE } from "../../../../modules/customDesign"
import CustomDesignModuleService from "../../../../modules/customDesign/service"
import { uploadFilesAsWebp } from "../../../../utils/upload-webp"

type UploadedRequest = MedusaRequest & {
  files?: Express.Multer.File[]
}

export async function POST(req: UploadedRequest, res: MedusaResponse) {
  const files = req.files || []
  if (!files.length) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "No files were uploaded")
  }

  const body = (req.body || {}) as {
    cart_id?: string
    order_id?: string
    line_item_id?: string
    customer_id?: string
  }

  const uploaded = await uploadFilesAsWebp(req.scope, files)
  const service = req.scope.resolve<CustomDesignModuleService>(
    CUSTOM_DESIGN_MODULE
  )

  const designs = await service.createCustomDesigns(
    uploaded.map((file) => ({
      url: file.url,
      file_id: file.file_id,
      original_filename: file.originalFilename,
      mime_type: file.mimeType,
      width: file.width,
      height: file.height,
      cart_id: body.cart_id || null,
      order_id: body.order_id || null,
      line_item_id: body.line_item_id || null,
      customer_id: body.customer_id || null,
    }))
  )

  res.status(201).json({ designs })
}
