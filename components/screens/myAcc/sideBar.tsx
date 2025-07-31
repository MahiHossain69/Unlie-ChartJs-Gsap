"use client";

import { usePathname } from "next/navigation";
import { Users, Settings, X } from "lucide-react";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onContactClick,
}: SidebarProps) {
  const pathname = usePathname(); 

  const navigation = [
    {
      name: "My Accounts",
      icon: Users,
      href: "/",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings-page",
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
        <div className="p-6 lg:block hidden border-b border-slate-700">
          <Image src={Logo} alt="Unlie Logo" width={218} height={39} priority />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map(({ name, icon: Icon, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-2 mt-[40px] lg:mt-0 font-space px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                )}
              >
               <Icon className="w-8 h-8 p-1.5 rounded-full bg-white/10 text-white" />
                {name}
              </Link>
            );
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
  );
}
