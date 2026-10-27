import { MedusaService } from "@medusajs/framework/utils"
import CustomDesign from "./models/custom-design"

class CustomDesignModuleService extends MedusaService({
  CustomDesign,
}) {
  async attachCartDesignsToOrder(input: {
    cartId: string
    orderId: string
    customerId?: string | null
  }) {
    const [designs] = await this.listAndCountCustomDesigns({
      cart_id: input.cartId,
    })

    if (!designs.length) {
      return []
    }

    return await Promise.all(
      designs.map((design) =>
        this.updateCustomDesigns({
          id: design.id,
          order_id: input.orderId,
          customer_id: input.customerId || design.customer_id,
        })
      )
    )
  }
}

export default CustomDesignModuleService
