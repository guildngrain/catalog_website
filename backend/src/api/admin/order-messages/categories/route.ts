import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ORDER_MESSAGE_MODULE } from "../../../../modules/orderMessage"
import OrderMessageModuleService from "../../../../modules/orderMessage/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )
  const [categories, count] = await service.listAndCountMessageCategories(
    {},
    { order: { name: "ASC" } }
  )
  res.json({ categories, count })
}

export async function POST(
  req: MedusaRequest<{ name: string; handle: string; description?: string }>,
  res: MedusaResponse
) {
  const service = req.scope.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )
  const body = req.body

  if (!body?.name || !body?.handle) {
    res.status(400).json({ message: "name and handle are required" })
    return
  }

  const category = await service.createMessageCategories({
    name: body.name,
    handle: body.handle,
    description: body.description || null,
  })

  res.status(201).json({ category })
}
