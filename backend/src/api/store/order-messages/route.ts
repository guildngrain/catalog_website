import {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { ORDER_MESSAGE_MODULE } from "../../../modules/orderMessage"
import OrderMessageModuleService from "../../../modules/orderMessage/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const cartId = req.query.cart_id as string | undefined
  const orderId = req.query.order_id as string | undefined

  if (!cartId && !orderId) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Provide cart_id or order_id"
    )
  }

  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )

  const filters: Record<string, string> = {}
  if (cartId) filters.cart_id = cartId
  if (orderId) filters.order_id = orderId

  const [messages, count] = await service.listAndCountOrderMessages(filters, {
    order: { created_at: "DESC" },
    relations: ["category"],
  })

  res.json({ messages, count })
}

type CreateBody = {
  body: string
  category_id: string
  cart_id?: string
  order_id?: string
  email?: string
  metadata?: Record<string, unknown>
}

export async function POST(
  req: AuthenticatedMedusaRequest<CreateBody>,
  res: MedusaResponse
) {
  const payload = req.validatedBody || (req.body as CreateBody)

  if (!payload?.body?.trim()) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "body is required")
  }
  if (!payload.category_id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "category_id is required"
    )
  }
  if (!payload.cart_id && !payload.order_id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "cart_id or order_id is required"
    )
  }

  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )

  // ensure category exists
  await service.retrieveMessageCategory(payload.category_id)

  const customerId = req.auth_context?.actor_id || null

  const message = await service.createOrderMessages({
    body: payload.body.trim(),
    category_id: payload.category_id,
    cart_id: payload.cart_id || null,
    order_id: payload.order_id || null,
    email: payload.email || null,
    customer_id: customerId,
    metadata: payload.metadata || null,
    status: "open",
  })

  res.status(201).json({ message })
}
