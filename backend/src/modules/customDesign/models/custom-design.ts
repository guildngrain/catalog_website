import { model } from "@medusajs/framework/utils"

const CustomDesign = model.define("custom_design", {
  id: model.id().primaryKey(),
  url: model.text(),
  file_id: model.text().nullable(),
  original_filename: model.text().nullable(),
  mime_type: model.text().default("image/webp"),
  width: model.number().nullable(),
  height: model.number().nullable(),
  cart_id: model.text().nullable(),
  line_item_id: model.text().nullable(),
  order_id: model.text().nullable(),
  order_item_id: model.text().nullable(),
  customer_id: model.text().nullable(),
  metadata: model.json().nullable(),
})

export default CustomDesign
