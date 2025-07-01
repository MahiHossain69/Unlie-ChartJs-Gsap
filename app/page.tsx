'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/screens/myAcc/sideBar';
import Header from '@/components/screens/myAcc/header';
import AccountsList from '@/components/screens/myAcc/AccountsList';
import ContactModal from '@/components/screens/myAcc/contactus';


export default function Dashboard() {
  const [currentUser] = useState({
    name: 'Adam Root',
    avatar: "/adamroot.svg", // Replace with your avatar URL
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [contactModalOpen, setContactModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <section className="container mx-auto">
      <div className="flex h-screen bg-white dark:bg-[#101828] text-slate-900 dark:text-white transition-colors">
        <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onContactClick={() => setContactModalOpen(true)}
      />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            user={currentUser}
            onMenuClick={() => setSidebarOpen(true)}
            onThemeToggle={toggleTheme}
            theme={theme}
          />
          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#11162B] transition-colors duration-300">
            <AccountsList />
          </main>

        </div>
         <ContactModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
      </div>
    </section>
  );
}
