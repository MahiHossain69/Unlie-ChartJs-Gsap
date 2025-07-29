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
        label: 'Neutral',
        data: [100, 80, 100, 100, 100, 100, 100],
        backgroundColor: '#5B606A',
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 10,
      },
      {
        label: 'Positive',
        data: [25, 25, 25, 25, 25, 25, 25],
        backgroundColor: '#0CAF60',
        borderRadius: 0,
        barThickness: 10,
      },
      {
        label: 'Negative',
        data: [30, 20, 30, 30, 30, 30, 30],
        backgroundColor: '#F23838',
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 4, bottomRight: 4 },
        barThickness: 10,
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
        padding: 8,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#4A5773',
         font: { family: 'spaceGrotesk', size: 12 },
        },
      },
      y: {
        stacked: true,
        min: 0,
        max: 200,
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          color: '#4A5773',
          font: { family: 'spaceGrotesk', size: 12 },
          stepSize: 50,
        },
      },
    },
  };

  return (
    <Card className="bg-white dark:bg-[#fff]/5 dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="dark:text-white font-space text-black text-[18px] font-semibold">
          Sentiment
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-24 h-8 dark:border-white/30 dark:bg-transparent bg-white font-space border-[#D0D5DD] text-[#4A5773] dark:text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 bg-white border-slate-600">
              <SelectItem value="weekly" className="dark:text-white font-space text-black">
                Weekly
              </SelectItem>
              <SelectItem value="daily" className="dark:text-white font-space text-black">
                Daily
              </SelectItem>
              <SelectItem value="monthly" className="dark:text-white font-space text-black">
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 dark:border-white/30 dark:bg-transparent bg-white border-[#D0D5DD] dark:text-white dark:hover:bg-slate-700"
          >
            <Download className="w-4 h-4 text-[#473BF0] dark:text-[rgb(249,248,255)]" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#5B606A]"></div>
            <span className="text-xs font-space text-[#4A5773] dark:text-white/80">Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#0CAF60]"></div>
            <span className="text-xs font-space text-[#4A5773] dark:text-white/80">Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#F23838]"></div>
            <span className="text-xs font-space text-[#4A5773] dark:text-white/80">Negative</span>
          </div>
        </div>
        <div ref={chartRef} className="h-48 relative">
          <Bar data={data} options={options} />
          
          
        </div>
      </CardContent>
    </Card>
  );
}
