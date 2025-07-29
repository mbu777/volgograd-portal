"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MapPin, Building, Zap, Droplets } from "lucide-react"

const realtyObjects = [
  {
    id: 1,
    name: "Производственный комплекс №1",
    district: "Тракторозаводский",
    area: "5,000 м²",
    price: "25,000,000 ₽",
    communications: ["Электричество", "Водоснабжение", "Газ"],
    status: "Доступен",
    type: "Производственное",
    year: 2020,
  },
  {
    id: 2,
    name: "Складской комплекс «Логистика»",
    district: "Красноармейский",
    area: "8,500 м²",
    price: "35,000,000 ₽",
    communications: ["Электричество", "Водоснабжение"],
    status: "В аренде",
    type: "Складское",
    year: 2019,
  },
  {
    id: 3,
    name: "Офисный центр «Бизнес-Плаза»",
    district: "Центральный",
    area: "2,200 м²",
    price: "45,000,000 ₽",
    communications: ["Электричество", "Водоснабжение", "Газ", "Интернет"],
    status: "Доступен",
    type: "Офисное",
    year: 2021,
  },
  {
    id: 4,
    name: "Промышленная площадка",
    district: "Кировский",
    area: "12,000 м²",
    price: "60,000,000 ₽",
    communications: ["Электричество", "Водоснабжение", "Газ"],
    status: "Резерв",
    type: "Производственное",
    year: 2018,
  },
  {
    id: 5,
    name: "Торговый центр «Волга»",
    district: "Ворошиловский",
    area: "3,800 м²",
    price: "55,000,000 ₽",
    communications: ["Электричество", "Водоснабжение", "Газ"],
    status: "Доступен",
    type: "Торговое",
    year: 2022,
  },
]

export default function RealtyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Доступен":
        return "bg-green-100 text-green-800"
      case "В аренде":
        return "bg-yellow-100 text-yellow-800"
      case "Резерв":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCommunicationIcon = (comm: string) => {
    switch (comm) {
      case "Электричество":
        return <Zap className="w-4 h-4" />
      case "Водоснабжение":
        return <Droplets className="w-4 h-4" />
      case "Газ":
        return <Building className="w-4 h-4" />
      default:
        return <Building className="w-4 h-4" />
    }
  }

  const filteredObjects = realtyObjects.filter((obj) => {
    return (
      obj.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDistrict === "" || obj.district === selectedDistrict) &&
      (selectedType === "" || obj.type === selectedType) &&
      (selectedStatus === "" || obj.status === selectedStatus)
    )
  })

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Недвижимость и площадки</h1>
          <p className="text-lg text-gray-600">Каталог коммерческой недвижимости и инвестиционных площадок</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 p-6 border-b bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Поиск объектов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="Район" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все районы</SelectItem>
                <SelectItem value="Тракторозаводский">Тракторозаводский</SelectItem>
                <SelectItem value="Красноармейский">Красноармейский</SelectItem>
                <SelectItem value="Центральный">Центральный</SelectItem>
                <SelectItem value="Кировский">Кировский</SelectItem>
                <SelectItem value="Ворошиловский">Ворошиловский</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Тип объекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Производственное">Производственное</SelectItem>
                <SelectItem value="Складское">Складское</SelectItem>
                <SelectItem value="Офисное">Офисное</SelectItem>
                <SelectItem value="Торговое">Торговое</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Доступен">Доступен</SelectItem>
                <SelectItem value="В аренде">В аренде</SelectItem>
                <SelectItem value="Резерв">Резерв</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
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
                <span>Объекты недвижимости ({filteredObjects.length})</span>
                <Button size="sm">Экспорт в Excel</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Район</TableHead>
                    <TableHead>Площадь</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Коммуникации</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredObjects.map((obj) => (
                    <TableRow key={obj.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{obj.name}</div>
                          <div className="text-sm text-gray-500">
                            {obj.type} • {obj.year} г.
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {obj.district}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{obj.area}</TableCell>
                      <TableCell className="font-medium text-green-600">{obj.price}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {obj.communications.slice(0, 3).map((comm, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full"
                              title={comm}
                            >
                              {getCommunicationIcon(comm)}
                            </div>
                          ))}
                          {obj.communications.length > 3 && (
                            <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-xs">
                              +{obj.communications.length - 3}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(obj.status)}>{obj.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Подробнее
                          </Button>
                          <Button size="sm">Связаться</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
