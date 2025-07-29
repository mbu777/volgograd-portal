"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Building, FileText, Phone, Mail, Clock, CheckCircle } from "lucide-react"

const supportMeasures = {
  financial: [
    {
      title: "Субсидии на развитие бизнеса",
      description: "Возмещение части затрат на развитие производства",
      amount: "до 5 млн ₽",
      conditions: "Создание рабочих мест, увеличение выручки",
      documents: ["Бизнес-план", "Финансовая отчетность", "Заявление"],
    },
    {
      title: "Льготное кредитование",
      description: "Кредиты под льготную процентную ставку",
      amount: "до 50 млн ₽",
      conditions: "Ставка от 3%, срок до 7 лет",
      documents: ["Бизнес-план", "Залоговое обеспечение", "Справки о доходах"],
    },
    {
      title: "Гранты на инновации",
      description: "Безвозмездная поддержка инновационных проектов",
      amount: "до 10 млн ₽",
      conditions: "Инновационная составляющая, патенты",
      documents: ["Техническое задание", "Смета расходов", "Патентная документация"],
    },
  ],
  property: [
    {
      title: "Льготная аренда земли",
      description: "Предоставление земельных участков на льготных условиях",
      amount: "скидка до 50%",
      conditions: "Инвестиции от 100 млн ₽, создание 100+ рабочих мест",
      documents: ["Инвестиционное соглашение", "Проект застройки", "Гарантии"],
    },
    {
      title: "Льготная аренда помещений",
      description: "Аренда муниципальных помещений по сниженной ставке",
      amount: "скидка до 30%",
      conditions: "Социально значимая деятельность",
      documents: ["Бизнес-план", "Справка о деятельности", "Заявление"],
    },
  ],
  administrative: [
    {
      title: "Сопровождение инвестпроектов",
      description: "Персональное сопровождение крупных инвестиционных проектов",
      amount: "бесплатно",
      conditions: "Инвестиции от 50 млн ₽",
      documents: ["Инвестиционная декларация", "Бизнес-план"],
    },
    {
      title: "Ускоренное получение разрешений",
      description: "Приоритетное рассмотрение документов",
      amount: "бесплатно",
      conditions: "Участие в приоритетных программах",
      documents: ["Заявление", "Проектная документация"],
    },
  ],
}

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white">
      {/* Page Header */}
      <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Сервис «Одно окно»</h1>
          <p className="text-lg text-gray-600">Меры поддержки инвесторов и предпринимателей</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Support Measures */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="financial" className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">Финансовые меры поддержки</h3>
                        <p className="text-sm text-gray-600">Субсидии, льготные кредиты, гранты</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4">
                      {supportMeasures.financial.map((measure, index) => (
                        <Card key={index} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{measure.title}</h4>
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                {measure.amount}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{measure.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Условия:</span>
                                <p className="text-gray-600">{measure.conditions}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Документы:</span>
                                <ul className="text-gray-600 mt-1">
                                  {measure.documents.map((doc, docIndex) => (
                                    <li key={docIndex} className="flex items-center">
                                      <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="property" className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">Имущественные меры поддержки</h3>
                        <p className="text-sm text-gray-600">Льготная аренда земли и помещений</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4">
                      {supportMeasures.property.map((measure, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{measure.title}</h4>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {measure.amount}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{measure.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Условия:</span>
                                <p className="text-gray-600">{measure.conditions}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Документы:</span>
                                <ul className="text-gray-600 mt-1">
                                  {measure.documents.map((doc, docIndex) => (
                                    <li key={docIndex} className="flex items-center">
                                      <CheckCircle className="w-3 h-3 text-blue-500 mr-1" />
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="administrative" className="border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">Административные меры поддержки</h3>
                        <p className="text-sm text-gray-600">Сопровождение проектов, ускоренные процедуры</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4">
                      {supportMeasures.administrative.map((measure, index) => (
                        <Card key={index} className="border-l-4 border-l-purple-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{measure.title}</h4>
                              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                {measure.amount}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{measure.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Условия:</span>
                                <p className="text-gray-600">{measure.conditions}</p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Документы:</span>
                                <ul className="text-gray-600 mt-1">
                                  {measure.documents.map((doc, docIndex) => (
                                    <li key={docIndex} className="flex items-center">
                                      <CheckCircle className="w-3 h-3 text-purple-500 mr-1" />
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-96 border-l bg-gray-50 p-6 overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>Обратная связь</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Название компании"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение *</label>
                    <Textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Опишите ваш вопрос или проект..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>Контакты</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Горячая линия</p>
                  <p className="text-blue-600">+7 (8442) 30-13-52</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-blue-600">invest@volgograd.ru</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Режим работы</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Пн-Пт: 9:00-18:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
