"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { gsap } from 'gsap';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatisticsCard() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  const data = {
    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16'],
    datasets: [
      {
        label: 'High Risk',
        data: [30, 15, 25, 35, 20, 30, 25],
        backgroundColor: '#ef4444',
        borderRadius: 4,
      },
      {
        label: 'Medium Risk',
        data: [20, 25, 30, 25, 35, 25, 30],
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
      {
        label: 'Low Risk',
        data: [25, 35, 30, 25, 20, 35, 40],
        backgroundColor: '#10b981',
        borderRadius: 4,
      },
      {
        label: 'Mitigated Risk',
        data: [15, 25, 15, 20, 25, 15, 20],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
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
    },
    scales: {
      x: {
        stacked: true,
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
        stacked: true,
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
  };

  return (
    <Card className="bg-white dark:bg-[#101828] dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg font-semibold">Statistic</CardTitle>
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
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-400">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-400">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Low Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-400">Mitigated Risk</span>
          </div>
        </div>
        <div ref={chartRef} className="h-48">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}