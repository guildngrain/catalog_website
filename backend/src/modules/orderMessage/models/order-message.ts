import { model } from "@medusajs/framework/utils"
import MessageCategory from "./message-category"

const OrderMessage = model.define("order_message", {
  id: model.id().primaryKey(),
  body: model.text(),
  status: model.enum(["open", "quoted", "closed"]).default("open"),
  cart_id: model.text().nullable(),
  order_id: model.text().nullable(),
  customer_id: model.text().nullable(),
  email: model.text().nullable(),
  staff_note: model.text().nullable(),
  quote_amount: model.number().nullable(),
  metadata: model.json().nullable(),
  category: model.belongsTo(() => MessageCategory, {
    mappedBy: "messages",
  }),
})

export default OrderMessage
