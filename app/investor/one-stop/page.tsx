"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Phone, Mail, User, FileText, Send } from "lucide-react"

interface OneStopStep {
  id: string
  title: string
  body: string
  slaValue: number
  slaUnit: "DAYS" | "WEEKS"
  department: string
  order: number
  attachments: Array<{
    id: string
    title: string
    filePath: string
  }>
}

interface Contact {
  id: string
  fullName: string
  position: string
  phone?: string
  email?: string
  photoPath?: string
}

const mockSteps: OneStopStep[] = [
  {
    id: "1",
    title: "Подача заявления и документов",
    body: "Инвестор подает заявление о намерении реализовать инвестиционный проект с приложением необходимых документов через единое окно или электронную систему.",
    slaValue: 1,
    slaUnit: "DAYS",
    department: "Департамент экономики",
    order: 1,
    attachments: [
      {
        id: "1",
        title: "Форма заявления",
        filePath: "/uploads/2024/01/application-form.pdf",
      },
      {
        id: "2",
        title: "Перечень документов",
        filePath: "/uploads/2024/01/documents-list.pdf",
      },
    ],
  },
  {
    id: "2",
    title: "Первичная экспертиза документов",
    body: "Проводится проверка комплектности и соответствия представленных документов установленным требованиям. При необходимости запрашиваются дополнительные документы.",
    slaValue: 5,
    slaUnit: "DAYS",
    department: "Департамент экономики",
    order: 2,
    attachments: [],
  },
  {
    id: "3",
    title: "Межведомственное согласование",
    body: "Проект направляется в профильные департаменты и ведомства для получения заключений по различным аспектам реализации проекта.",
    slaValue: 2,
    slaUnit: "WEEKS",
    department: "Профильные департаменты",
    order: 3,
    attachments: [],
  },
  {
    id: "4",
    title: "Принятие решения",
    body: "На основании результатов экспертизы принимается решение о поддержке инвестиционного проекта и предоставлении мер поддержки.",
    slaValue: 1,
    slaUnit: "WEEKS",
    department: "Администрация города",
    order: 4,
    attachments: [],
  },
  {
    id: "5",
    title: "Сопровождение реализации",
    body: "Осуществляется постоянное сопровождение проекта, мониторинг выполнения обязательств и оказание необходимой поддержки.",
    slaValue: 0,
    slaUnit: "DAYS",
    department: "Департамент экономики",
    order: 5,
    attachments: [],
  },
]

const mockContacts: Contact[] = [
  {
    id: "1",
    fullName: "Иванов Иван Иванович",
    position: "Начальник отдела инвестиций",
    phone: "+7 (8442) 30-13-52",
    email: "ivanov@volgograd.ru",
    photoPath: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    fullName: "Петрова Мария Сергеевна",
    position: "Ведущий специалист по сопровождению инвесторов",
    phone: "+7 (8442) 30-13-53",
    email: "petrova@volgograd.ru",
    photoPath: "/placeholder.svg?height=80&width=80",
  },
]

const mockDocuments = [
  {
    id: "1",
    title: "Регламент работы «одного окна»",
    filePath: "/uploads/2024/01/one-stop-regulation.pdf",
  },
  {
    id: "2",
    title: "Административный регламент",
    filePath: "/uploads/2024/01/admin-regulation.pdf",
  },
]

export default function OneStopPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const getSlaText = (value: number, unit: "DAYS" | "WEEKS") => {
    if (value === 0) return "Постоянно"
    const unitText =
      unit === "DAYS"
        ? value === 1
          ? "день"
          : value < 5
            ? "дня"
            : "дней"
        : value === 1
          ? "неделя"
          : value < 5
            ? "недели"
            : "недель"
    return `${value} ${unitText}`
  }

  const getTotalProgress = () => {
    return ((currentStep + 1) / mockSteps.length) * 100
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Регламент сопровождения «одного окна»</h1>
          <p className="text-lg text-gray-600">Пошаговый процесс сопровождения инвестиционных проектов</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Timeline */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Прогресс процедуры</span>
                    <Badge variant="outline">
                      Этап {currentStep + 1} из {mockSteps.length}
                    </Badge>
                  </CardTitle>
                  <Progress value={getTotalProgress()} className="w-full" />
                </CardHeader>
              </Card>

              <div className="space-y-6">
                {mockSteps.map((step, index) => (
                  <Card
                    key={step.id}
                    className={`transition-all duration-200 ${
                      index === currentStep
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : index < currentStep
                          ? "bg-green-50"
                          : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {index < currentStep ? (
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          ) : index === currentStep ? (
                            <Clock className="w-8 h-8 text-blue-600" />
                          ) : (
                            <AlertCircle className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-lg">
                              {step.order}. {step.title}
                            </CardTitle>
                            <Badge variant="outline">{getSlaText(step.slaValue, step.slaUnit)}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{step.body}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Ответственный:</span>
                            <span className="ml-2">{step.department}</span>
                          </div>
                          {step.attachments.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Документы:</h4>
                              <div className="space-y-2">
                                {step.attachments.map((doc) => (
                                  <Button
                                    key={doc.id}
                                    variant="outline"
                                    size="sm"
                                    className="justify-start bg-transparent"
                                    onClick={() => window.open(doc.filePath, "_blank", "noopener,noreferrer")}
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    {doc.title}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Предыдущий этап
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(mockSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === mockSteps.length - 1}
                >
                  Следующий этап
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Контакты кураторов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockContacts.map((contact) => (
                    <div key={contact.id} className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{contact.fullName}</h4>
                        <p className="text-sm text-gray-600 mb-2">{contact.position}</p>
                        {contact.phone && (
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <Phone className="w-4 h-4 mr-1" />
                            <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                        {contact.email && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="w-4 h-4 mr-1" />
                            <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                              {contact.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Нормативные документы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockDocuments.map((doc) => (
                    <Button
                      key={doc.id}
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => window.open(doc.filePath, "_blank", "noopener,noreferrer")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {doc.title}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Action Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Отправить обращение
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Получите персональную консультацию по вашему проекту
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
