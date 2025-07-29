"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { gsap } from 'gsap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatisticsCard() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  const data: ChartData<'bar'> = {
    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16'],
    datasets: [
      {
        label: 'High Risk',
        data: [20, 10, 20, 30, 25, 15, 20],
        backgroundColor: '#F23838',
        borderRadius: 6,
        stack: 'stack1',
      },
      {
        label: 'Medium Risk',
        data: [10, 5, 10, 10, 15, 5, 10],
        backgroundColor: '#E38604',
        borderRadius: 6,
        stack: 'stack1',
      },
      {
        label: 'Low Risk',
        data: [30, 25, 30, 20, 35, 25, 30],
        backgroundColor: '#0CAF60',
        borderRadius: 6,
        stack: 'stack1',
      },
      {
        label: 'Mitigated Risk',
        data: [25, 15, 20, 20, 35, 15, 20],
        backgroundColor: '#665CF3',
        borderRadius: 6,
        stack: 'stack2',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#111827',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        bodyFont: { family: 'spaceGrotesk', size: 12 },
        callbacks: {
          label: function (tooltipItem: TooltipItem<'bar'>) {
            return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
        padding: 8,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          color: '#6B7280',
          font: { family: 'spaceGrotesk', size: 12 },
        },
      },
      y: {
        stacked: true,
        grid: { color: '#E5E7EB' },
        ticks: {
          color: '#6B7280',
          font: { family: 'spaceGrotesk', size: 12 },
          stepSize: 20,
        },
        max: 80,
      },
    },
  };

  return (
    <Card className="bg-white dark:bg-[#fff]/5 dark:border-slate-700 shadow-sm  border rounded-xl">
      <CardHeader className="flex flex-row items-center mt-4 justify-between px-5">
        <CardTitle className="dark:text-white font-space text-black text-[18px] font-semibold">
          Statistic
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-24 h-8 dark:bg-transparent dark:border-[#FFF]/30 bg-white font-space border-[#D0D5DD] text-[#4A5773] dark:text-white text-sm">
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
            className="h-8 w-8 p-0 dark:bg-transparent bg-white border-[#D0D5DD] dark:border-white/30 dark:text-white dark:hover:bg-slate-700"
          >
            <Download className="w-4 h-4 text-[#473BF0] dark:text-[rgb(249,248,255)]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-6 px-5">
        {/* Legend */}
        <div className="flex font-space font-normal  items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#F23838]" />
            <span className="text-[10px] text-gray-500 dark:text-white/80">High Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#E38604]" />
            <span className="text-[10px] text-gray-500 dark:text-white/80">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#0CAF60]" />
            <span className="text-[10px] text-gray-500 dark:text-white/80">Low Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-[#665CF3]" />
            <span className="text-[10px] text-gray-500 dark:text-white/80">Mitigated Risk</span>
          </div>
        </div>

        {/* Chart */}
        <div ref={chartRef} className="h-52 sm:h-56 md:h-60">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
