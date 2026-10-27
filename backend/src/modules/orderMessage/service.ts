import { MedusaService } from "@medusajs/framework/utils"
import OrderMessage from "./models/order-message"
import MessageCategory from "./models/message-category"

class OrderMessageModuleService extends MedusaService({
  OrderMessage,
  MessageCategory,
}) {
  async attachCartMessagesToOrder(input: {
    cartId: string
    orderId: string
    customerId?: string | null
    email?: string | null
  }) {
    const [messages] = await this.listAndCountOrderMessages({
      cart_id: input.cartId,
    })

    if (!messages.length) {
      return []
    }

    return await Promise.all(
      messages.map((message) =>
        this.updateOrderMessages({
          id: message.id,
          order_id: input.orderId,
          customer_id: input.customerId || message.customer_id,
          email: input.email || message.email,
        })
      )
    )
  }
}

export default OrderMessageModuleService
