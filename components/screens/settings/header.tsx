"use client";

import { useState } from "react";
import {  ChevronDown } from "lucide-react";
import { MdOutlineSupervisorAccount, MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  user?: {
    name: string;
    avatar: string;
  };
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
  theme?: "light" | "dark";
}

export default function Header({
  user,
  onMenuClick = () => {},
  onThemeToggle = () => {},
  theme = "light",
}: HeaderProps) {
  const [notifications] = useState(3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const userName = user?.name || "Guest";

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="lg:bg-white bg-slate-50 dark:bg-[rgba(16,24,40,0.06)] lg:border-b  border-slate-200 dark:border-zinc-700 px-4 sm:px-6 py-3 transition-colors w-full">
      <div className="flex items-center justify-between">
        {/* Mobile version */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="dark:flex hidden items-center">
            <Image src="/moblogo.svg" alt="Logo" width={77} height={32} />
          </div>
          <div className="flex dark:hidden items-center">
            <Image src="/moblogoblack.svg" alt="Logo" width={77} height={32} />
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center rounded-md bg-[#fff] border border-[#D0D5DD] dark:bg-[#11162B] dark:border-[#282C3F] p-1 gap-1">
              <button
                onClick={() => theme === "dark" && onThemeToggle()}
                className={`rounded-md p-1 ${
                  theme === "light" ? "bg-[#624BFF] text-white" : "text-gray-400"
                }`}
              >
                <MdOutlineWbSunny className="h-5 w-5" />
              </button>
              <button
                onClick={() => theme === "light" && onThemeToggle()}
                className={`rounded-md p-1 ${
                  theme === "dark" ? "bg-[#624BFF] text-white" : "text-gray-400"
                }`}
              >
                <IoMoonOutline className="h-5 w-5" />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
             <Image
                src="/bell.svg"
                alt="Notifications"
                width={32}
                height={32}
                className="h-[32px] drak:hidden block w-[32px]"
              />
             <Image
                src="/darkbell.svg"
                alt="Notifications"
                width={32}
                height={32}
                className="h-[32px] hidden dark:block w-[32px]"
              />
            </button>
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <RiMenu3Fill className="w-5 h-5 text-gray-600 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Desktop version */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="truncate">
              <h1 className="text-base font-space text-[#101828] dark:text-white">
                <span className="font-normal text-sm">{getGreeting()} - </span>
                <span className="font-bold">{userName}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md bg-[#fff] dark:bg-[#11162B] border border-[#D0D5DD] dark:border-[#282C3F] p-1 gap-1">
              <button
                onClick={() => theme === "dark" && onThemeToggle()}
                className={`rounded-md p-1 ${
                  theme === "light" ? "bg-[#624BFF] text-white" : "text-[#667085]"
                }`}
              >
                <MdOutlineWbSunny className="h-5 w-5" />
              </button>
              <button
                onClick={() => theme === "light" && onThemeToggle()}
                className={`rounded-md p-1 ${
                  theme === "dark" ? "bg-[#624BFF] text-white" : "text-gray-400"
                }`}
              >
                <IoMoonOutline className="h-5 w-5" />
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#0A0D14] dark:text-white"
            >
              <Image
                src="/bell.svg"
                alt="Notifications"
                width={32}
                height={32}
                className="h-[32px] dark:hidden block w-[32px]"
              />
             <Image
                src="/darkbell.svg"
                alt="Notifications"
                width={32}
                height={32}
                className="h-[32px] hidden dark:block w-[32px]"
              />
             
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 py-1.5"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage asChild>
                      <Image
                        src= "/john.svg"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </AvatarImage>
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium font-space truncate max-w-[100px] dark:text-white text-[#111723]">
                    {userName}
                  </span>
                  <ChevronDown className="h-4 w-4 text-[#898D97]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 space-y-3 px-4 py-4 border dark:border-white/10 dark:text-[#FFFFFFD9]/95 border-[#E4E7EC] font-space rounded-2xl bg-[#fff] text-[#4A5773] shadow-lg"
              >
                <Link href="/" passHref>
                  <DropdownMenuItem className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                    <span className="p-2 rounded-full bg-[#F2F4F7] dark:bg-[#171D291A]/10">
                      <MdOutlineSupervisorAccount className="w-5 h-5" />
                    </span>
                    My Account
                  </DropdownMenuItem>
                </Link>

                <Link href="/settings-page" passHref>
                  <DropdownMenuItem className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                    <span className="p-2 rounded-full bg-[#F2F4F7] dark:bg-[#171D291A]/10">
                      <IoSettingsOutline className="w-5 h-5" />
                    </span>
                    Settings
                  </DropdownMenuItem>
                </Link>

                 <Link href="/" passHref>
                 <DropdownMenuItem className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                  <span className="p-2 rounded-full bg-[#F2F4F7] dark:bg-[#171D291A]/10">
                    <LuLogOut className="w-5 h-5" />
                  </span>
                  Log Out
                </DropdownMenuItem>
                 </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}