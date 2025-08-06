"use client"

import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  BookOpen,
  Sparkles,
  ChevronsUpDown,
  
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onContactClick: () => void
}

// All available avatars
const avatars = [
  {
    name: "Elon Musk",
    image: "/elon.png",
  },
  {
    name: "Bill Gates",
    image: "/bill.png",
  },
  {
    name: "Bernard Arnault",
    image: "/bernard.png",
  },
]

export default function Sidebar({ isOpen, onClose, onContactClick }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", icon: LayoutGrid, href: "/dashboard-page" },
    { name: "Knowledge Base", icon: BookOpen, href: "/knowladge-page" },
    { name: "Ask the Avatar", icon: Sparkles, href: "/AskTheAvater-page" },
  ]

  // Start with John Due
  const [selectedAvatar, setSelectedAvatar] = useState({
    name: "John Due",
    image: "/john.svg",
  })

  const handleNavClick = () => {
    if (window.innerWidth < 1024) onClose()
  }

  const handleContactClick = () => {
    onContactClick()
    if (window.innerWidth < 1024) onClose()
  }

  const handleAvatarSelect = (avatar: { name: string; image: string }) => {
    setSelectedAvatar(avatar)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#101828] border border-white/10 text-white flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:inset-0"
        )}
      >
        {/* Close Button (Mobile) */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            ✕
          </Button>
        </div>

        {/* Logo */}
        <Link href="/" passHref>
        <div className="p-6 flex justify-center">
          <Image src="/logo.png" alt="Uniie Logo" width={218} height={39} priority />
        </div></Link>

        {/* Avatar Dropdown */}
        <div className="px-4 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                <div className="flex items-center space-x-3">
                  <Image
                    src={selectedAvatar.image}
                    alt={selectedAvatar.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-white font-space font-medium">{selectedAvatar.name}</span>
                </div>
                <ChevronsUpDown className="w-5 h-5 text-[#98A2B3]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              className="bg-[#1E293B] border-none text-white shadow-lg rounded-xl w-full"
            >
              {avatars.map((avatar) => (
                <DropdownMenuItem
                  key={avatar.name}
                  onClick={() => handleAvatarSelect(avatar)}
                  className="flex font-space items-center space-x-3 px-4 py-2 hover:!bg-[#473BF0] dark:hover:bg-white/10 rounded-md cursor-pointer"
                >
                  <Image src={avatar.image} alt={avatar.name} width={30} height={30} className="rounded-full" />
                  <span>{avatar.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4  space-y-2 overflow-y-auto">
          {navigation.map(({ name, icon: Icon, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={name}
                href={href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-2 mt-[40px] lg:mt-0 font-space px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-[#473BF0] text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
                <Icon className="w-8 h-8 p-1.5 rounded-full bg-white/10 text-white" />
                {name}
              </Link>
            )
          })}
        </nav>

        {/* Contact Us */}
        <div className="p-4 ">
          <button
            onClick={handleContactClick}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Image
              src="/contact.png"
              alt="Contact Us"
              width={28}
              height={28}
              className="mr-3 p-1 bg-white/10 rounded-full shadow-sm"
            />
            Contact Us
          </button>
        </div>
      </div>
    </>
  )
}
