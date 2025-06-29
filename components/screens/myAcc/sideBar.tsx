'use client';

import { Users, Settings, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from "@/public/logo.png" 
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#101828] border border-white/10 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
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
                />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  item.current
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                )}
                onClick={() => {
                  // Close sidebar on mobile when navigation item is clicked
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Contact Us */}
        <div className="p-4 border-t border-slate-700">
          <a
            href="#"
            className="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            onClick={() => {
              // Close sidebar on mobile when contact is clicked
              if (window.innerWidth < 1024) {
                onClose();
              }
            }}
          >
            <MessageCircle className="mr-3 h-5 w-5 flex-shrink-0" />
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
}