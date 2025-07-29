"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, MapPin } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function InvestmentOffersPage() {
  const [investmentOffers, setInvestmentOffers] = useState([
    {
      id: 1,
      title: "Промышленная площадка «Волгоград-Север»",
      district: "Тракторозаводский район",
      area: "50 га",
      price: "от 500 руб/м²",
      status: "Доступна",
      image: "/placeholder.svg?height=200&width=300",
      description: "Готовая промышленная площадка с развитой инфраструктурой",
      communications: ["Электричество", "Газ", "Водоснабжение"],
    },
    {
      id: 2,
      title: "Инвестиционная площадка «Южная»",
      district: "Кировский район",
      area: "25 га",
      price: "от 300 руб/м²",
      status: "В разработке",
      image: "/placeholder.svg?height=200&width=300",
      description: "Перспективная площадка для логистических комплексов",
      communications: ["Электричество", "Водоснабжение"],
    },
    {
      id: 3,
      title: "Технопарк «Волгоград-IT»",
      district: "Центральный район",
      area: "15 га",
      price: "от 800 руб/м²",
      status: "Доступна",
      image: "/placeholder.svg?height=200&width=300",
      description: "Современный технопарк для IT-компаний",
      communications: ["Электричество", "Газ", "Водоснабжение", "Интернет"],
    },
    {
      id: 4,
      title: "Агропромышленная зона «Восток»",
      district: "Красноармейский район",
      area: "100 га",
      price: "от 200 руб/м²",
      status: "Доступна",
      image: "/placeholder.svg?height=200&width=300",
      description: "Площадка для агропромышленных предприятий",
      communications: ["Электричество", "Водоснабжение"],
    },
    {
      id: 5,
      title: "Логистический центр «Волга-Хаб»",
      district: "Красноармейский район",
      area: "75 га",
      price: "от 400 руб/м²",
      status: "Планируется",
      image: "/placeholder.svg?height=200&width=300",
      description: "Мультимодальный логистический центр",
      communications: ["Электричество", "Газ"],
    },
    {
      id: 6,
      title: "Производственная площадка «Запад»",
      district: "Дзержинский район",
      area: "35 га",
      price: "от 350 руб/м²",
      status: "Доступна",
      image: "/placeholder.svg?height=200&width=300",
      description: "Площадка для легкой промышленности",
      communications: ["Электричество", "Водоснабжение", "Газ"],
    },
  ])

  useEffect(() => {
    const saved = localStorage.getItem("volgograd-offers")
    if (saved) {
      const loadedOffers = JSON.parse(saved)
      setInvestmentOffers(loadedOffers)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Доступна":
        return "bg-green-100 text-green-800"
      case "В разработке":
        return "bg-yellow-100 text-yellow-800"
      case "Планируется":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Инвестиционные предложения</h1>
          <p className="text-lg text-gray-600">Готовые площадки и объекты для инвестиций в Волгограде</p>

          {/* Search */}
          <div className="mt-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Поиск по названию или району..." className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentOffers.map((offer) => (
              <Card
                key={offer.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={getStatusColor(offer.status)}>{offer.status}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {offer.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {offer.district}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{offer.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Площадь:</span>
                      <p className="font-semibold">{offer.area}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Цена:</span>
                      <p className="font-semibold text-green-600">{offer.price}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Коммуникации:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {offer.communications.map((comm, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {comm}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать паспорт
                    </Button>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Показать еще предложения
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
