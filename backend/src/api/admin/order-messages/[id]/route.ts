import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ORDER_MESSAGE_MODULE } from "../../../../modules/orderMessage"
import OrderMessageModuleService from "../../../../modules/orderMessage/service"

type UpdateBody = {
  status?: "open" | "quoted" | "closed"
  staff_note?: string | null
  quote_amount?: number | null
  metadata?: Record<string, unknown> | null
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )
  const message = await service.retrieveOrderMessage(req.params.id, {
    relations: ["category"],
  })
  res.json({ message })
}

export async function POST(req: MedusaRequest<UpdateBody>, res: MedusaResponse) {
  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )
  const body = req.body as UpdateBody

  const message = await service.updateOrderMessages({
    id: req.params.id,
    ...body,
  })

  res.json({ message })
}
