import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ORDER_MESSAGE_MODULE } from "../../../modules/orderMessage"
import OrderMessageModuleService from "../../../modules/orderMessage/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )

  const limit = Math.min(Number(req.query.limit) || 50, 100)
  const offset = Number(req.query.offset) || 0

  const filters: Record<string, unknown> = {}
  if (req.query.category_id) filters.category_id = req.query.category_id
  if (req.query.status) filters.status = req.query.status
  if (req.query.order_id) filters.order_id = req.query.order_id
  if (req.query.cart_id) filters.cart_id = req.query.cart_id

  const [messages, count] = await service.listAndCountOrderMessages(filters, {
    take: limit,
    skip: offset,
    order: { created_at: "DESC" },
    relations: ["category"],
  })

  res.json({ messages, count, limit, offset })
}
