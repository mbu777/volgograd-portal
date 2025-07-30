"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Phone,
  Globe,
  Menu,
  MapPin,
  Building2,
  Users,
  Info,
  Send,
  MessageSquare,
  User,
  Settings,
  FileText,
  Briefcase,
  TrendingUp,
  HeadphonesIcon,
  FolderOpen,
  Calendar,
  Target,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Add the AboutCitySection component import at the top
import AboutCitySection from "./components/about-city-section"
import AdminPanel from "./components/admin-panel"

const newsData = [
  {
    id: 1,
    title: "Новые льготы для IT-компаний в Волгограде",
    category: "Бизнесу",
    date: "2024-12-20",
    excerpt: "Администрация города утвердила дополнительные меры поддержки для IT-предприятий",
    content:
      "Администрация города Волгограда утвердила дополнительные меры поддержки для IT-предприятий, включая налоговые льготы и субсидии на аренду офисных помещений. Новые меры направлены на привлечение высокотехнологичных компаний и развитие цифровой экономики региона. В рамках программы предусмотрены льготы по налогу на прибыль до 50% на первые три года работы, а также субсидирование аренды офисных помещений до 30% от стоимости.",
    image: "/placeholder.svg?height=300&width=500",
    views: 1250,
  },
  {
    id: 2,
    title: "Открытие нового индустриального парка",
    category: "Городские",
    date: "2024-12-19",
    excerpt: "В Красноармейском районе начал работу современный индустриальный комплекс",
    content:
      "В Красноармейском районе начал работу современный индустриальный комплекс площадью 50 гектаров с полной инфраструктурой. Парк оснащен всеми необходимыми коммуникациями, включая электроснабжение, газоснабжение, водоснабжение и высокоскоростной интернет. Первыми резидентами стали три крупных производственных предприятия, которые создадут более 500 рабочих мест.",
    image: "/placeholder.svg?height=300&width=500",
    views: 890,
  },
  {
    id: 3,
    title: "Федеральная программа поддержки МСП расширена",
    category: "Федеральные",
    date: "2024-12-18",
    excerpt: "Правительство РФ расширило программу льготного кредитования малого бизнеса",
    content:
      "Правительство РФ расширило программу льготного кредитования малого и среднего бизнеса, увеличив лимиты и снизив процентные ставки. Теперь предприниматели могут получить кредиты на сумму до 500 млн рублей под 3% годовых. Программа действует до конца 2025 года и направлена на поддержку отечественного производства и импортозамещения.",
    image: "/placeholder.svg?height=300&width=500",
    views: 2100,
  },
  {
    id: 4,
    title: "Волгоградская область в топ-10 регионов",
    category: "Региональные",
    date: "2024-12-17",
    excerpt: "Регион вошел в десятку лучших по инвестиционной привлекательности",
    content:
      "Волгоградская область вошла в десятку лучших регионов по инвестиционной привлекательности согласно рейтингу Агентства стратегических инициатив. Регион поднялся на 5 позиций благодаря улучшению инвестиционного климата, развитию инфраструктуры и активной работе с инвесторами. Особо отмечены успехи в сфере промышленности и логистики.",
    image: "/placeholder.svg?height=300&width=500",
    views: 1650,
  },
  {
    id: 5,
    title: "Цифровизация госуслуг для бизнеса",
    category: "Бизнесу",
    date: "2024-12-16",
    excerpt: "Запущена новая цифровая платформа для получения разрешений",
    content:
      "Запущена новая цифровая платформа для получения разрешений и лицензий в электронном виде, что сократит время оформления в 3 раза. Платформа интегрирована с федеральными системами и позволяет отслеживать статус заявок в режиме реального времени.",
    image: "/placeholder.svg?height=300&width=500",
    views: 980,
  },
]

const keyIndicators = [
  {
    title: "ВРП на душу населения",
    value: "450 тыс. ₽",
    change: "+8.5%",
    positive: true,
  },
  {
    title: "Рост промышленности",
    value: "+12.3%",
    change: "за год",
    positive: true,
  },
  {
    title: "Количество МСП",
    value: "45 тыс.",
    change: "+2.1%",
    positive: true,
  },
  {
    title: "Инвестиции в основной капитал",
    value: "85 млрд ₽",
    change: "+15.2%",
    positive: true,
  },
  {
    title: "Уровень безработицы",
    value: "3.8%",
    change: "-0.5%",
    positive: true,
  },
]

export default function VolgogradInvestmentPortal() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState<"home" | "about" | "admin">("home")
  const [showAdminAccess, setShowAdminAccess] = useState(false)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [currentIndicatorIndex, setCurrentIndicatorIndex] = useState(0)
  const [selectedNews, setSelectedNews] = useState<(typeof newsData)[0] | null>(null)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)
  const [newsDataState, setNewsData] = useState([...newsData])

  useEffect(() => {
    loadNews()
    loadIndicators()
  }, [])

  const loadNews = () => {
    const saved = localStorage.getItem("volgograd-news")
    if (saved) {
      try {
        const loadedNews = JSON.parse(saved)
        // Create a new array instead of modifying the original
        setNewsData([...loadedNews])
      } catch (error) {
        console.error("Error parsing news data:", error)
      }
    }
  }

  const loadIndicators = () => {
    const saved = localStorage.getItem("volgograd-indicators")
    if (saved) {
      try {
        const loadedIndicators = JSON.parse(saved)
        // Create a new array instead of modifying the original
        setNewsData((prevState) => {
          const newState = [...prevState]
          keyIndicators.splice(0, keyIndicators.length, ...loadedIndicators)
          return newState
        })
      } catch (error) {
        console.error("Error parsing indicators data:", error)
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Auto-switch news every 5 seconds
  useEffect(() => {
    if (currentSection === "home") {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsDataState.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [currentSection, newsDataState.length])

  // Auto-switch indicators every 3 seconds
  useEffect(() => {
    if (currentSection === "home") {
      const interval = setInterval(() => {
        setCurrentIndicatorIndex((prev) => (prev + 1) % keyIndicators.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentSection])

  // Admin access - показать кнопку админки при нажатии Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        setShowAdminAccess(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const investmentCards = [
    {
      title: "Инвест-предложения",
      description: "Площадки и объекты для инвестиций",
      icon: MapPin,
      href: "/investor/offers",
    },
    {
      title: "Проекты",
      description: "Реализуемые инвестпроекты",
      icon: Building2,
      href: "/investor/projects",
    },
    {
      title: "Поддержка",
      description: "Меры поддержки инвесторов",
      icon: Users,
      href: "/investor/support",
    },
    {
      title: "О городе",
      description: "Преимущества Волгограда",
      icon: Info,
      href: "/about",
      onClick: () => setCurrentSection("about"),
    },
  ]

  const handleNewsClick = (news: (typeof newsData)[0]) => {
    setSelectedNews(news)
    setIsNewsModalOpen(true)
  }

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsDataState.length)
  }

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + newsDataState.length) % newsDataState.length)
  }

  const nextIndicator = () => {
    setCurrentIndicatorIndex((prev) => (prev + 1) % keyIndicators.length)
  }

  const prevIndicator = () => {
    setCurrentIndicatorIndex((prev) => (prev - 1 + keyIndicators.length) % keyIndicators.length)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Федеральные: "bg-red-100 text-red-800",
      Региональные: "bg-blue-100 text-blue-800",
      Городские: "bg-green-100 text-green-800",
      Бизнесу: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const currentNews = newsDataState[currentNewsIndex]
  const otherNews = newsDataState.filter((_, index) => index !== currentNewsIndex).slice(0, 3)

  return (
    <div
      className={`h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header - Fixed Height - Always Visible */}
      <header
        className={`flex-shrink-0 bg-white shadow-sm border-b z-50 h-14 transform transition-all duration-800 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-sm font-bold text-gray-900">Администрация г. Волгоград</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setCurrentSection("home")}
                className={`text-sm font-medium transition-colors ${
                  currentSection === "home" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Главная
              </button>

              {/* Investor Dropdown */}
              <div className="relative group">
                <Link
                  href="/investor/offers"
                  className="text-sm text-gray-700 hover:text-blue-600 font-medium flex items-center"
                >
                  Инвестору
                  <svg
                    className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      href="/investor/offers"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2 text-gray-400" />
                      Инвест-предложения
                    </Link>
                    <Link
                      href="/investor/realty"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      Недвижимость
                    </Link>
                    <Link
                      href="/investor/ppp"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                      Программы / МЧП
                    </Link>
                    <Link
                      href="/investor/projects"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 mr-2 text-gray-400" />
                      Проекты
                    </Link>
                    <Link
                      href="/investor/support"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <HeadphonesIcon className="w-4 h-4 mr-2 text-gray-400" />
                      Поддержка
                    </Link>
                    <Link
                      href="/investor/docs"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <FolderOpen className="w-4 h-4 mr-2 text-gray-400" />
                      Документы
                    </Link>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentSection("about")}
                className={`text-sm font-medium transition-colors ${
                  currentSection === "about" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                О городе
              </button>
              <Link href="/news" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
                Новости
              </Link>
              <Link href="/contacts" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
                Контакты
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Language Switcher */}
              <div className="hidden md:flex items-center space-x-1 text-xs">
                <button className="px-1 py-1 text-blue-600 font-medium">RU</button>
                <span className="text-gray-300">|</span>
                <button className="px-1 py-1 text-gray-500 hover:text-blue-600">EN</button>
              </div>

              {/* Phone */}
              <div className="hidden lg:flex items-center space-x-1 text-xs text-gray-600">
                <Phone className="w-3 h-3" />
                <span>+7 (8442) 30‑13‑52</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1">
                {/* Admin Access Button */}
                {showAdminAccess && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSection("admin")}
                    className={`hidden md:flex text-xs h-7 px-2 ${
                      currentSection === "admin" ? "bg-red-100 text-red-600" : "text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Админ
                  </Button>
                )}

                <Button variant="outline" size="sm" className="hidden md:flex text-xs h-7 px-2 bg-transparent">
                  <Send className="w-3 h-3 mr-1" />
                  Обращение
                </Button>
                <Button size="sm" className="hidden md:flex text-xs h-7 px-2">
                  <User className="w-3 h-3 mr-1" />
                  Кабинет
                </Button>

                {/* Mobile Menu Button */}
                <Button variant="ghost" size="sm" className="lg:hidden h-7 w-7 p-0">
                  <Menu className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Conditional Rendering */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {currentSection === "home" ? (
          <div className="h-full flex flex-col">
            {/* Hero Section - Very Compact */}
            <section className="flex-shrink-0 py-4">
              <div className="container mx-auto px-4">
                <div
                  className={`text-center text-white max-w-3xl mx-auto transform transition-all duration-1000 delay-300 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                    Инвестиционный портал
                    <br />
                    <span className="text-blue-300">Волгограда</span>
                  </h1>
                  <p className="text-sm text-blue-100 mb-4 max-w-xl mx-auto">
                    Перспективы развития бизнеса в промышленном центре России
                  </p>

                  {/* Search Bar - Compact */}
                  <div className="max-w-lg mx-auto">
                    <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      <Input
                        type="text"
                        placeholder="Поиск возможностей..."
                        className="bg-white/90 border-0 text-gray-900 placeholder:text-gray-500 h-8 text-sm"
                      />
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 px-4">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Content Grid - No Scroll */}
            <div className="flex-1 min-h-0">
              <div className="container mx-auto px-4 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                  {/* Main Content - Expanded */}
                  <div className="lg:col-span-2 space-y-3">
                    {/* Investment Cards - 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {investmentCards.map((card, index) => {
                        const IconComponent = card.icon
                        return (
                          <Card
                            key={index}
                            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white/95 backdrop-blur-sm"
                            onClick={card.onClick || (() => {})}
                          >
                            <CardHeader className="pb-1">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-1 group-hover:bg-blue-200 transition-colors">
                                <IconComponent className="w-4 h-4 text-blue-600" />
                              </div>
                              <CardTitle className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {card.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <CardDescription className="text-xs text-gray-600 leading-relaxed">
                                {card.description}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    {/* News Section - Like in the image */}
                    <Card className="bg-white/95 backdrop-blur-sm flex-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold text-gray-900 bg-blue-600 text-white px-3 py-1 rounded">
                            НОВОСТИ
                          </CardTitle>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" onClick={prevNews} className="h-6 w-6 p-0">
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={nextNews} className="h-6 w-6 p-0">
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                            <Link href="/news">
                              <Button variant="outline" size="sm" className="text-xs h-6 px-2 bg-transparent">
                                ВСЕ НОВОСТИ
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                          {/* Main News with Image */}
                          <div className="relative group cursor-pointer" onClick={() => handleNewsClick(currentNews)}>
                            <div className="relative overflow-hidden rounded-lg h-48">
                              <Image
                                src={currentNews.image || "/placeholder.svg"}
                                alt={currentNews.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-3 left-3">
                                <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                  {currentNews.date}
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h3 className="text-white font-semibold text-sm leading-tight">{currentNews.title}</h3>
                              </div>
                            </div>
                          </div>

                          {/* Other News List */}
                          <div className="space-y-2">
                            {otherNews.map((news) => (
                              <div
                                key={news.id}
                                className="p-2 rounded hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={() => handleNewsClick(news)}
                              >
                                <div className="flex items-start justify-between mb-1">
                                  <div className="text-xs text-gray-500">{news.date}</div>
                                  <Badge className={getCategoryColor(news.category)} variant="outline">
                                    {news.category}
                                  </Badge>
                                </div>
                                <h4 className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors leading-tight">
                                  {news.title}
                                </h4>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Sidebar - Compact */}
                  <div className="lg:col-span-1 space-y-3">
                    {/* Investment Profile */}
                    <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-sm">Инвест-профиль</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-center">
                          <div className="text-lg font-bold">1M+</div>
                          <div className="text-xs text-blue-200">Население</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">50+</div>
                          <div className="text-xs text-blue-200">Проектов</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">85 млрд ₽</div>
                          <div className="text-xs text-blue-200">Инвестиции</div>
                        </div>
                        <Button className="w-full bg-white text-blue-600 hover:bg-blue-50" size="sm">
                          Скачать
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Key Indicators Carousel */}
                    <Card className="bg-white/95 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-gray-900 text-sm">Ключевые показатели</CardTitle>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" onClick={prevIndicator} className="h-5 w-5 p-0">
                              <ChevronLeft className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={nextIndicator} className="h-5 w-5 p-0">
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          {keyIndicators.map((indicator, index) => (
                            <div
                              key={index}
                              className={`transition-all duration-500 ${
                                index === currentIndicatorIndex ? "opacity-100" : "opacity-0 absolute inset-0"
                              }`}
                            >
                              <div className="text-center p-3">
                                <div className="text-lg font-bold text-gray-900">{indicator.value}</div>
                                <div className="text-xs text-gray-600 mb-1">{indicator.title}</div>
                                <div
                                  className={`text-xs font-medium ${
                                    indicator.positive ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {indicator.change}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-center space-x-1 mt-2">
                          {keyIndicators.map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                i === currentIndicatorIndex ? "bg-blue-600" : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-white/95 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-gray-900 text-sm">Быстрые действия</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Подать заявку
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          Записаться на встречу
                        </Button>
                        <Button className="w-full bg-transparent" variant="outline" size="sm">
                          <Target className="w-3 h-3 mr-1" />
                          Консультация
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentSection === "about" ? (
          <div className="h-full animate-in fade-in-0 slide-in-from-right-4 duration-500">
            <AboutCitySection />
          </div>
        ) : (
          <div className="h-full animate-in fade-in-0 slide-in-from-right-4 duration-500">
            <AdminPanel />
          </div>
        )}
      </main>

      {/* Footer - Compact */}
      <footer
        className={`flex-shrink-0 bg-gray-900 text-white py-2 z-50 h-10 transform transition-all duration-800 delay-1000 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col lg:flex-row justify-between items-center h-full">
            <div>
              <p className="text-xs text-gray-300">© 2024 Инвестиционный портал г. Волгоград</p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-xs hidden lg:block">Соцсети:</span>
              <div className="flex space-x-2">
                <Link
                  href="#"
                  className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-2 h-2" />
                </Link>
                <Link
                  href="#"
                  className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <MessageSquare className="w-2 h-2" />
                </Link>
                <Link
                  href="#"
                  className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Globe className="w-2 h-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* News Modal */}
      <Dialog open={isNewsModalOpen} onOpenChange={setIsNewsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getCategoryColor(selectedNews?.category || "")} variant="outline">
                    {selectedNews?.category}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedNews?.date}</span>
                    <Eye className="w-4 h-4" />
                    <span>{selectedNews?.views}</span>
                  </div>
                </div>
                <DialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {selectedNews?.title}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>
          <div className="mt-4">
            {selectedNews?.image && (
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={selectedNews.image || "/placeholder.svg"}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedNews?.content}</p>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Сохранить
              </Button>
            </div>
            <Button onClick={() => setIsNewsModalOpen(false)}>Закрыть</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
