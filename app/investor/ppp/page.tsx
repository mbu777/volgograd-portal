"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, FileText, Clock, CheckCircle } from "lucide-react"

const municipalPrograms = [
  {
    id: 1,
    title: "Программа поддержки малого и среднего бизнеса",
    description: "Комплексная поддержка предпринимательства в городе Волгограде",
    budget: "150 млн ₽",
    period: "2024-2026",
    participants: "250+ компаний",
    status: "Активна",
    benefits: [
      "Субсидии на развитие бизнеса",
      "Льготное кредитование",
      "Консультационная поддержка",
      "Помощь в получении грантов",
    ],
    requirements: ["Регистрация в Волгограде", "Соответствие критериям МСП", "Отсутствие задолженности"],
  },
  {
    id: 2,
    title: "Инновационное развитие промышленности",
    description: "Модернизация промышленных предприятий и внедрение инноваций",
    budget: "500 млн ₽",
    period: "2024-2028",
    participants: "50+ предприятий",
    status: "Активна",
    benefits: ["Субсидии на НИОКР", "Поддержка технологических проектов", "Льготы по налогам", "Помощь в патентовании"],
    requirements: ["Промышленное предприятие", "Инновационный проект", "Создание рабочих мест"],
  },
  {
    id: 3,
    title: "Развитие туристической отрасли",
    description: "Поддержка туристических проектов и инфраструктуры",
    budget: "200 млн ₽",
    period: "2024-2027",
    participants: "80+ проектов",
    status: "Набор участников",
    benefits: ["Гранты на развитие туризма", "Маркетинговая поддержка", "Обучение персонала", "Продвижение проектов"],
    requirements: ["Туристическая деятельность", "Соответствие стандартам", "Социальная значимость"],
  },
]

const pppProjects = [
  {
    id: 1,
    title: "Модернизация системы водоснабжения",
    description: "Комплексная модернизация водопроводных сетей города",
    investment: "2.5 млрд ₽",
    period: "2024-2030",
    stage: "Поиск инвестора",
    status: "Открыт",
    benefits: ["Гарантированная доходность", "Долгосрочный контракт", "Государственные гарантии", "Налоговые льготы"],
    requirements: ["Опыт в сфере ЖКХ", "Финансовые гарантии", "Техническая экспертиза"],
  },
  {
    id: 2,
    title: "Строительство спортивного комплекса",
    description: "Многофункциональный спортивно-развлекательный комплекс",
    investment: "1.8 млрд ₽",
    period: "2024-2028",
    stage: "Проектирование",
    status: "В работе",
    benefits: ["Эксклюзивные права", "Муниципальная поддержка", "Готовая инфраструктура", "Маркетинговая поддержка"],
    requirements: ["Опыт строительства", "Собственные средства", "Соответствие стандартам"],
  },
  {
    id: 3,
    title: "Развитие общественного транспорта",
    description: "Обновление автобусного парка и инфраструктуры",
    investment: "3.2 млрд ₽",
    period: "2024-2032",
    stage: "Планирование",
    status: "Планируется",
    benefits: ["Долгосрочная концессия", "Субсидии на обновление", "Эксклюзивные маршруты", "Техническая поддержка"],
    requirements: ["Опыт в транспорте", "Экологические стандарты", "Финансовые гарантии"],
  },
]

export default function PPPPage() {
  const [activeTab, setActiveTab] = useState("municipal")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Активна":
      case "Открыт":
        return "bg-green-100 text-green-800"
      case "Набор участников":
      case "В работе":
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Программы и ГЧП</h1>
          <p className="text-lg text-gray-600">
            Муниципальные программы поддержки и проекты государственно-частного партнерства
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="municipal">Муниципальные программы</TabsTrigger>
              <TabsTrigger value="ppp">Проекты ГЧП</TabsTrigger>
            </TabsList>

            <TabsContent value="municipal" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {municipalPrograms.map((program) => (
                  <Card
                    key={program.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {program.title}
                        </CardTitle>
                        <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-gray-500">Бюджет</p>
                            <p className="font-semibold">{program.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-gray-500">Период</p>
                            <p className="font-semibold">{program.period}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-gray-500">Участники</p>
                          <p className="font-semibold">{program.participants}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Преимущества:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {program.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1" size="sm">
                          Подать заявку
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Документы
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ppp" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {pppProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </CardTitle>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-gray-500">Инвестиции</p>
                            <p className="font-semibold">{project.investment}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-gray-500">Период</p>
                            <p className="font-semibold">{project.period}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-gray-500">Этап</p>
                          <p className="font-semibold">{project.stage}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Преимущества:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {project.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1" size="sm">
                          Участвовать
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          ТЭО
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
