"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Paperclip, Send, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  sender: "user" | "ai"
  text: string
  avatar: string
  isThinking?: boolean
}

export default function Component() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const headlineRef = useRef(null)
  const subHeadlineRef = useRef(null)
  const promptButtonsRef = useRef(null)
  const inputAreaRef = useRef(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const promptSuggestions = [
    "Business Idea",
    "B2B Business",
    "What is B2B?",
    "Match lead to Account",
    "Mail Reply",
    "Great Offer",
    "How does AI Work",
    "Can AI Assist me",
  ]

  useEffect(() => {
    gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
    gsap.fromTo(subHeadlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" })
    gsap.fromTo(promptButtonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" })
    gsap.fromTo(inputAreaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" })
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    const userMessageText = inputValue.trim()
    if (!userMessageText) return

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userMessageText,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    const thinkingMessage: Message = {
      id: Date.now() + 1,
      sender: "ai",
      text: "Thinking...",
      avatar: "/placeholder.svg?height=40&width=40",
      isThinking: true,
    }

    setMessages((prev) => [...prev, newUserMessage, thinkingMessage])
    setInputValue("")

    setTimeout(() => {
      const aiResponse = `Here's the results of 5 attention-grabbing headlines:\n1. Revolutionize Customer Engagement with AI Chat Copywriter\n2. Unleash the Power of AI Chat Copywriters\n3. Chatbots on Steroids: Meet the AI Copywriter\n4. From Bland to Brilliant: AI Copywriters\n5. Say Goodbye to Boring Chats`
      setMessages((prev) =>
        prev.map((msg) => (msg.id === thinkingMessage.id ? { ...msg, text: aiResponse, isThinking: false } : msg)),
      )
    }, 2000)
  }

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
  }

  return (
    <div className="flex w-full flex-col items-center justify-between xl:min-h-[707px] md:h-full lg:h-[883px] h-full p-4 md:p-6 bg-white rounded-lg text-white">
      <div className="w-full flex-grow mt-20 text-center flex flex-col items-center justify-center max-w-4xl mx-auto space-y-6">
        {messages.length === 0 ? (
          <>
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4A5773] via-[#FB6BE3] to-[#725CF6] bg-clip-text text-transparent font-space"
            >
              Hi There, Adam
            </h1>
            <h2
              ref={subHeadlineRef}
              className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#4A5773] via-[#FB6BE3] to-[#725CF6] bg-clip-text text-transparent font-space"
            >
              What would you like to know?
            </h2>
            <p className="text-sm md:text-lg text-[#475467] max-w-xs sm:max-w-md mx-auto font-space">
              Choose a prompt or write your own to start chatting with Avatar
            </p>
          </>
        ) : (
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto w-full px-2 md:px-4 custom-scrollbar"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 md:gap-4 mb-6 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <Avatar className="w-8 h-8 md:w-10 md:h-10 border-2 border-purple-500 bg-black">
                    <AvatarImage src={message.avatar} alt="AI Avatar" />
                    <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 md:p-4 rounded-xl shadow-lg backdrop-blur-sm text-sm md:text-base ${
                    message.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 border border-purple-500 text-white"
                  } ${message.isThinking ? "animate-pulse" : ""}`}
                  style={{ maxWidth: "80%" }}
                >
                  {message.text.split("\n").map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0 whitespace-pre-wrap">{line}</p>
                  ))}
                </div>
                {message.sender === "user" && (
                  <Avatar className="w-8 h-8 md:w-10 md:h-10 border-2 border-purple-500">
                    <AvatarImage src={message.avatar} alt="User Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        )}

        {messages.length === 0 && (
          <div
            ref={promptButtonsRef}
            className="flex flex-wrap justify-center gap-3 pt-6 max-w-2xl w-full"
          >
            <p className="w-full text-center text-[#101828] font-space text-sm mb-2">
              Ask About:
            </p>
            {promptSuggestions.map((prompt, index) => (
              <Button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-[#101828] border hover:bg-transparent font-space font-normal border-[#D0D5DD] shadow-none rounded-full px-4 py-2 text-xs sm:text-sm bg-transparent"
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div ref={inputAreaRef} className="relative w-full max-w-3xl mx-auto mt-auto pb-6">
        <div className="bg-white/10 mt-[25px] border border-purple-500 rounded-xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <Sparkles className="w-5 h-5 text-purple-300" />
            <span className="text-sm">Ask whatever you want...</span>
          </div>
          <Textarea
            className="w-full bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[80px] sm:min-h-[100px]"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <div className="flex justify-between items-center mt-2">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full">
              <Paperclip className="w-4 h-4 mr-2" />
              Add Attachment
            </Button>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full"
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
