"use client";

import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
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
    <header className="lg:bg-white bg-slate-50 dark:bg-[#11162B] border-slate-200 dark:border-white/10 px-4 sm:px-6 py-3 transition-colors w-full">
      <div className="flex items-center justify-between">
        {/* Mobile */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div className="dark:flex hidden items-center">
            <Link href="/" passHref>
              <Image src="/moblogo.svg" alt="Logo" width={77} height={32} />
              </Link>
          </div>
          <div className="flex dark:hidden items-center">
            <Link href="/" passHref>
            <Image src="/moblogoblack.svg" alt="Logo" width={77} height={32} />
            </Link>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-[#0A0D14] dark:text-white">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[230px] mt-2 space-y-3 px-4 py-4 border dark:border-white/10 dark:text-white border-[#E4E7EC] font-space rounded-2xl bg-white dark:bg-[#282C3F] shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-[#F9FAFB] dark:bg-[#282C3F]">
                    <Image src="/onlybell.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 dark:hidden block" />
                    <Image src="/onlybelldark.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 hidden dark:block" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A5773] dark:text-white">John Due</p>
                    <p className="text-xs text-[#98A2B3] dark:text-[#98A2B3]">3 New Insights</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-[#F9FAFB] dark:bg-[#282C3F]">
                    <Image src="/onlybell.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 dark:hidden block" />
                    <Image src="/onlybelldark.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 hidden dark:block" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A5773] dark:text-white">Albert Flores</p>
                    <p className="text-xs text-[#98A2B3] dark:text-[#98A2B3]">2 Elements to Review</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <RiMenu3Fill className="w-5 h-5 text-gray-600 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Desktop */}
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
                className={`rounded-md p-1 ${theme === "light" ? "bg-[#624BFF] text-white" : "text-[#667085]"}`}
              >
                <MdOutlineWbSunny className="h-5 w-5" />
              </button>
              <button
                onClick={() => theme === "light" && onThemeToggle()}
                className={`rounded-md p-1 ${theme === "dark" ? "bg-[#624BFF] text-white" : "text-gray-400"}`}
              >
                <IoMoonOutline className="h-5 w-5" />
              </button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-[#0A0D14] dark:text-white hover:bg-muted/50">
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
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[230px] mt-2 space-y-3 px-4 py-4 border dark:border-white/10 dark:text-white border-[#E4E7EC] font-space rounded-2xl bg-white dark:bg-[#282C3F] shadow-xl"
              >
                 <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-[#F9FAFB] dark:bg-[#282C3F]">
                    <Image src="/onlybell.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 dark:hidden block" />
                    <Image src="/onlybelldark.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 hidden dark:block" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A5773] dark:text-white">John Due</p>
                    <p className="text-xs text-[#98A2B3] dark:text-[#98A2B3]">3 New Insights</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full p-2 bg-[#F9FAFB] dark:bg-[#282C3F]">
                    <Image src="/onlybell.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 dark:hidden block" />
                    <Image src="/onlybelldark.svg" alt="Bell Icon" width={18} height={17} className="opacity-70 hidden dark:block" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4A5773] dark:text-white">Albert Flores</p>
                    <p className="text-xs text-[#98A2B3] dark:text-[#98A2B3]">2 Elements to Review</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 py-1.5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage asChild>
                      <Image src={user?.avatar || "/adamroot.svg"} alt="User Avatar" width={32} height={32} className="rounded-full" />
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
                <Link href="/">
                  <DropdownMenuItem className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                    <span className="p-2 rounded-full bg-[#F2F4F7] dark:bg-[#171D291A]/10">
                      <MdOutlineSupervisorAccount className="w-5 h-5" />
                    </span>
                    My Account
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings-page">
                  <DropdownMenuItem className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                    <span className="p-2 rounded-full bg-[#F2F4F7] dark:bg-[#171D291A]/10">
                      <IoSettingsOutline className="w-5 h-5" />
                    </span>
                    Settings
                  </DropdownMenuItem>
                </Link>
                <Link href="/">
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