import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CUSTOM_DESIGN_MODULE } from "../../../modules/customDesign"
import CustomDesignModuleService from "../../../modules/customDesign/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve<CustomDesignModuleService>(
    CUSTOM_DESIGN_MODULE
  )

  const limit = Math.min(Number(req.query.limit) || 50, 100)
  const offset = Number(req.query.offset) || 0

  const filters: Record<string, unknown> = {}
  if (req.query.order_id) filters.order_id = req.query.order_id
  if (req.query.cart_id) filters.cart_id = req.query.cart_id
  if (req.query.customer_id) filters.customer_id = req.query.customer_id

  const [designs, count] = await service.listAndCountCustomDesigns(filters, {
    take: limit,
    skip: offset,
    order: { created_at: "DESC" },
  })

  res.json({ designs, count, limit, offset })
}
