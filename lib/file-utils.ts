import { writeFile, mkdir, unlink } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

const UPLOAD_DIR = process.env.UPLOAD_DIR || "public/uploads"
const MAX_UPLOAD_MB = Number.parseInt(process.env.MAX_UPLOAD_MB || "20")

export const ALLOWED_FILE_TYPES = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
}

export function generateFileName(originalName: string, slug?: string): string {
  const timestamp = Date.now()
  const ext = originalName.split(".").pop()?.toLowerCase()
  const baseSlug = slug || "file"
  return `${baseSlug}-${timestamp}.${ext}`
}

export async function saveFile(file: File, slug?: string): Promise<{ filePath: string; size: number; mime: string }> {
  // Validate file type
  if (!ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES]) {
    throw new Error(`Неподдерживаемый тип файла: ${file.type}`)
  }

  // Validate file size
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new Error(`Файл слишком большой. Максимальный размер: ${MAX_UPLOAD_MB}MB`)
  }

  // Create directory structure
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const uploadPath = join(UPLOAD_DIR, String(year), month)

  if (!existsSync(uploadPath)) {
    await mkdir(uploadPath, { recursive: true })
  }

  // Generate unique filename
  const fileName = generateFileName(file.name, slug)
  const filePath = join(uploadPath, fileName)
  const relativePath = filePath.replace("public/", "/")

  // Save file
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(filePath, buffer)

  return {
    filePath: relativePath,
    size: file.size,
    mime: file.type,
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  const fullPath = join("public", filePath)
  try {
    await unlink(fullPath)
  } catch (error) {
    console.error("Error deleting file:", error)
    throw new Error("Не удалось удалить файл")
  }
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "🖼️"
  if (mimeType === "application/pdf") return "📄"
  if (mimeType.includes("word")) return "📝"
  if (mimeType.includes("excel") || mimeType.includes("sheet")) return "📊"
  return "📎"
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
