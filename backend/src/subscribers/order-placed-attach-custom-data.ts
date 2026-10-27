import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { CUSTOM_DESIGN_MODULE } from "../modules/customDesign"
import CustomDesignModuleService from "../modules/customDesign/service"
import { ORDER_MESSAGE_MODULE } from "../modules/orderMessage"
import OrderMessageModuleService from "../modules/orderMessage/service"

/**
 * When an order is placed, attach cart-scoped custom designs and
 * order messages/quotes onto the new order id.
 */
export default async function orderPlacedAttachCustomData({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const orderId = data.id
  if (!orderId) {
    return
  }

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "email", "customer_id", "cart.id"],
    filters: { id: orderId },
  })

  const order = orders?.[0]
  const cartId = (order as any)?.cart?.id as string | undefined

  if (!cartId) {
    logger.info(
      `[order-placed] No cart linked to order ${orderId}; skipping custom data attach`
    )
    return
  }

  const customDesignService = container.resolve<CustomDesignModuleService>(
    CUSTOM_DESIGN_MODULE
  )
  const orderMessageService = container.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )

  const designs = await customDesignService.attachCartDesignsToOrder({
    cartId,
    orderId,
    customerId: (order as any)?.customer_id,
  })

  const messages = await orderMessageService.attachCartMessagesToOrder({
    cartId,
    orderId,
    customerId: (order as any)?.customer_id,
    email: (order as any)?.email,
  })

  logger.info(
    `[order-placed] Attached ${designs.length} design(s) and ${messages.length} message(s) to order ${orderId}`
  )
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
