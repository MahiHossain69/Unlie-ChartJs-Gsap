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

export default function SentimentCard() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.9, ease: 'power3.out' }
      );
    }
  }, []);

  const data = {
    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16'],
    datasets: [
      {
        label: 'Negative',
        data: [40, 35, 30, 25, 30, 35, 40],
        backgroundColor: '#ef4444',
        borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 },
      },
      {
        label: 'Positive',
        data: [80, 90, 100, 120, 110, 100, 90],
        backgroundColor: '#22c55e',
        borderRadius: 0,
      },
      {
        label: 'Neutral',
        data: [60, 55, 50, 45, 50, 55, 60],
        backgroundColor: '#64748b',
        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 4, bottomRight: 4 },
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
        <CardTitle className="text-white text-lg font-semibold">Sentiment</CardTitle>
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
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <span className="text-xs text-gray-400">Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-400">Negative</span>
          </div>
        </div>
        <div ref={chartRef} className="h-48 relative">
          <Bar data={data} options={options} />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
            Jan 13
          </div>
          <div className="absolute top-4 right-4 bg-black text-white text-xs px-2 py-1 rounded">
            +105 +155
          </div>
        </div>
      </CardContent>
    </Card>
  );
}