import sharp from "sharp"
import { MedusaError } from "@medusajs/framework/utils"

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
])

const MAX_BYTES = 15 * 1024 * 1024 // 15MB

export type WebpConversionResult = {
  buffer: Buffer
  mimeType: "image/webp"
  filename: string
  width: number
  height: number
  originalFilename: string
}

function toWebpFilename(original: string) {
  const base = original.replace(/\.[^.]+$/, "") || "upload"
  const safe = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
  return `${safe || "upload"}.webp`
}

export async function convertUploadToWebp(file: {
  buffer: Buffer
  mimetype: string
  originalname: string
  size?: number
}): Promise<WebpConversionResult> {
  if (!file?.buffer?.length) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "No file uploaded")
  }

  if ((file.size ?? file.buffer.length) > MAX_BYTES) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "File exceeds the 15MB upload limit"
    )
  }

  if (!ALLOWED_MIME.has(file.mimetype.toLowerCase())) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Unsupported image type. Use JPEG, PNG, WebP, or HEIC."
    )
  }

  const image = sharp(file.buffer, { failOn: "none" }).rotate()
  const meta = await image.metadata()

  const buffer = await image
    .webp({ quality: 82, effort: 4 })
    .toBuffer()

  const outMeta = await sharp(buffer).metadata()

  return {
    buffer,
    mimeType: "image/webp",
    filename: toWebpFilename(file.originalname),
    width: outMeta.width || meta.width || 0,
    height: outMeta.height || meta.height || 0,
    originalFilename: file.originalname,
  }
}
