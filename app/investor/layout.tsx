"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Building2,
  Phone,
  Send,
  MessageSquare,
  Globe,
  User,
  Menu,
  FileText,
  MapPin,
  Briefcase,
  TrendingUp,
  HeadphonesIcon,
  FolderOpen,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const investorMenuItems = [
  {
    href: "/investor/offers",
    label: "Инвест-предложения",
    icon: FileText,
  },
  {
    href: "/investor/realty",
    label: "Недвижимость и площадки",
    icon: MapPin,
  },
  {
    href: "/investor/ppp",
    label: "Программы / МЧП",
    icon: Briefcase,
  },
  {
    href: "/investor/projects",
    label: "Инвестиционные проекты",
    icon: TrendingUp,
  },
  {
    href: "/investor/support",
    label: "Сервис «Одно окно»",
    icon: HeadphonesIcon,
  },
  {
    href: "/investor/docs",
    label: "Документы и нормативная база",
    icon: FolderOpen,
  },
]

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getCurrentPageTitle = () => {
    const currentItem = investorMenuItems.find((item) => item.href === pathname)
    return currentItem?.label || "Инвестору"
  }

  const MobileMenu = () => (
    <div className="flex flex-col space-y-2 p-4">
      {investorMenuItems.map((item) => {
        const IconComponent = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <IconComponent className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-sm border-b z-50 h-16">
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
              <Link href="/investor/offers" className="hover:text-blue-600">
                Инвестору
              </Link>
              <span>/</span>
              <span className="text-blue-600 font-medium">{getCurrentPageTitle()}</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Phone */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+7 (8442) 30‑13‑52</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="hidden md:flex text-sm h-9">
                  <Send className="w-4 h-4 mr-2" />
                  Подать обращение
                </Button>
                <Button size="sm" className="hidden md:flex text-sm h-9">
                  <User className="w-4 h-4 mr-2" />
                  Кабинет инвестора
                </Button>

                {/* Mobile Menu Button */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="py-4">
                      <h2 className="text-lg font-semibold mb-4">Инвестору</h2>
                      <MobileMenu />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-white/10 backdrop-blur-sm border-r border-white/20">
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">Инвестору</h2>
            <nav className="space-y-2">
              {investorMenuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-white/20 text-white border-l-4 border-blue-400"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-h-0">{children}</div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-gray-900 text-white py-3 z-50 h-14">
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col lg:flex-row justify-between items-center h-full">
            <div>
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
