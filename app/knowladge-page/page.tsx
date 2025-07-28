'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/screens/knowladge/sideBar';
import Header from '@/components/screens/knowladge/header';
import KnowladgeHeader from '@/components/screens/knowladge/knowladgeHeader';
import ContactModal from '@/components/screens/knowladge/contactus';
import KnowledgeBaseAccordion from '@/components/screens/knowladge/knowledgeBaseAccordion';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [currentUser] = useState({
    name: 'Adam Root',
    avatar: "/adamroot.svg",
  });

  // Load theme on initial mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  // Toggle theme mode and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <section className="w-full min-h-screen">
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
          <main className="flex-1 overflow-y-auto bg-[#e4e7ef] dark:bg-[rgb(7,12,32)] transition-colors duration-300">
            <KnowladgeHeader/>

            <div className="p-4 sm:p-6 ">
                <KnowledgeBaseAccordion/>

            </div>
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
