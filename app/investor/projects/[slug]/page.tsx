"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Calendar, DollarSign, Building, FileText, ExternalLink, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ProjectDetail {
  id: string
  title: string
  slug: string
  summary: string
  body: string
  sector: string
  tags: string[]
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED"
  yearStart: number
  yearEnd?: number
  capex?: number
  currency?: string
  address: string
  lat?: number
  lng?: number
  coverImagePath?: string
  gallery: Array<{
    id: string
    filePath: string
    alt?: string
  }>
  docs: Array<{
    id: string
    title: string
    filePath?: string
    externalUrl?: string
  }>
  isPublished: boolean
}

const mockProject: ProjectDetail = {
  id: "1",
  title: "Волгоград-Сити",
  slug: "volgograd-city",
  summary:
    "Многофункциональный деловой центр в центре города с офисными помещениями, торговыми площадями и гостиничным комплексом",
  body: `
    <h2>Описание проекта</h2>
    <p>Волгоград-Сити — это амбициозный проект по созданию современного делового центра в самом сердце города. Комплекс будет включать в себя офисные здания класса А, торговые площади, гостиничный комплекс и подземную парковку.</p>
    
    <h3>Основные характеристики:</h3>
    <ul>
      <li>Общая площадь: 150 000 кв.м</li>
      <li>Офисные помещения: 80 000 кв.м</li>
      <li>Торговые площади: 30 000 кв.м</li>
      <li>Гостиница: 200 номеров</li>
      <li>Парковка: 1 500 машиномест</li>
    </ul>

    <h3>Этапы реализации:</h3>
    <ol>
      <li><strong>2022-2023:</strong> Проектирование и получение разрешений</li>
      <li><strong>2023-2025:</strong> Строительство первой очереди (офисный центр)</li>
      <li><strong>2025-2026:</strong> Строительство второй очереди (торговый центр и гостиница)</li>
    </ol>

    <h3>Социально-экономический эффект:</h3>
    <p>Реализация проекта позволит создать более 2 500 рабочих мест, привлечь в город крупные российские и международные компании, увеличить налоговые поступления в бюджет города.</p>
  `,
  sector: "Недвижимость",
  tags: ["офисы", "торговля", "гостиницы", "деловой центр"],
  status: "IN_PROGRESS",
  yearStart: 2022,
  yearEnd: 2026,
  capex: 5200000000,
  currency: "RUB",
  address: "Центральный район, ул. Мира, 10",
  lat: 48.708,
  lng: 44.5133,
  coverImagePath: "/placeholder.svg?height=400&width=800&text=Волгоград-Сити",
  gallery: [
    {
      id: "1",
      filePath: "/placeholder.svg?height=300&width=400&text=Общий вид",
      alt: "Общий вид комплекса",
    },
    {
      id: "2",
      filePath: "/placeholder.svg?height=300&width=400&text=Офисный центр",
      alt: "Офисный центр",
    },
    {
      id: "3",
      filePath: "/placeholder.svg?height=300&width=400&text=Торговый центр",
      alt: "Торговый центр",
    },
    {
      id: "4",
      filePath: "/placeholder.svg?height=300&width=400&text=Гостиница",
      alt: "Гостиничный комплекс",
    },
  ],
  docs: [
    {
      id: "1",
      title: "Презентация проекта",
      filePath: "/uploads/2024/01/volgograd-city-presentation.pdf",
    },
    {
      id: "2",
      title: "Технико-экономическое обоснование",
      filePath: "/uploads/2024/01/volgograd-city-teo.pdf",
    },
    {
      id: "3",
      title: "Архитектурный проект",
      externalUrl: "https://example.com/architecture",
    },
  ],
  isPublished: true,
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // В реальном приложении здесь будет загрузка данных по slug
    if (params.slug === "volgograd-city") {
      setProject(mockProject)
    }
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка проекта...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Проект не найден</h2>
          <p className="text-gray-600 mb-4">Запрашиваемый проект не существует или был удален</p>
          <Link href="/investor/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800"
      case "PLANNED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Завершён"
      case "IN_PROGRESS":
        return "В работе"
      case "PLANNED":
        return "Планируется"
      default:
        return status
    }
  }

  const formatCapex = (capex?: number, currency?: string) => {
    if (!capex) return "Не указано"

    if (capex >= 1000000000) {
      return `${(capex / 1000000000).toFixed(1)} млрд ${currency === "RUB" ? "₽" : currency}`
    } else if (capex >= 1000000) {
      return `${(capex / 1000000).toFixed(1)} млн ${currency === "RUB" ? "₽" : currency}`
    }
    return `${capex.toLocaleString()} ${currency === "RUB" ? "₽" : currency}`
  }

  const getMapUrl = () => {
    if (project.lat && project.lng) {
      return `https://yandex.ru/maps/?pt=${project.lng},${project.lat}&z=16&l=map`
    }
    return `https://yandex.ru/maps/?text=${encodeURIComponent(project.address + ", Волгоград")}`
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/investor/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />К списку проектов
              </Button>
            </Link>
            <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
          <p className="text-lg text-gray-600">{project.summary}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Hero Image */}
          {project.coverImagePath && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={project.coverImagePath || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="gallery">Галерея</TabsTrigger>
                  <TabsTrigger value="documents">Документы</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Описание проекта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.body }} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Местоположение</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <span>{project.address}</span>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => window.open(getMapUrl(), "_blank", "noopener,noreferrer")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Открыть на карте
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Фотогалерея</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {project.gallery.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Фотографии пока не добавлены</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.gallery.map((image) => (
                            <div key={image.id} className="relative group">
                              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                <Image
                                  src={image.filePath || "/placeholder.svg"}
                                  alt={image.alt || project.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              {image.alt && <p className="text-sm text-gray-600 mt-2">{image.alt}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Документы проекта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {project.docs.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Документы пока не добавлены</p>
                      ) : (
                        <div className="space-y-3">
                          {project.docs.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-gray-500" />
                                <span className="font-medium">{doc.title}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const url = doc.externalUrl || doc.filePath
                                  if (url) {
                                    window.open(url, "_blank", "noopener,noreferrer")
                                  }
                                }}
                              >
                                {doc.externalUrl ? (
                                  <>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Перейти
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4 mr-2" />
                                    Скачать
                                  </>
                                )}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Ключевые показатели</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Инвестиции</p>
                      <p className="font-semibold">{formatCapex(project.capex, project.currency)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Период реализации</p>
                      <p className="font-semibold">
                        {project.yearStart}
                        {project.yearEnd && project.yearEnd !== project.yearStart && ` - ${project.yearEnd}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Отрасль</p>
                      <p className="font-semibold">{project.sector}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Теги</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Связаться с инвестором
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      Скачать презентацию
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
