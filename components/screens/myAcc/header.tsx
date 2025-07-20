'use client';

import { useState } from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';
import { MdOutlineSupervisorAccount, MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";



import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface HeaderProps {
  user?: {
    name: string;
    avatar: string;
  };
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
  theme?: 'light' | 'dark';
}

export default function Header({
  user,
  onMenuClick = () => {},
  onThemeToggle = () => {},
  theme = 'light',
}: HeaderProps) {
  const [notifications] = useState(3);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = user?.name || 'Guest';

  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="bg-white dark:bg-[rgba(16,24,40,0.06)] border-b  border-slate-200 dark:border-zinc-700 px-4 sm:px-6 py-3 transition-colors w-full">
      <div className="flex items-center justify-between">
        {/* Left side - menu + greeting */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-600 hover:text-slate-900 dark:text-white"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Greeting */}
          <div className="truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
            <h1 className="text-sm sm:text-base text-slate-900 dark:text-white whitespace-nowrap">
              <span className="font-space hidden sm:inline font-normal text-[16px]">{getGreeting()} - </span>
              <span className="font-bold text-[20px] font-space">{userName}</span>
            </h1>
          </div>
        </div>

        {/* Right side - actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Theme Toggle */}
         <Button
                     variant="ghost"
                     size="icon"
                     className="inline-flex text-slate-600 hover:text-slate-900 dark:text-white"
                     onClick={onThemeToggle}
                     aria-label="Toggle theme"
                   >
                     {theme === 'dark' ? (
                       <MdOutlineWbSunny/>
                     ) : (
                      <IoMoonOutline/>
                     )}
                   </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 hover:text-slate-900 dark:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center leading-none">
                {notifications}
              </span>
            )}
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 sm:px-3 py-1.5 group"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8 rounded-none">
                  <AvatarImage asChild>
                    <Image
                      src="/adamroot.svg"
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </AvatarImage>
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium text-slate-900 dark:text-white truncate max-w-[100px]">
                  {userName}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-600 dark:text-white group-hover:rotate-180 transition-transform" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full rounded-2xl border-[rgba(255,255,255,0.1)] mt-2 space-y-4 px-7 shadow-lg">
              <DropdownMenuItem className="flex items-center gap-2 font-space font-medium text-black">
  <MdOutlineSupervisorAccount className="w-[30px]   rounded-full bg-[#F2F4F7] dark:bg-[rgba(23,29,41,0.1)] text-black dark:text-white  h-[30px]" />
  My Account
</DropdownMenuItem>

<DropdownMenuItem className="flex items-center gap-2 font-space font-medium text-black">
  <IoSettingsOutline className="w-[30px]   rounded-full bg-[#F2F4F7] dark:bg-[rgba(23,29,41,0.1)] text-black dark:text-white  h-[30px]" />
  Settings
</DropdownMenuItem>

<DropdownMenuItem className="flex items-center gap-2 font-space font-medium text-black">
  <LuLogOut className="w-[30px]   rounded-full bg-[#F2F4F7] dark:bg-[rgba(23,29,41,0.1)] text-black dark:text-white  h-[30px]" />
  Log Out
</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
