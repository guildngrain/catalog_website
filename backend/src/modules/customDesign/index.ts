import CustomDesignModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const CUSTOM_DESIGN_MODULE = "customDesign"

export default Module(CUSTOM_DESIGN_MODULE, {
  service: CustomDesignModuleService,
})
