import { type NextRequest, NextResponse } from "next/server"
import { deleteFile } from "@/lib/file-utils"

export async function DELETE(request: NextRequest) {
  try {
    const { filePath } = await request.json()

    if (!filePath) {
      return NextResponse.json({ error: "Путь к файлу не указан" }, { status: 400 })
    }

    await deleteFile(filePath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Ошибка удаления файла" },
      { status: 500 },
    )
  }
}
