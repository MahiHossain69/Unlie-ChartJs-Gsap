"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { gsap } from 'gsap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MentionsCard() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.7, ease: 'power3.out' }
      );
    }
  }, []);

  const data = {
    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16'],
    datasets: [
      {
        label: 'YouTube',
        data: [75, 65, 70, 60, 55, 50, 45],
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Facebook',
        data: [35, 45, 50, 55, 60, 65, 70],
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'X',
        data: [50, 60, 55, 45, 50, 55, 60],
        borderColor: '#22c55e',
        backgroundColor: '#22c55e',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'TikTok',
        data: [45, 50, 55, 60, 65, 70, 75],
        borderColor: '#f59e0b',
        backgroundColor: '#f59e0b',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Instagram',
        data: [60, 70, 75, 80, 75, 70, 80],
        borderColor: '#ec4899',
        backgroundColor: '#ec4899',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <Card className="bg-white dark:bg-[#101828] dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg font-semibold">Mentions</CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-24 h-8 bg-slate-800 border-slate-600 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="weekly" className="text-white">Weekly</SelectItem>
              <SelectItem value="daily" className="text-white">Daily</SelectItem>
              <SelectItem value="monthly" className="text-white">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-slate-800 border-slate-600 hover:bg-slate-700">
            <Download className="w-3 h-3 text-gray-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-center space-x-4 mb-4 flex-wrap gap-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-400">YouTube</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-400">Facebook</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">X</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-400">TikTok</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span className="text-xs text-gray-400">Instagram</span>
          </div>
        </div>
        <div ref={chartRef} className="h-48 relative">
          <Line data={data} options={options} />
          <div className="absolute top-4 left-4 bg-black text-white text-xs px-2 py-1 rounded">
            -45
          </div>
        </div>
      </CardContent>
    </Card>
  );
}