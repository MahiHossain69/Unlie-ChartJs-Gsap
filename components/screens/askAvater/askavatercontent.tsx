"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowRightLong } from "react-icons/fa6";
import { gsap } from "gsap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { LuCirclePlus } from "react-icons/lu";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  avatar: string;
  isThinking?: boolean;
  attachmentName?: string;
}

export default function Component() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinkingDots, setThinkingDots] = useState(".");
  const [attachment, setAttachment] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const headlineRef = useRef(null);
  const subHeadlineRef = useRef(null);
  const promptButtonsRef = useRef(null);
  const inputAreaRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    "Business Idea",
    "B2B Business",
    "What is B2B?",
    "Match lead to Account",
    "Mail Reply",
    "Great Offer",
    "How does AI Work",
    "Can AI Assist me",
  ];

  useEffect(() => {
    gsap.fromTo(headlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(subHeadlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.2 });
    gsap.fromTo(promptButtonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.4 });
    gsap.fromTo(inputAreaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.6 });
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThinkingDots((prev) => (prev === "..." ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    const userMessageText = inputValue.trim();
    if (!userMessageText && !attachment) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userMessageText || "[Attachment]",
      avatar: "/adamroot.svg",
      attachmentName: attachment?.name,
    };

    const thinkingMessage: Message = {
      id: Date.now() + 1,
      sender: "ai",
      text: "Thinking",
      avatar: "/chatreply.svg",
      isThinking: true,
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    setInputValue("");
    setAttachment(null);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachment(file);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-between xl:min-h-[707px] md:h-full lg:h-[883px] h-full p-4 md:p-6 bg-white rounded-lg bg-gradient-to-r from-[#fff] via-[#ffffff] to-[#ecebff] dark:bg-[#171c38] dark:from-[#171c38] dark:to-[#1d204b] text-white">
      <div className="w-full flex-grow mt-20 text-center flex flex-col items-center justify-center max-w-4xl mx-auto space-y-6">
        {messages.length === 0 ? (
          <>
            <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4A5773] via-[#FB6BE3] to-[#725CF6] bg-clip-text text-transparent font-space">
              Hi There, Adam
            </h1>
            <h2 ref={subHeadlineRef} className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#4A5773] via-[#FB6BE3] to-[#725CF6] bg-clip-text text-transparent font-space">
              What would you like to know?
            </h2>
            <p className="text-sm md:text-lg text-[#475467] dark:text-[#98A2B3] max-w-xs sm:max-w-md mx-auto font-space">
              Choose a prompt or write your own to start chatting with Avatar
            </p>
          </>
        ) : (
          <div ref={chatContainerRef} className="flex-grow overflow-y-auto w-full px-2 md:px-4 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 md:gap-4 mb-6 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <Avatar className="w-8 h-8 md:w-10 md:h-10  bg-black">
                    <AvatarImage src={message.avatar} alt="AI Avatar" className="w-full h-full object-cover" />
                    <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 md:p-4 rounded-xl shadow-lg backdrop-blur-sm text-sm md:text-base ${
                    message.sender === "user"
                      ? "bg-[#0000000F]/5 dark:border-[#344054] dark:bg-white/5 dark:text-white border font-normal text-[14px] border-[#E4E7EC] font-space text-[#101828]"
                      : "shadow-none font-space font-normal text-[14px] text-white"
                  }`}
                  style={{ maxWidth: "80%" }}
                >
                  {message.isThinking ? (
                    <p className="animate-pulse dark:text-white text-[#101828]">Thinking{thinkingDots}</p>
                  ) : (
                    <>
                      {message.text.split("\n").map((line, i) => (
                        <p key={i} className="mb-1 text-[#101828] dark:text-white last:mb-0 whitespace-pre-wrap">
                          {line}
                        </p>
                      ))}
                      {message.attachmentName && (
                        <div className="mt-2 text-xs text-blue-600 underline">{message.attachmentName}</div>
                      )}
                    </>
                  )}
                </div>
                {message.sender === "user" && (
                  <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarImage src={message.avatar} className="w-full h-full object-cover" alt="User Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        )}

        {messages.length === 0 && (
          <div ref={promptButtonsRef} className="flex flex-wrap justify-center gap-3 pt-6 max-w-2xl w-full">
            <p className="w-full text-center text-[#101828] dark:text-[#98A2B3] font-space text-sm mb-2">Ask About:</p>
            {promptSuggestions.map((prompt, index) => (
              <Button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-[#101828] dark:text-white dark:border-[#344054] dark:bg-[#252848] dark:hover:bg-[#1d204b] border hover:bg-transparent font-space font-normal border-[#D0D5DD] shadow-none rounded-full px-4 py-2 text-xs sm:text-sm bg-transparent"
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div ref={inputAreaRef} className="relative w-full max-w-3xl mx-auto mt-auto pb-6">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="bg-[#E4E7EC] dark:border-[#344054] dark:bg-white/5 mt-[25px] border border-[#E4E7EC] rounded-xl p-4 shadow-[#0000000A]/5 backdrop-blur-sm">
          <div className="flex gap-2 text-gray-300 mb-2">
            <Image
              src="/chaticon.svg"
              alt="chaticon"
              width={16}
              height={16}
              className="md:-mt-[60px] mt-[-40px] cursor-pointer"
              priority
              sizes="(max-width: 768px) 16px, 16px"
            />
            <Textarea
              className="w-full bg-transparent placeholder:font-space dark:text-white dark:placeholder:text-white text-[#101828] placeholder:text-[#101828] border-none font-space focus-visible:ring-0 focus-visible:ring-offset-0 resize-none outline-none shadow-none min-h-[80px] sm:min-h-[100px]"
              placeholder="Ask whatever you want..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-[#4A5773] dark:text-[#98A2B3] font-space font-normal rounded-full"
                onClick={handleAttachmentClick}
              >
                <LuCirclePlus className="w-4 h-4 mr-2" />
                {attachment ? attachment.name : "Add Attachment"}
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-space text-[#667085] dark:text-[#98A2B3]">{inputValue.length}/1000</span>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white  bg-[#473BF0] hover:bg-[#665cff] p-3 rounded-lg"
                onClick={handleSendMessage}
              >
                <FaArrowRightLong className="w-[24px] text-white h-[24px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
