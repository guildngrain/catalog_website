import { model } from "@medusajs/framework/utils"
import OrderMessage from "./order-message"

const MessageCategory = model.define("message_category", {
  id: model.id().primaryKey(),
  name: model.text(),
  handle: model.text().unique(),
  description: model.text().nullable(),
  messages: model.hasMany(() => OrderMessage, {
    mappedBy: "category",
  }),
})

export default MessageCategory
