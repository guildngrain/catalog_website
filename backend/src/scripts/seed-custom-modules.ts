import { ExecArgs } from "@medusajs/framework/types"
import { ORDER_MESSAGE_MODULE } from "../modules/orderMessage"
import OrderMessageModuleService from "../modules/orderMessage/service"
import { BLOG_MODULE } from "../modules/blog"
import BlogModuleService from "../modules/blog/service"

const MESSAGE_CATEGORIES = [
  {
    name: "Custom Design",
    handle: "custom_design",
    description: "Customer wants a custom design quote or notes",
  },
  {
    name: "Bulk Order",
    handle: "bulk",
    description: "Bulk / wholesale inquiry tied to an order or cart",
  },
  {
    name: "Engraving",
    handle: "engraving",
    description: "Engraving or personalization requests",
  },
  {
    name: "Gift Note",
    handle: "gift_note",
    description: "Gift message for the order",
  },
  {
    name: "General",
    handle: "general",
    description: "General order message",
  },
]

const BLOG_CATEGORIES = [
  {
    name: "Leather Care",
    handle: "leather-care",
    description: "Care guides and tips",
  },
  {
    name: "Buying Guides",
    handle: "buying-guides",
    description: "How to choose the right piece",
  },
  {
    name: "Brand Stories",
    handle: "brand-stories",
    description: "Guild & Grain stories",
  },
]

export default async function seedCustomModules({ container }: ExecArgs) {
  const orderMessageService = container.resolve<OrderMessageModuleService>(
    ORDER_MESSAGE_MODULE
  )
  const blogService = container.resolve<BlogModuleService>(BLOG_MODULE)

  for (const category of MESSAGE_CATEGORIES) {
    const existing = await orderMessageService.listMessageCategories({
      handle: category.handle,
    })
    if (!existing.length) {
      await orderMessageService.createMessageCategories(category)
    }
  }

  for (const category of BLOG_CATEGORIES) {
    const existing = await blogService.listBlogCategories({
      handle: category.handle,
    })
    if (!existing.length) {
      await blogService.createBlogCategories(category)
    }
  }

  console.log("Seeded message categories and blog categories")
}
