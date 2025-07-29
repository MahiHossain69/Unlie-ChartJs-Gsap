"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Home, Clock, MoreHorizontal, Edit, Trash2, Paperclip, Send, Menu, X, Plus, Settings, User, LogOut } from 'lucide-react'

interface Conversation {
  id: string
  title: string
  date: string
  messages: Message[]
}

interface Message {
  id: string
  content: string
  timestamp: Date
  isUser: boolean
}

const initialConversations: Conversation[] = [
  { id: "1", title: "Greetings & Inquiry", date: "Recent", messages: [] },
  { id: "2", title: "Great Offer", date: "Recent", messages: [] },
  { id: "3", title: "B2B Business", date: "Recent", messages: [] },
  { id: "4", title: "Business Idea", date: "Recent", messages: [] },
  { id: "5", title: "Potential Threats Detection", date: "Recent", messages: [] },
  { id: "6", title: "How to protect Accounts fr...", date: "03 Jan 2025", messages: [] },
  { id: "7", title: "Mail Reply", date: "03 Jan 2025", messages: [] },
]

const promptButtons = [
  "Business Idea",
  "B2B Business",
  "What is B2B?",
  "Match lead to Account",
  "Mail Reply",
  "Great Offer",
  "How does AI Work",
  "Can AI Assist me",
]

export default function AskAvatarChat() {
  const [message, setMessage] = useState("")
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [renameConversationId, setRenameConversationId] = useState<string | null>(null)
  const [newConversationTitle, setNewConversationTitle] = useState("")
  const [timeFilter, setTimeFilter] = useState("All Time")

  const { toast } = useToast()
  const headerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const promptButtonsRef = useRef<HTMLDivElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate header
    if (headerRef.current) {
      tl.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
    }

    // Animate sidebar
    if (sidebarRef.current) {
      tl.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      )
    }

    // Animate main content
    if (mainContentRef.current) {
      tl.fromTo(
        mainContentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
    }

    // Animate prompt buttons
    if (promptButtonsRef.current?.children) {
      tl.fromTo(
        Array.from(promptButtonsRef.current.children),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4",
      )
    }
  }, [])

  const handlePromptClick = (prompt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setMessage(prompt)
    
    // Animate the clicked button
    const button = event.currentTarget
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
    }
    
    toast({
      title: "Prompt Selected",
      description: `"${prompt}" has been added to your message.`,
    })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Animate send button
      if (sendButtonRef.current) {
        gsap.to(sendButtonRef.current, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        })
      }

      // Simulate sending message
      toast({
        title: "Message Sent",
        description: "Your message has been sent to Avatar.",
      })

      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      date: "Recent",
      messages: [],
    }
    setConversations([newConv, ...conversations])
    setActiveConversation(newConv.id)
    toast({
      title: "New Conversation",
      description: "Started a new conversation with Avatar.",
    })
  }

  const handleRenameConversation = (id: string, currentTitle: string) => {
    setRenameConversationId(id)
    setNewConversationTitle(currentTitle)
    setIsRenameDialogOpen(true)
  }

  const confirmRename = () => {
    if (renameConversationId && newConversationTitle.trim()) {
      setConversations(
        conversations.map((conv) =>
          conv.id === renameConversationId ? { ...conv, title: newConversationTitle.trim() } : conv,
        ),
      )
      toast({
        title: "Conversation Renamed",
        description: `Conversation renamed to "${newConversationTitle}".`,
      })
    }
    setIsRenameDialogOpen(false)
    setRenameConversationId(null)
    setNewConversationTitle("")
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(conversations.filter((conv) => conv.id !== id))
    if (activeConversation === id) {
      setActiveConversation(null)
    }
    toast({
      title: "Conversation Deleted",
      description: "The conversation has been removed.",
      variant: "destructive",
    })
  }

  const handleConversationClick = (id: string) => {
    setActiveConversation(id)
    setIsSidebarOpen(false) // Close sidebar on mobile after selection
    toast({
      title: "Conversation Opened",
      description: "Switched to selected conversation.",
    })
  }

  const handleTimeFilterChange = () => {
    const filters = ["All Time", "Today", "Yesterday", "Last 7 days", "Last 30 days"]
    const currentIndex = filters.indexOf(timeFilter)
    const nextFilter = filters[(currentIndex + 1) % filters.length]
    setTimeFilter(nextFilter)
    toast({
      title: "Filter Changed",
      description: `Now showing: ${nextFilter}`,
    })
  }

  const handleAttachment = () => {
    toast({
      title: "Attachment",
      description: "File attachment feature coming soon!",
    })
  }

  const handleUserProfile = () => {
    toast({
      title: "Profile",
      description: "User profile settings opened.",
    })
  }

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Application settings opened.",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const filteredConversations = conversations.filter((conv) => {
    if (timeFilter === "All Time") return true
    if (timeFilter === "Today") return conv.date === "03 Jan 2025"
    return conv.date === "Recent"
  })

  const recentConversations = filteredConversations.filter((conv) => conv.date === "Recent")
  const todayConversations = filteredConversations.filter((conv) => conv.date === "03 Jan 2025")

  return (
    <div className="min-h-screen bg-slate-900 text-white flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed lg:relative z-50 w-80 sm:w-72 md:w-80 h-screen bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-3 sm:p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-2 hover:bg-slate-700/50">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm text-slate-300">John Due</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem onClick={handleUserProfile} className="text-slate-300 hover:bg-slate-700">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettings} className="text-slate-300 hover:bg-slate-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-slate-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleNewConversation} className="hover:bg-slate-700/50">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 text-sm"
            onClick={handleTimeFilterChange}
          >
            <Clock className="w-4 h-4" />
            {timeFilter}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-3 sm:p-4">
          <div className="space-y-4">
            {recentConversations.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-slate-400 mb-3">Recent</h3>
                <div className="space-y-1">
                  {recentConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`group flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors ${
                        activeConversation === conv.id ? "bg-slate-700/50" : ""
                      }`}
                      onClick={() => handleConversationClick(conv.id)}
                    >
                      <span className="text-xs sm:text-sm text-slate-300 truncate pr-2">{conv.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem
                            className="text-slate-300 hover:bg-slate-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRenameConversation(conv.id, conv.title)
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400 hover:bg-slate-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteConversation(conv.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {todayConversations.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-slate-400 mb-3">03 Jan 2025</h3>
                <div className="space-y-1">
                  {todayConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`group flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors ${
                        activeConversation === conv.id ? "bg-slate-700/50" : ""
                      }`}
                      onClick={() => handleConversationClick(conv.id)}
                    >
                      <span className="text-xs sm:text-sm text-slate-300 truncate pr-2">{conv.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem
                            className="text-slate-300 hover:bg-slate-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRenameConversation(conv.id, conv.title)
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400 hover:bg-slate-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteConversation(conv.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header ref={headerRef} className="p-3 sm:p-4 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-semibold">Ask the Avatar</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div ref={mainContentRef} className="w-full max-w-4xl text-center space-y-6 sm:space-y-8">
            {/* Greeting */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hi{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  There, Adam
                </span>
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-300 leading-tight">
                What{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  would like to know
                </span>
              </h3>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                Choose a prompt or write your own to start chatting with Avatar
              </p>
            </div>

            {/* Prompt Buttons */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-slate-400 text-left text-sm sm:text-base">Ask About:</p>
              <div ref={promptButtonsRef} className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {promptButtons.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 hover:border-purple-500 transition-all duration-200 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2"
                    onClick={(e) => handlePromptClick(prompt, e)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full" />
                  </div>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask whatever you want..."
                    className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-slate-400 text-sm sm:text-base"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    maxLength={1000}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white flex-shrink-0"
                    onClick={handleAttachment}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="text-xs text-slate-500 hidden sm:block">{message.length}/1000</div>
                  <Button
                    ref={sendButtonRef}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex-shrink-0"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500 mt-2 text-right sm:hidden">{message.length}/1000</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="conversation-title">New Title</Label>
              <Input
                id="conversation-title"
                value={newConversationTitle}
                onChange={(e) => setNewConversationTitle(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && confirmRename()}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmRename} disabled={!newConversationTitle.trim()}>
                Rename
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
