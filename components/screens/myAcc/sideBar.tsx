'use client';

import { Users, Settings, MessageCircle, X } from 'lucide-react';
import { RiDashboardLine } from "react-icons/ri";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Logo from "@/public/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export default function Sidebar({ isOpen, onClose, onContactClick }: SidebarProps) {
  const navigation = [
   
    {
      name: 'My Accounts',
      icon: Users,
      current: true,
    },
    {
      name: 'Settings',
      icon: Settings,
      current: false,
    },
     {
      name: 'Dashboard',
      icon: RiDashboardLine,
      current: false,
    },
    {
      name: 'Knowledge Base',
      icon: Settings,
      current: false,
    },
    {
      name: 'Ask the Avatar',
      icon: Settings,
      current: false,
    },
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleContactClick = () => {
    onContactClick();
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#101828] border border-white/10 text-white flex flex-col transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:inset-0"
        )}
      >
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Image
              src={Logo}
              alt="Unlie Logo"
              width={218}
              height={39}
              priority
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                onClick={handleNavClick}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  item.current
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Contact Us */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleContactClick}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <MessageCircle className="mr-3 h-5 w-5 flex-shrink-0" />
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
}
