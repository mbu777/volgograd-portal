import { type NextRequest, NextResponse } from "next/server"
import { saveFile } from "@/lib/file-utils"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const slug = formData.get("slug") as string

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 })
    }

    const result = await saveFile(file, slug)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ошибка загрузки файла" },
      { status: 500 },
    )
  }
}
