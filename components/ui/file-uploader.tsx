"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, File } from "lucide-react"
import Image from "next/image"

interface FileUploaderProps {
  onUpload: (filePath: string) => void
  onRemove?: (filePath: string) => void
  accept?: string
  maxSize?: number
  multiple?: boolean
  value?: string | string[]
  slug?: string
  className?: string
}

export function FileUploader({
  onUpload,
  onRemove,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png",
  maxSize = 20,
  multiple = false,
  value,
  slug,
  className,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const files = Array.isArray(value) ? value : value ? [value] : []

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    setUploading(true)
    try {
      for (const file of Array.from(selectedFiles)) {
        const formData = new FormData()
        formData.append("file", file)
        if (slug) formData.append("slug", slug)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Ошибка загрузки")
        }

        const result = await response.json()
        onUpload(result.filePath)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert(error instanceof Error ? error.message : "Ошибка загрузки файла")
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemove = async (filePath: string) => {
    if (onRemove) {
      onRemove(filePath)
    }
  }

  const isImage = (filePath: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filePath)
  }

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Перетащите файлы сюда или{" "}
          <button
            type="button"
            className="text-blue-600 hover:text-blue-500"
            onClick={() => fileInputRef.current?.click()}
          >
            выберите файлы
          </button>
        </p>
        <p className="text-xs text-gray-500">Максимальный размер: {maxSize}MB</p>
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={uploading}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((filePath, index) => (
            <Card key={index}>
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  {isImage(filePath) ? (
                    <div className="relative w-12 h-12 rounded overflow-hidden">
                      <Image src={filePath || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <File className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{filePath.split("/").pop()}</p>
                    <p className="text-xs text-gray-500">{isImage(filePath) ? "Изображение" : "Документ"}</p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleRemove(filePath)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {uploading && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Загрузка файлов...</p>
        </div>
      )}
    </div>
  )
}
