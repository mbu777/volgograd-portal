"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, DollarSign, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"

const initialInvestmentProjects = [
  {
    id: 1,
    title: "Волгоград-Сити",
    description: "Многофункциональный деловой центр в центре города",
    status: "В работе",
    investment: "5.2 млрд ₽",
    location: "Центральный район",
    completion: "2026",
    progress: 65,
    investor: "ГК «Развитие»",
    jobs: 2500,
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    timeline: [
      { phase: "Проектирование", status: "completed", date: "2022" },
      { phase: "Получение разрешений", status: "completed", date: "2023" },
      { phase: "Строительство", status: "in-progress", date: "2024-2025" },
      { phase: "Ввод в эксплуатацию", status: "planned", date: "2026" },
    ],
  },
  {
    id: 2,
    title: "Логистический центр «Волга-Хаб»",
    description: "Современный мультимодальный логистический комплекс",
    status: "Завершён",
    investment: "3.8 млрд ₽",
    location: "Красноармейский район",
    completion: "2023",
    progress: 100,
    investor: "Логистик Групп",
    jobs: 1200,
    images: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
    timeline: [
      { phase: "Проектирование", status: "completed", date: "2020" },
      { phase: "Получение разрешений", status: "completed", date: "2021" },
      { phase: "Строительство", status: "completed", date: "2022-2023" },
      { phase: "Ввод в эксплуатацию", status: "completed", date: "2023" },
    ],
  },
  {
    id: 3,
    title: "Технопарк «Инновации»",
    description: "Центр высоких технологий и стартап-инкубатор",
    status: "Планируется",
    investment: "2.1 млрд ₽",
    location: "Дзержинский район",
    completion: "2027",
    progress: 15,
    investor: "Поиск инвестора",
    jobs: 800,
    images: ["/placeholder.svg?height=200&width=300"],
    timeline: [
      { phase: "Проектирование", status: "in-progress", date: "2024" },
      { phase: "Получение разрешений", status: "planned", date: "2025" },
      { phase: "Строительство", status: "planned", date: "2025-2026" },
      { phase: "Ввод в эксплуатацию", status: "planned", date: "2027" },
    ],
  },
]

export default function ProjectsPage() {
  useEffect(() => {
    const saved = localStorage.getItem("volgograd-projects")
    if (saved) {
      const loadedProjects = JSON.parse(saved)
      setInvestmentProjects(loadedProjects)
    }
  }, [])

  const [investmentProjects, setInvestmentProjects] = useState(initialInvestmentProjects)
  const [selectedProject, setSelectedProject] = useState(investmentProjects[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Завершён":
        return "bg-green-100 text-green-800"
      case "В работе":
        return "bg-yellow-100 text-yellow-800"
      case "Планируется":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "planned":
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Инвестиционные проекты</h1>
          <p className="text-lg text-gray-600">Реализуемые и планируемые инвестиционные проекты в Волгограде</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Projects List */}
          <div className="w-1/3 border-r overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Проекты</h2>
            <div className="space-y-4">
              {investmentProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedProject.id === project.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Инвестиции:</span>
                        <p>{project.investment}</p>
                      </div>
                      <div>
                        <span className="font-medium">Завершение:</span>
                        <p>{project.completion}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Прогресс</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.title}</h1>
                  <p className="text-lg text-gray-600">{selectedProject.description}</p>
                </div>
                <Badge className={getStatusColor(selectedProject.status)} size="lg">
                  {selectedProject.status}
                </Badge>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="timeline">Этапы</TabsTrigger>
                  <TabsTrigger value="gallery">Галерея</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Инвестиции</p>
                        <p className="text-lg font-bold">{selectedProject.investment}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Локация</p>
                        <p className="text-lg font-bold">{selectedProject.location}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Завершение</p>
                        <p className="text-lg font-bold">{selectedProject.completion}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Рабочие места</p>
                        <p className="text-lg font-bold">{selectedProject.jobs}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Информация о проекте</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Инвестор</h4>
                          <p className="text-gray-600">{selectedProject.investor}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Прогресс выполнения</h4>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${selectedProject.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{selectedProject.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Этапы реализации проекта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedProject.timeline.map((phase, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">{getTimelineIcon(phase.status)}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                                <span className="text-sm text-gray-500">{phase.date}</span>
                              </div>
                              <div className="mt-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    phase.status === "completed"
                                      ? "border-green-200 text-green-800"
                                      : phase.status === "in-progress"
                                        ? "border-yellow-200 text-yellow-800"
                                        : "border-gray-200 text-gray-600"
                                  }
                                >
                                  {phase.status === "completed"
                                    ? "Завершено"
                                    : phase.status === "in-progress"
                                      ? "В работе"
                                      : "Планируется"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Фотогалерея проекта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedProject.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${selectedProject.title} - фото ${index + 1}`}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex space-x-4">
                <Button size="lg">Связаться с инвестором</Button>
                <Button variant="outline" size="lg">
                  Скачать презентацию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
