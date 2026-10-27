import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { CUSTOM_DESIGN_MODULE } from "../../../modules/customDesign"
import CustomDesignModuleService from "../../../modules/customDesign/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const cartId = req.query.cart_id as string | undefined
  const orderId = req.query.order_id as string | undefined

  if (!cartId && !orderId) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Provide cart_id or order_id"
    )
  }

  const customDesignService =
    req.scope.resolve<CustomDesignModuleService>(CUSTOM_DESIGN_MODULE)

  const filters: Record<string, string> = {}
  if (cartId) filters.cart_id = cartId
  if (orderId) filters.order_id = orderId

  const [designs, count] = await customDesignService.listAndCountCustomDesigns(
    filters,
    { order: { created_at: "DESC" } }
  )

  res.json({ designs, count })
}
