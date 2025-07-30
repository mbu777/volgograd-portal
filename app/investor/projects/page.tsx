"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, DollarSign, Eye, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  title: string
  slug: string
  summary: string
  sector: string
  tags: string[]
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED"
  yearStart: number
  yearEnd?: number
  capex?: number
  currency?: string
  address: string
  coverImagePath?: string
  isPublished: boolean
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Волгоград-Сити",
    slug: "volgograd-city",
    summary:
      "Многофункциональный деловой центр в центре города с офисными помещениями, торговыми площадями и гостиничным комплексом",
    sector: "Недвижимость",
    tags: ["офисы", "торговля", "гостиницы"],
    status: "IN_PROGRESS",
    yearStart: 2022,
    yearEnd: 2026,
    capex: 5200000000,
    currency: "RUB",
    address: "Центральный район, ул. Мира, 10",
    coverImagePath: "/placeholder.svg?height=200&width=300&text=Волгоград-Сити",
    isPublished: true,
  },
  {
    id: "2",
    title: "Логистический центр «Волга-Хаб»",
    slug: "volga-hub",
    summary: "Современный мультимодальный логистический комплекс с железнодорожной веткой и складскими помещениями",
    sector: "Логистика",
    tags: ["склады", "логистика", "транспорт"],
    status: "COMPLETED",
    yearStart: 2020,
    yearEnd: 2023,
    capex: 3800000000,
    currency: "RUB",
    address: "Красноармейский район, промзона",
    coverImagePath: "/placeholder.svg?height=200&width=300&text=Волга-Хаб",
    isPublished: true,
  },
  {
    id: "3",
    title: "Технопарк «Инновации»",
    slug: "innovations-techpark",
    summary: "Центр высоких технологий и стартап-инкубатор для развития IT и инновационных проектов",
    sector: "IT и инновации",
    tags: ["IT", "стартапы", "инновации", "технологии"],
    status: "PLANNED",
    yearStart: 2024,
    yearEnd: 2027,
    capex: 2100000000,
    currency: "RUB",
    address: "Дзержинский район, ул. Технологическая, 15",
    coverImagePath: "/placeholder.svg?height=200&width=300&text=Технопарк",
    isPublished: true,
  },
  {
    id: "4",
    title: "Агропромышленный комплекс «Волжский»",
    slug: "volzhsky-agro",
    summary: "Современный агропромышленный комплекс по переработке сельскохозяйственной продукции",
    sector: "Сельское хозяйство",
    tags: ["агро", "переработка", "производство"],
    status: "IN_PROGRESS",
    yearStart: 2023,
    yearEnd: 2025,
    capex: 1500000000,
    currency: "RUB",
    address: "Светлоярский район",
    coverImagePath: "/placeholder.svg?height=200&width=300&text=Агрокомплекс",
    isPublished: true,
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [sectorFilter, setSectorFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [yearFromFilter, setYearFromFilter] = useState<string>("")
  const [yearToFilter, setYearToFilter] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    let filtered = projects.filter((project) => project.isPublished)

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Sector filter
    if (sectorFilter !== "all") {
      filtered = filtered.filter((project) => project.sector === sectorFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    // Year range filter
    if (yearFromFilter) {
      filtered = filtered.filter((project) => project.yearStart >= Number.parseInt(yearFromFilter))
    }
    if (yearToFilter) {
      filtered = filtered.filter((project) => (project.yearEnd || project.yearStart) <= Number.parseInt(yearToFilter))
    }

    setFilteredProjects(filtered)
    setCurrentPage(1)
  }, [projects, searchQuery, sectorFilter, statusFilter, yearFromFilter, yearToFilter])

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

  const getAvailableSectors = () => {
    return [...new Set(projects.map((p) => p.sector))].sort()
  }

  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Реализуемые инвестиционные проекты</h1>
          <p className="text-lg text-gray-600">Каталог инвестиционных проектов города Волгограда</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 p-6 border-b bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск по названию, описанию или тегам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Отрасль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все отрасли</SelectItem>
                  {getAvailableSectors().map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="PLANNED">Планируется</SelectItem>
                  <SelectItem value="IN_PROGRESS">В работе</SelectItem>
                  <SelectItem value="COMPLETED">Завершён</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="От года"
                  value={yearFromFilter}
                  onChange={(e) => setYearFromFilter(e.target.value)}
                  className="w-24"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder="До года"
                  value={yearToFilter}
                  onChange={(e) => setYearToFilter(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">Найдено проектов: {filteredProjects.length}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSectorFilter("all")
                setStatusFilter("all")
                setYearFromFilter("")
                setYearToFilter("")
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
          {paginatedProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Проекты не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтры</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
                    <div className="relative">
                      {project.coverImagePath && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={project.coverImagePath || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-3">{project.summary}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{project.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span>
                            {project.yearStart}
                            {project.yearEnd && project.yearEnd !== project.yearStart && ` - ${project.yearEnd}`}
                          </span>
                        </div>
                        {project.capex && (
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{formatCapex(project.capex, project.currency)}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="pt-2">
                          <Link href={`/investor/projects/${project.slug}`}>
                            <Button className="w-full" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Подробнее
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Предыдущая
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Следующая
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
