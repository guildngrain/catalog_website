import OrderMessageModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const ORDER_MESSAGE_MODULE = "orderMessage"

export default Module(ORDER_MESSAGE_MODULE, {
  service: OrderMessageModuleService,
})
