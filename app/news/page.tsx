"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Eye, Share2, Building2, Phone, Send, MessageSquare, Globe, User, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const initialNewsData = [
  {
    id: 1,
    title: "Новые льготы для IT-компаний в Волгограде",
    category: "Бизнесу",
    date: "2024-12-20",
    excerpt:
      "Администрация города утвердила дополнительные меры поддержки для IT-предприятий, включая налоговые льготы и субсидии на аренду офисных помещений.",
    content: "Полный текст новости о льготах для IT-компаний...",
    image: "/placeholder.svg?height=200&width=400",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "Открытие нового индустриального парка",
    category: "Городские",
    date: "2024-12-19",
    excerpt:
      "В Красноармейском районе начал работу современный индустриальный комплекс площадью 50 гектаров с полной инфраструктурой.",
    content: "Полный текст новости об индустриальном парке...",
    image: "/placeholder.svg?height=200&width=400",
    views: 890,
    featured: true,
  },
  {
    id: 3,
    title: "Федеральная программа поддержки МСП расширена",
    category: "Федеральные",
    date: "2024-12-18",
    excerpt:
      "Правительство РФ расширило программу льготного кредитования малого и среднего бизнеса, увеличив лимиты и снизив процентные ставки.",
    content: "Полный текст новости о федеральной программе...",
    image: "/placeholder.svg?height=200&width=400",
    views: 2100,
    featured: false,
  },
  {
    id: 4,
    title: "Волгоградская область в топ-10 регионов по инвестициям",
    category: "Региональные",
    date: "2024-12-17",
    excerpt:
      "Регион вошел в десятку лучших по инвестиционной привлекательности согласно рейтингу Агентства стратегических инициатив.",
    content: "Полный текст новости о рейтинге региона...",
    image: "/placeholder.svg?height=200&width=400",
    views: 1650,
    featured: true,
  },
  {
    id: 5,
    title: "Цифровизация госуслуг для бизнеса",
    category: "Бизнесу",
    date: "2024-12-16",
    excerpt:
      "Запущена новая цифровая платформа для получения разрешений и лицензий в электронном виде, что сократит время оформления в 3 раза.",
    content: "Полный текст новости о цифровизации...",
    image: "/placeholder.svg?height=200&width=400",
    views: 980,
    featured: false,
  },
  {
    id: 6,
    title: "Новый завод по производству автокомпонентов",
    category: "Городские",
    date: "2024-12-15",
    excerpt:
      "Международная компания объявила о строительстве завода автокомпонентов в Волгограде с инвестициями 2 млрд рублей.",
    content: "Полный текст новости о новом заводе...",
    image: "/placeholder.svg?height=200&width=400",
    views: 1420,
    featured: false,
  },
  {
    id: 7,
    title: "Региональные меры поддержки экспорта",
    category: "Региональные",
    date: "2024-12-14",
    excerpt:
      "Волгоградская область запустила новую программу поддержки экспортеров с субсидированием логистических расходов.",
    content: "Полный текст новости о поддержке экспорта...",
    image: "/placeholder.svg?height=200&width=400",
    views: 750,
    featured: false,
  },
  {
    id: 8,
    title: "Федеральные инвестиции в инфраструктуру",
    category: "Федеральные",
    date: "2024-12-13",
    excerpt: "Правительство РФ выделило 5 млрд рублей на развитие транспортной инфраструктуры Волгоградской области.",
    content: "Полный текст новости о федеральных инвестициях...",
    image: "/placeholder.svg?height=200&width=400",
    views: 1890,
    featured: false,
  },
]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [newsData, setNewsData] = useState(initialNewsData)

  useEffect(() => {
    const saved = localStorage.getItem("volgograd-news")
    if (saved) {
      const loadedNews = JSON.parse(saved)
      setNewsData(loadedNews)
    }
  }, [])

  const categories = ["Федеральные", "Региональные", "Городские", "Бизнесу"]

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Федеральные: "bg-red-100 text-red-800",
      Региональные: "bg-blue-100 text-blue-800",
      Городские: "bg-green-100 text-green-800",
      Бизнесу: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeTab === "all" || news.category === activeTab
    return matchesSearch && matchesCategory
  })

  const featuredNews = newsData.filter((news) => news.featured)

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-sm border-b h-16">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Администрация г. Волгоград</h1>
                </div>
              </Link>
            </div>

            {/* Breadcrumbs */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Главная
              </Link>
              <span>/</span>
              <span className="text-blue-600 font-medium">Новости</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+7 (8442) 30‑13‑52</span>
              </div>
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Подать обращение
              </Button>
              <Button size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                Кабинет инвестора
              </Button>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Новости</h1>
          <p className="text-lg text-gray-600 mb-6">Актуальная информация для инвесторов и предпринимателей</p>

          {/* Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Поиск новостей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Главные новости</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {featuredNews.slice(0, 3).map((news) => (
                  <Card
                    key={news.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        width={400}
                        height={150}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={getCategoryColor(news.category)} variant="outline">
                          {news.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{news.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{news.views}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-sm line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{news.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <Button size="sm" variant="outline">
                          Читать далее
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* News Categories */}
          <section>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">Все новости</TabsTrigger>
                <TabsTrigger value="Федеральные">Федеральные</TabsTrigger>
                <TabsTrigger value="Региональные">Региональные</TabsTrigger>
                <TabsTrigger value="Городские">Городские</TabsTrigger>
                <TabsTrigger value="Бизнесу">Бизнесу</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredNews.map((news) => (
                    <Card
                      key={news.id}
                      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={news.image || "/placeholder.svg"}
                          alt={news.title}
                          width={300}
                          height={120}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={getCategoryColor(news.category)} variant="outline">
                            {news.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{news.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{news.views}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 text-sm line-clamp-2">
                          {news.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{news.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <Button size="sm" variant="outline">
                            Подробнее
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredNews.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Новости не найдены</h3>
                    <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
                  </div>
                )}

                {/* Load More */}
                {filteredNews.length > 0 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" size="lg">
                      Показать еще новости
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-gray-900 text-white py-3 h-14">
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col lg:flex-row justify-between items-center h-full">
            <div className="mb-2 lg:mb-0">
              <p className="text-xs text-gray-300">© 2024 Инвестиционный портал г. Волгоград</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-xs hidden lg:block">Мы в социальных сетях:</span>
              <div className="flex space-x-3">
                <Link
                  href="#"
                  className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-3 h-3" />
                </Link>
                <Link
                  href="#"
                  className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                </Link>
                <Link
                  href="#"
                  className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Globe className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
