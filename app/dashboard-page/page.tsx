'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/screens/dashboard/sidebar';
import Header from '@/components/screens/myAcc/header';
import DashboardContent from '@/components/screens/dashboard/dashboardHeader';

import ContactModal from '@/components/screens/dashboard/contactus';
import StatisticsCard from '@/components/screens/dashboard/StatisticsCard';
import EmotionsCard from '@/components/screens/dashboard/EmotionsCard';
import MainTopicsCard from '@/components/screens/dashboard/MainTopicsCard';
import MentionsCard from '@/components/screens/dashboard/MentionsCard';
import SentimentCard from '@/components/screens/dashboard/SentimentCard';
import ThreatDetectionTable from '@/components/screens/dashboard/ThreatDetectionTable';

export default function Dashboard() {
  const [currentUser] = useState({
    name: 'Adam Root',
    avatar: "/adamroot.svg",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <section className="w-full min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#101828] text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* Sidebar - responsive for small screens */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onContactClick={() => setContactModalOpen(true)}
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            user={currentUser}
            onMenuClick={() => setSidebarOpen(true)}
            onThemeToggle={toggleTheme}
            theme={theme}
          />

          <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#11162B] transition-colors duration-300">
            <DashboardContent />

            {/* Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 py-4">
              <StatisticsCard />
              <EmotionsCard />
              <MainTopicsCard />
            </div>

            {/* Middle Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 md:px-8 py-4">
              <MentionsCard />
              <SentimentCard />
            </div>

            {/* Bottom Row */}
            <div className="px-4 sm:px-6 md:px-8 py-4">
              <ThreatDetectionTable />
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
