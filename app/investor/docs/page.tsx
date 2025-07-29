"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, FileText, Calendar, Filter } from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Стратегия социально-экономического развития Волгограда до 2030 года",
    type: "Стратегический документ",
    category: "Планирование",
    date: "2024-01-15",
    size: "2.5 МБ",
    format: "PDF",
    downloads: 1250,
  },
  {
    id: 2,
    name: "Положение о предоставлении субсидий субъектам МСП",
    type: "Нормативный акт",
    category: "Поддержка бизнеса",
    date: "2024-02-20",
    size: "850 КБ",
    format: "PDF",
    downloads: 890,
  },
  {
    id: 3,
    name: "Перечень инвестиционных площадок Волгограда",
    type: "Каталог",
    category: "Инвестиции",
    date: "2024-03-10",
    size: "5.2 МБ",
    format: "PDF",
    downloads: 2100,
  },
  {
    id: 4,
    name: "Регламент предоставления муниципальных услуг инвесторам",
    type: "Регламент",
    category: "Административные процедуры",
    date: "2024-01-30",
    size: "1.8 МБ",
    format: "PDF",
    downloads: 650,
  },
  {
    id: 5,
    name: "Инвестиционный паспорт Волгограда 2024",
    type: "Презентация",
    category: "Инвестиции",
    date: "2024-04-05",
    size: "12.3 МБ",
    format: "PDF",
    downloads: 3200,
  },
  {
    id: 6,
    name: "Порядок заключения соглашений о ГЧП",
    type: "Методические рекомендации",
    category: "ГЧП",
    date: "2024-02-15",
    size: "1.2 МБ",
    format: "PDF",
    downloads: 420,
  },
  {
    id: 7,
    name: "Льготы и преференции для инвесторов",
    type: "Справочник",
    category: "Поддержка бизнеса",
    date: "2024-03-25",
    size: "3.1 МБ",
    format: "PDF",
    downloads: 1800,
  },
  {
    id: 8,
    name: "Генеральный план развития города",
    type: "Градостроительный документ",
    category: "Планирование",
    date: "2023-12-20",
    size: "25.7 МБ",
    format: "PDF",
    downloads: 950,
  },
]

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const categories = [...new Set(documents.map((doc) => doc.category))]
  const types = [...new Set(documents.map((doc) => doc.type))]

  const filteredDocuments = documents.filter((doc) => {
    return (
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || doc.category === selectedCategory) &&
      (selectedType === "" || doc.type === selectedType)
    )
  })

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Стратегический документ": "bg-purple-100 text-purple-800",
      "Нормативный акт": "bg-red-100 text-red-800",
      Каталог: "bg-blue-100 text-blue-800",
      Регламент: "bg-green-100 text-green-800",
      Презентация: "bg-orange-100 text-orange-800",
      "Методические рекомендации": "bg-yellow-100 text-yellow-800",
      Справочник: "bg-indigo-100 text-indigo-800",
      "Градостроительный документ": "bg-gray-100 text-gray-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Документы и нормативная база</h1>
          <p className="text-lg text-gray-600">
            Нормативные документы, регламенты и справочные материалы для инвесторов
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 p-6 border-b bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск документов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Тип документа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
                setSelectedType("")
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Документы ({filteredDocuments.length})</span>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать все
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название документа</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Размер</TableHead>
                    <TableHead>Скачивания</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 leading-tight">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.format} • {doc.size}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(doc.type)} variant="outline">
                          {doc.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{doc.category}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(doc.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{doc.size}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{doc.downloads.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Просмотр
                          </Button>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Скачать
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Документы не найдены</p>
                  <p className="text-sm text-gray-400 mt-1">Попробуйте изменить параметры поиска</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
