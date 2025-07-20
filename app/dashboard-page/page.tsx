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
          <main className="flex-1 overflow-y-auto  bg-slate-50 dark:bg-[#11162B] transition-colors duration-300">
            <DashboardContent/>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 py-4 ">
          <div className="dashboard-card">
            <StatisticsCard />
          </div>
          <div className="dashboard-card">
            <EmotionsCard />
          </div>
          <div className="dashboard-card">
            <MainTopicsCard />
          </div>
        </div>

        {/* Middle Row - Mentions, Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6 md:px-8 py-4">
          <div className="dashboard-card">
            <MentionsCard />
          </div>
          <div className="dashboard-card">
            <SentimentCard />
          </div>
        </div>

        {/* Bottom Row - Threat Detection Table */}
        <div className="dashboard-card px-4 sm:px-6 md:px-8 py-4">
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
