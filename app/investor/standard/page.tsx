"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, ExternalLink, Calendar, FileText } from "lucide-react"
import { getFileIcon } from "@/lib/file-utils"

interface Document {
  id: string
  title: string
  description?: string
  date?: string
  filePath?: string
  externalUrl?: string
  version?: string
  category: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Муниципальный инвестиционный стандарт города Волгограда",
    description: "Основные принципы и требования к инвестиционным проектам на территории города",
    date: "2024-01-15",
    filePath: "/uploads/2024/01/standard-main-1705123456.pdf",
    version: "2.1",
    category: "STANDARD",
  },
  {
    id: "2",
    title: "Порядок предоставления земельных участков инвесторам",
    description: "Регламент предоставления земельных участков для реализации инвестиционных проектов",
    date: "2023-12-20",
    filePath: "/uploads/2023/12/land-procedure-1703123456.pdf",
    version: "1.5",
    category: "STANDARD",
  },
  {
    id: "3",
    title: "Льготы и преференции для инвесторов",
    description: "Перечень налоговых и иных льгот, предоставляемых инвесторам",
    date: "2024-02-10",
    externalUrl: "https://volgograd.ru/benefits",
    version: "3.0",
    category: "STANDARD",
  },
]

export default function StandardPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>(mockDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  useEffect(() => {
    let filtered = documents

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Year filter
    if (yearFilter !== "all") {
      filtered = filtered.filter((doc) => {
        if (!doc.date) return false
        return new Date(doc.date).getFullYear().toString() === yearFilter
      })
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((doc) => {
        if (typeFilter === "pdf") return doc.filePath?.endsWith(".pdf")
        if (typeFilter === "external") return !!doc.externalUrl
        return true
      })
    }

    setFilteredDocuments(filtered)
  }, [documents, searchQuery, yearFilter, typeFilter])

  const getAvailableYears = () => {
    const years = documents
      .filter((doc) => doc.date)
      .map((doc) => new Date(doc.date!).getFullYear())
      .filter((year, index, arr) => arr.indexOf(year) === index)
      .sort((a, b) => b - a)
    return years
  }

  const handleDownload = (doc: Document) => {
    if (doc.externalUrl) {
      window.open(doc.externalUrl, "_blank", "noopener,noreferrer")
    } else if (doc.filePath) {
      window.open(doc.filePath, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Муниципальный инвестиционный стандарт</h1>
          <p className="text-lg text-gray-600">Нормативные документы и стандарты для инвесторов города Волгограда</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 p-6 border-b bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск по названию или описанию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Год" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все годы</SelectItem>
                  {getAvailableYears().map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="pdf">PDF файлы</SelectItem>
                  <SelectItem value="external">Внешние ссылки</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Документы не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{doc.title}</CardTitle>
                        {doc.description && <p className="text-gray-600">{doc.description}</p>}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {doc.version && <Badge variant="outline">v{doc.version}</Badge>}
                        {doc.externalUrl ? (
                          <Badge className="bg-green-100 text-green-800">Внешняя ссылка</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">PDF документ</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {doc.date && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(doc.date).toLocaleDateString("ru-RU")}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <span>{getFileIcon(doc.externalUrl ? "external" : "application/pdf")}</span>
                          <span>{doc.externalUrl ? "Внешняя ссылка" : "PDF документ"}</span>
                        </div>
                      </div>
                      <Button onClick={() => handleDownload(doc)} className="flex items-center space-x-2">
                        {doc.externalUrl ? (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            <span>Перейти</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Скачать</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
