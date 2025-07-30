"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  History,
  SlidersHorizontal,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import gsap from "gsap"

export default function ChatSidebar() {
  const [isAllTimeActive, setIsAllTimeActive] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [recentItems, setRecentItems] = useState([
    "Greetings & Inquiry",
    "Great Offer",
    "B2B Business",
    "Business Idea",
    "Potential Threats Detection",
  ])

  const [datedItems, setDatedItems] = useState([
    "How to protect Accounts from Threats",
    "Mail Reply",
  ])

  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const recentSectionRef = useRef<HTMLDivElement>(null)
  const datedSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (recentSectionRef.current) {
      gsap.fromTo(
        recentSectionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
    }
  }, [])

  useEffect(() => {
    if (!isMobile && isAllTimeActive && datedSectionRef.current) {
      gsap.fromTo(
        datedSectionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
    }
  }, [isAllTimeActive, isMobile])

  const startRenaming = (item: string) => {
    setEditingItem(item)
    setEditValue(item)
  }

  const applyRename = (oldTitle: string) => {
    const trimmed = editValue.trim()
    if (!trimmed) return

    const updateList = (list: string[]) =>
      list.map((i) => (i === oldTitle ? trimmed : i))

    if (recentItems.includes(oldTitle)) {
      setRecentItems(updateList)
    } else if (datedItems.includes(oldTitle)) {
      setDatedItems(updateList)
    }

    setEditingItem(null)
    setEditValue("")
  }

  const removeItem = (item: string) => {
    setRecentItems((prev) => prev.filter((i) => i !== item))
    setDatedItems((prev) => prev.filter((i) => i !== item))
  }

  const renderItem = (item: string) => (
    <div
      key={item}
      className="flex items-center justify-between px-4 py-2 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-xl shadow-sm group"
    >
      {editingItem === item ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => applyRename(item)}
          onKeyDown={(e) => {
            if (e.key === "Enter") applyRename(item)
            if (e.key === "Escape") setEditingItem(null)
          }}
          className="border-none outline-none w-full text-sm text-white placeholder-white/40 bg-white/10 px-2 py-1 rounded-md"
        />
      ) : (
        <span className="truncate text-sm text-white">{item}</span>
      )}

      {editingItem !== item && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10 text-white rounded-full w-7 h-7"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-[#1F1F3D] border border-white/10 text-white p-1 rounded-xl shadow-xl w-40 backdrop-blur-lg"
            align="end"
          >
            <DropdownMenuItem
              onClick={() => startRenaming(item)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md text-sm"
            >
              <Pencil className="w-4 h-4 text-purple-300" /> Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10 my-1" />
            <DropdownMenuItem
              onClick={() => removeItem(item)}
              className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-900/30 rounded-md text-sm"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )

  return (
    <div className="w-full h-full lg:w-[280px] bg-[#f8f7fe] p-4 md:p-5 lg:p-6 rounded-2xl flex flex-col space-y-5 md:space-y-6 border border-[#E4E7EC]">
    {/* Header Controls */}
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10 rounded-full w-8 h-8 md:w-9 md:h-9"
      >
        <History className="w-4 h-4 md:w-5 md:h-5" />
      </Button>

      <div className="flex items-center gap-1.5 bg-white/10 rounded-lg p-1">
        <Button
          onClick={() =>
            isMobile ? setIsModalOpen(true) : setIsAllTimeActive(!isAllTimeActive)
          }
          className={`text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-md transition-all duration-300 text-white ${
            isAllTimeActive ? "bg-white/20 shadow-inner" : "hover:bg-white/15"
          }`}
        >
          All Time
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-md w-8 h-8"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>

    {/* Desktop Chat List */}
    {!isMobile && (
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-1">
        <div ref={recentSectionRef}>
          <p className="text-xs md:text-sm font-medium text-white/70 mb-1 md:mb-2">Recent</p>
          <div className="space-y-2">{recentItems.map(renderItem)}</div>
        </div>

        {isAllTimeActive && (
          <div ref={datedSectionRef} className="mt-5 md:mt-6">
            <p className="text-xs md:text-sm font-medium text-white/70 mb-1 md:mb-2">
              03 Jan 2025
            </p>
            <div className="space-y-2">{datedItems.map(renderItem)}</div>
          </div>
        )}
      </div>
    )}

    {/* Mobile Modal */}
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-full w-[95vw] h-[90vh] bg-[#2C2C4A] text-white border border-[#4A4A6E] rounded-xl p-4 overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg">Chat History</DialogTitle>
          <DialogDescription className="text-white/60 text-sm">
            Access your recent and past chats here.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div>
            <p className="text-sm font-semibold text-white/70 mb-2">Recent</p>
            <div className="space-y-2">{recentItems.map(renderItem)}</div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/70 mb-2">03 Jan 2025</p>
            <div className="space-y-2">{datedItems.map(renderItem)}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Custom Scrollbar */}
    <style jsx global>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `}</style>
  </div>

  )
}
