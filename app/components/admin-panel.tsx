"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
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
  Eye,
  DollarSign,
} from "lucide-react"

// Типы данных
interface Advantage {
  id: string
  number: string
  title: string
  description: string
  icon: string
  order: number
}

interface NewsItem {
  id: number
  title: string
  category: string
  date: string
  excerpt: string
  content: string
  image: string
  views: number
  featured: boolean
}

interface KeyIndicator {
  title: string
  value: string
  change: string
  positive: boolean
}

interface InvestmentOffer {
  id: number
  title: string
  district: string
  area: string
  price: string
  status: string
  image: string
  description: string
  communications: string[]
}

interface Project {
  id: number
  title: string
  description: string
  status: string
  investment: string
  location: string
  completion: string
  progress: number
  investor: string
  jobs: number
  images: string[]
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

const iconOptions = [
  { value: "MapPin", label: "Карта", icon: MapPin },
  { value: "Factory", label: "Завод", icon: Factory },
  { value: "Truck", label: "Транспорт", icon: Truck },
  { value: "Plane", label: "Самолет", icon: Plane },
  { value: "Users", label: "Люди", icon: Users },
  { value: "Building", label: "Здание", icon: Building },
  { value: "Zap", label: "Энергия", icon: Zap },
  { value: "Wifi", label: "IT", icon: Wifi },
  { value: "Target", label: "Цель", icon: Target },
  { value: "Star", label: "Звезда", icon: Star },
  { value: "Award", label: "Награда", icon: Award },
  { value: "Globe", label: "Глобус", icon: Globe },
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("advantages")

  // Состояния для разных типов контента
  const [advantages, setAdvantages] = useState<Advantage[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [indicators, setIndicators] = useState<KeyIndicator[]>([])
  const [offers, setOffers] = useState<InvestmentOffer[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  // Состояния для редактирования
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<any>({})

  // Загрузка данных при монтировании
  useEffect(() => {
    loadAdvantages()
    loadNews()
    loadIndicators()
    loadOffers()
    loadProjects()
  }, [])

  // Функции загрузки данных
  const loadAdvantages = () => {
    const saved = localStorage.getItem("volgograd-advantages")
    if (saved) {
      setAdvantages(JSON.parse(saved))
    } else {
      const defaultAdvantages: Advantage[] = [
        {
          id: "1",
          number: "01",
          title: "Стратегическое расположение",
          description: "Пересечение важных транспортных путей",
          icon: "MapPin",
          order: 1,
        },
        {
          id: "2",
          number: "02",
          title: "Промышленный потенциал",
          description: "Развитая металлургическая и химическая промышленность",
          icon: "Factory",
          order: 2,
        },
      ]
      setAdvantages(defaultAdvantages)
      localStorage.setItem("volgograd-advantages", JSON.stringify(defaultAdvantages))
    }
  }

  const loadNews = () => {
    const saved = localStorage.getItem("volgograd-news")
    if (saved) {
      setNews(JSON.parse(saved))
    } else {
      const defaultNews: NewsItem[] = [
        {
          id: 1,
          title: "Новые льготы для IT-компаний в Волгограде",
          category: "Бизнесу",
          date: "2024-12-20",
          excerpt: "Администрация города утвердила дополнительные меры поддержки для IT-предприятий",
          content: "Полный текст новости о льготах для IT-компаний...",
          image: "/placeholder.svg?height=300&width=500",
          views: 1250,
          featured: true,
        },
      ]
      setNews(defaultNews)
      localStorage.setItem("volgograd-news", JSON.stringify(defaultNews))
    }
  }

  const loadIndicators = () => {
    const saved = localStorage.getItem("volgograd-indicators")
    if (saved) {
      setIndicators(JSON.parse(saved))
    } else {
      const defaultIndicators: KeyIndicator[] = [
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
      ]
      setIndicators(defaultIndicators)
      localStorage.setItem("volgograd-indicators", JSON.stringify(defaultIndicators))
    }
  }

  const loadOffers = () => {
    const saved = localStorage.getItem("volgograd-offers")
    if (saved) {
      setOffers(JSON.parse(saved))
    } else {
      const defaultOffers: InvestmentOffer[] = [
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
      ]
      setOffers(defaultOffers)
      localStorage.setItem("volgograd-offers", JSON.stringify(defaultOffers))
    }
  }

  const loadProjects = () => {
    const saved = localStorage.getItem("volgograd-projects")
    if (saved) {
      setProjects(JSON.parse(saved))
    } else {
      const defaultProjects: Project[] = [
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
          images: ["/placeholder.svg?height=200&width=300"],
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("volgograd-projects", JSON.stringify(defaultProjects))
    }
  }

  // Функции сохранения
  const saveAdvantages = (data: Advantage[]) => {
    setAdvantages(data)
    localStorage.setItem("volgograd-advantages", JSON.stringify(data))
  }

  const saveNews = (data: NewsItem[]) => {
    setNews(data)
    localStorage.setItem("volgograd-news", JSON.stringify(data))
  }

  const saveIndicators = (data: KeyIndicator[]) => {
    setIndicators(data)
    localStorage.setItem("volgograd-indicators", JSON.stringify(data))
  }

  const saveOffers = (data: InvestmentOffer[]) => {
    setOffers(data)
    localStorage.setItem("volgograd-offers", JSON.stringify(data))
  }

  const saveProjects = (data: Project[]) => {
    setProjects(data)
    localStorage.setItem("volgograd-projects", JSON.stringify(data))
  }

  // Универсальные функции для работы с данными
  const handleAdd = () => {
    if (activeTab === "advantages") {
      const newItem: Advantage = {
        id: Date.now().toString(),
        number: String(advantages.length + 1).padStart(2, "0"),
        title: formData.title || "",
        description: formData.description || "",
        icon: formData.icon || "Target",
        order: advantages.length + 1,
      }
      saveAdvantages([...advantages, newItem])
    } else if (activeTab === "news") {
      const newItem: NewsItem = {
        id: Date.now(),
        title: formData.title || "",
        category: formData.category || "Городские",
        date: formData.date || new Date().toISOString().split("T")[0],
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        image: formData.image || "/placeholder.svg?height=300&width=500",
        views: 0,
        featured: formData.featured || false,
      }
      saveNews([...news, newItem])
    } else if (activeTab === "indicators") {
      const newItem: KeyIndicator = {
        title: formData.title || "",
        value: formData.value || "",
        change: formData.change || "",
        positive: formData.positive || true,
      }
      saveIndicators([...indicators, newItem])
    } else if (activeTab === "offers") {
      const newItem: InvestmentOffer = {
        id: Date.now(),
        title: formData.title || "",
        district: formData.district || "",
        area: formData.area || "",
        price: formData.price || "",
        status: formData.status || "Доступна",
        image: formData.image || "/placeholder.svg?height=200&width=300",
        description: formData.description || "",
        communications: formData.communications || [],
      }
      saveOffers([...offers, newItem])
    } else if (activeTab === "projects") {
      const newItem: Project = {
        id: Date.now(),
        title: formData.title || "",
        description: formData.description || "",
        status: formData.status || "Планируется",
        investment: formData.investment || "",
        location: formData.location || "",
        completion: formData.completion || "",
        progress: formData.progress || 0,
        investor: formData.investor || "",
        jobs: formData.jobs || 0,
        images: formData.images || ["/placeholder.svg?height=200&width=300"],
      }
      saveProjects([...projects, newItem])
    }

    setFormData({})
    setIsAdding(false)
  }

  const handleEdit = (id: string | number) => {
    setEditingId(id)

    if (activeTab === "advantages") {
      const item = advantages.find((a) => a.id === id)
      if (item) setFormData(item)
    } else if (activeTab === "news") {
      const item = news.find((n) => n.id === id)
      if (item) setFormData(item)
    } else if (activeTab === "indicators") {
      const item = indicators[id as number]
      if (item) setFormData(item)
    } else if (activeTab === "offers") {
      const item = offers.find((o) => o.id === id)
      if (item) setFormData(item)
    } else if (activeTab === "projects") {
      const item = projects.find((p) => p.id === id)
      if (item) setFormData(item)
    }
  }

  const handleSave = () => {
    if (activeTab === "advantages") {
      const updated = advantages.map((item) => (item.id === editingId ? { ...item, ...formData } : item))
      saveAdvantages(updated)
    } else if (activeTab === "news") {
      const updated = news.map((item) => (item.id === editingId ? { ...item, ...formData } : item))
      saveNews(updated)
    } else if (activeTab === "indicators") {
      const updated = [...indicators]
      updated[editingId as number] = { ...updated[editingId as number], ...formData }
      saveIndicators(updated)
    } else if (activeTab === "offers") {
      const updated = offers.map((item) => (item.id === editingId ? { ...item, ...formData } : item))
      saveOffers(updated)
    } else if (activeTab === "projects") {
      const updated = projects.map((item) => (item.id === editingId ? { ...item, ...formData } : item))
      saveProjects(updated)
    }

    setEditingId(null)
    setFormData({})
  }

  const handleDelete = (id: string | number) => {
    if (activeTab === "advantages") {
      const filtered = advantages.filter((a) => a.id !== id)
      const reordered = filtered.map((item, index) => ({
        ...item,
        number: String(index + 1).padStart(2, "0"),
        order: index + 1,
      }))
      saveAdvantages(reordered)
    } else if (activeTab === "news") {
      saveNews(news.filter((n) => n.id !== id))
    } else if (activeTab === "indicators") {
      const filtered = indicators.filter((_, index) => index !== id)
      saveIndicators(filtered)
    } else if (activeTab === "offers") {
      saveOffers(offers.filter((o) => o.id !== id))
    } else if (activeTab === "projects") {
      saveProjects(projects.filter((p) => p.id !== id))
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({})
  }

  const renderAdvantagesTab = () => (
    <div className="space-y-4">
      {isAdding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Добавить преимущество</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Название"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Описание"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: option.value })}
                    className={`p-2 rounded border-2 ${
                      formData.icon === option.value ? "border-blue-500 bg-blue-100" : "border-gray-200"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mx-auto" />
                  </button>
                )
              })}
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdd}>Сохранить</Button>
              <Button variant="outline" onClick={cancelEdit}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {advantages.map((advantage) => {
        const IconComponent = iconMap[advantage.icon as keyof typeof iconMap] || Target
        const isEditing = editingId === advantage.id

        return (
          <Card key={advantage.id} className={isEditing ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Название"
                  />
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Описание"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {advantage.number}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <h3 className="font-semibold">{advantage.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{advantage.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(advantage.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(advantage.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderNewsTab = () => (
    <div className="space-y-4">
      {isAdding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Добавить новость</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Заголовок"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Select
              value={formData.category || ""}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Федеральные">Федеральные</SelectItem>
                <SelectItem value="Региональные">Региональные</SelectItem>
                <SelectItem value="Городские">Городские</SelectItem>
                <SelectItem value="Бизнесу">Бизнесу</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={formData.date || ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <Textarea
              placeholder="Краткое описание"
              value={formData.excerpt || ""}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
            <Textarea
              placeholder="Полный текст"
              rows={5}
              value={formData.content || ""}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <Input
              placeholder="URL изображения"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <label htmlFor="featured">Главная новость</label>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdd}>Сохранить</Button>
              <Button variant="outline" onClick={cancelEdit}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {news.map((item) => {
        const isEditing = editingId === item.id

        return (
          <Card key={item.id} className={isEditing ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Заголовок"
                  />
                  <Textarea
                    value={formData.excerpt || ""}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Краткое описание"
                  />
                  <Textarea
                    value={formData.content || ""}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Полный текст"
                    rows={5}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge>{item.category}</Badge>
                      <span className="text-sm text-gray-500">{item.date}</span>
                      {item.featured && <Badge variant="outline">Главная</Badge>}
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.excerpt}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderIndicatorsTab = () => (
    <div className="space-y-4">
      {isAdding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Добавить показатель</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Название показателя"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="Значение"
              value={formData.value || ""}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
            <Input
              placeholder="Изменение"
              value={formData.change || ""}
              onChange={(e) => setFormData({ ...formData, change: e.target.value })}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="positive"
                checked={formData.positive || false}
                onChange={(e) => setFormData({ ...formData, positive: e.target.checked })}
              />
              <label htmlFor="positive">Положительная динамика</label>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdd}>Сохранить</Button>
              <Button variant="outline" onClick={cancelEdit}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {indicators.map((item, index) => {
        const isEditing = editingId === index

        return (
          <Card key={index} className={isEditing ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Название"
                  />
                  <Input
                    value={formData.value || ""}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="Значение"
                  />
                  <Input
                    value={formData.change || ""}
                    onChange={(e) => setFormData({ ...formData, change: e.target.value })}
                    placeholder="Изменение"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{item.value}</span>
                      <span className={`text-sm ${item.positive ? "text-green-600" : "text-red-600"}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(index)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderOffersTab = () => (
    <div className="space-y-4">
      {isAdding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Добавить предложение</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Название"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="Район"
              value={formData.district || ""}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            />
            <Input
              placeholder="Площадь"
              value={formData.area || ""}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
            <Input
              placeholder="Цена"
              value={formData.price || ""}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <Textarea
              placeholder="Описание"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="flex space-x-2">
              <Button onClick={handleAdd}>Сохранить</Button>
              <Button variant="outline" onClick={cancelEdit}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {offers.map((item) => {
        const isEditing = editingId === item.id

        return (
          <Card key={item.id} className={isEditing ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Название"
                  />
                  <Input
                    value={formData.district || ""}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Район"
                  />
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Описание"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {item.district}
                      </span>
                      <span>{item.area}</span>
                      <span className="text-green-600 font-medium">{item.price}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderProjectsTab = () => (
    <div className="space-y-4">
      {isAdding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Добавить проект</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Название проекта"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Описание"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Input
              placeholder="Инвестиции"
              value={formData.investment || ""}
              onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
            />
            <Input
              placeholder="Локация"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              placeholder="Инвестор"
              value={formData.investor || ""}
              onChange={(e) => setFormData({ ...formData, investor: e.target.value })}
            />
            <div className="flex space-x-2">
              <Button onClick={handleAdd}>Сохранить</Button>
              <Button variant="outline" onClick={cancelEdit}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {projects.map((item) => {
        const isEditing = editingId === item.id

        return (
          <Card key={item.id} className={isEditing ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Название"
                  />
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Описание"
                  />
                  <Input
                    value={formData.investment || ""}
                    onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                    placeholder="Инвестиции"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Сохранить</Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge>{item.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>
                        <DollarSign className="w-3 h-3 inline mr-1" />
                        {item.investment}
                      </span>
                      <span>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {item.location}
                      </span>
                      <span>
                        <Users className="w-3 h-3 inline mr-1" />
                        {item.jobs} мест
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Прогресс</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(item.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
              <p className="text-gray-600 mt-1">Управление всем контентом сайта</p>
            </div>
            <Button onClick={() => setIsAdding(true)} disabled={isAdding || editingId !== null}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="flex-shrink-0 border-b bg-white px-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="advantages">Преимущества</TabsTrigger>
                <TabsTrigger value="news">Новости</TabsTrigger>
                <TabsTrigger value="indicators">Показатели</TabsTrigger>
                <TabsTrigger value="offers">Предложения</TabsTrigger>
                <TabsTrigger value="projects">Проекты</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                <TabsContent value="advantages" className="mt-0">
                  {renderAdvantagesTab()}
                </TabsContent>

                <TabsContent value="news" className="mt-0">
                  {renderNewsTab()}
                </TabsContent>

                <TabsContent value="indicators" className="mt-0">
                  {renderIndicatorsTab()}
                </TabsContent>

                <TabsContent value="offers" className="mt-0">
                  {renderOffersTab()}
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  {renderProjectsTab()}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
