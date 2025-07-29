"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Factory,
  Truck,
  Plane,
  Users,
  Building,
  Zap,
  Wifi,
  Calendar,
  Camera,
  Mountain,
  Church,
  Ship,
  TreePine,
  Target,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Globe,
} from "lucide-react"
import Image from "next/image"

type TabType = "advantages" | "history" | "tourism" | "development"

interface TabContent {
  id: TabType
  title: string
  icon: React.ComponentType<{ className?: string }>
}

interface Advantage {
  id: string
  number: string
  title: string
  description: string
  icon: string
  order: number
}

const iconMap = {
  MapPin,
  Factory,
  Truck,
  Plane,
  Users,
  Building,
  Zap,
  Wifi,
  Target,
  Star,
  Award,
  Globe,
}

export default function AboutCitySection() {
  const [activeTab, setActiveTab] = useState<TabType>("advantages")
  const [advantages, setAdvantages] = useState<Advantage[]>([])

  const tabs: TabContent[] = [
    { id: "advantages", title: "Преимущества", icon: Target },
    { id: "history", title: "История города", icon: Calendar },
    { id: "tourism", title: "Туристический паспорт", icon: Camera },
    { id: "development", title: "Программа развития", icon: TrendingUp },
  ]

  // Загрузка преимуществ из localStorage
  useEffect(() => {
    const savedAdvantages = localStorage.getItem("volgograd-advantages")
    if (savedAdvantages) {
      setAdvantages(JSON.parse(savedAdvantages))
    }
  }, [])

  // Обновление при изменении localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedAdvantages = localStorage.getItem("volgograd-advantages")
      if (savedAdvantages) {
        setAdvantages(JSON.parse(savedAdvantages))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const touristAttractions = [
    { title: "Мамаев курган", description: "Главный монумент-ансамбль «Героям Сталинградской битвы»", icon: Mountain },
    { title: "Музей-панорама", description: "Музей-заповедник «Сталинградская битва»", icon: Camera },
    { title: "Казанский собор", description: "Главный православный храм Волгограда", icon: Church },
    { title: "Речной вокзал", description: "Один из крупнейших речных вокзалов в Европе", icon: Ship },
    { title: "Центральная набережная", description: "Благоустроенная набережная реки Волги", icon: TreePine },
    { title: "Планетарий", description: "Один из крупнейших планетариев России", icon: Target },
  ]

  const developmentGoals = [
    {
      year: "2025",
      title: "Цифровизация",
      description: "Внедрение цифровых технологий в городское управление",
      progress: 75,
    },
    { year: "2026", title: "Транспорт", description: "Модернизация общественного транспорта", progress: 45 },
    { year: "2027", title: "Экология", description: "Программа экологического оздоровления", progress: 30 },
    { year: "2028", title: "Туризм", description: "Развитие туристической инфраструктуры", progress: 25 },
    { year: "2030", title: "Экономика", description: "Увеличение ВРП на 40%", progress: 20 },
    { year: "2034", title: "Инновации", description: "Создание технопарка мирового уровня", progress: 10 },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "advantages":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 space-y-4 overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Конкурентные преимущества Волгограда</h3>
              <div className="space-y-4 pr-4">
                {advantages.map((advantage, index) => {
                  const IconComponent = iconMap[advantage.icon as keyof typeof iconMap] || Target
                  return (
                    <Card
                      key={advantage.id}
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {advantage.number}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <IconComponent className="w-5 h-5 text-blue-400" />
                              <h4 className="font-semibold text-white text-sm">{advantage.title}</h4>
                            </div>
                            <p className="text-gray-300 text-xs leading-relaxed">{advantage.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
                {advantages.length === 0 && (
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-300">Преимущества не добавлены</p>
                      <p className="text-gray-400 text-sm mt-2">
                        Используйте панель администратора для добавления преимуществ
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <h4 className="text-white font-semibold mb-4">Расположение</h4>
                  <div className="relative w-full h-48 bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg"></div>
                    <div className="relative z-10 text-center">
                      <MapPin className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Волгоград</p>
                      <p className="text-gray-300 text-sm">Южный федеральный округ</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-300 text-sm">Население: 1+ млн человек</p>
                    <p className="text-gray-300 text-sm">Площадь: 859 км²</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "history":
        return (
          <div className="h-full overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">История города-героя</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                      1589 год - Основание
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Город основан как крепость Царицын для защиты южных рубежей Русского государства. Название
                      происходит от тюркского «сары-су» — жёлтая вода.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-red-400" />
                      1942-1943 - Сталинградская битва
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Переломный момент Великой Отечественной войны. 200 дней и ночей героической обороны. Город получил
                      звание «Город-герой».
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-green-400" />
                      1961 год - Волгоград
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Город переименован в Волгоград. Начался период активного восстановления и промышленного развития.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-white text-sm font-medium">Мамаев курган</p>
                    <p className="text-gray-400 text-xs">Главный монумент города</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-white text-sm font-medium">Центральная набережная</p>
                    <p className="text-gray-400 text-xs">Восстановлена после войны</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case "tourism":
        return (
          <div className="h-full overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Туристические достопримечательности</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {touristAttractions.map((attraction, index) => {
                const IconComponent = attraction.icon
                return (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{attraction.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{attraction.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 bg-transparent border-white/30 text-white hover:bg-white/10"
                      >
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Туристическая статистика
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">2.5M</p>
                      <p className="text-gray-400 text-sm">Туристов в год</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">150+</p>
                      <p className="text-gray-400 text-sm">Отелей</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">50+</p>
                      <p className="text-gray-400 text-sm">Музеев</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">200+</p>
                      <p className="text-gray-400 text-sm">Ресторанов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "development":
        return (
          <div className="h-full overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Программа развития до 2034 года</h3>
            <div className="space-y-4">
              {developmentGoals.map((goal, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{goal.year}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{goal.title}</h4>
                          <p className="text-gray-300 text-sm">{goal.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{goal.progress}%</p>
                        <p className="text-gray-400 text-xs">готовность</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
                    Ключевые показатели к 2034 году
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">+40%</p>
                      <p className="text-gray-400 text-sm">Рост ВРП</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">50K</p>
                      <p className="text-gray-400 text-sm">Новых рабочих мест</p>
                    </div>
                    <div className="text-center">
                      <GraduationCap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">5</p>
                      <p className="text-gray-400 text-sm">Новых вузов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="h-screen overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Волгоград вечером"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-full md:w-80 lg:w-96 bg-black/30 backdrop-blur-sm border-r border-white/20 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-8">О городе</h2>

          <nav className="space-y-3 flex-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              const isActive = activeTab === tab.id

              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`w-full justify-start h-auto p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 text-white border-l-4 border-blue-400"
                      : "text-gray-300 hover:text-white hover:bg-white/10 border border-white/20"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className={`w-5 h-5 mr-3 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                  <span className="font-medium">{tab.title}</span>
                </Button>
              )
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-gray-400 text-sm">
              Узнайте больше о Волгограде — городе с богатой историей и большими перспективами
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-6 lg:p-8 overflow-hidden">
          <div key={activeTab} className="h-full animate-in fade-in-0 slide-in-from-right-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  )
}
