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
