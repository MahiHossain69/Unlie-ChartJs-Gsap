"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { gsap } from 'gsap';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SentimentCard() {
  const chartRef = useRef(null);

  const data: ChartData<'bar'> = {
    labels: ['Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16'],
    datasets: [
      {
        label: 'Neutral',
        data: [100, 80, 100, 100, 100, 100, 100],
        backgroundColor: '#98A2B3',
        borderRadius: { topLeft: 4, topRight: 4 },
        barThickness: 10,
      },
      {
        label: 'Positive',
        data: [25, 25, 25, 25, 25, 25, 25],
        backgroundColor: '#0CAF60',
         borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10  },
        barThickness: 10,
      },
      {
        label: 'Negative',
        data: [30, 20, 30, 30, 30, 30, 30],
        backgroundColor: '#F23838',
        borderRadius: { topLeft: 10, topRight: 10, bottomLeft: 10, bottomRight: 10 },
        barThickness: 10,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: (context) => {
          const { chart, tooltip } = context;
          let tooltipEl = chart.canvas.parentNode?.querySelector(
            'div.chart-tooltip'
          ) as HTMLDivElement;

          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.className = 'chart-tooltip';
            tooltipEl.style.cssText = `
              position: absolute;
              background: #000;
              color: #fff;
              border-radius: 8px;
              padding: 8px 12px;
              font-family: spaceGrotesk, sans-serif;
              font-size: 12px;
              pointer-events: none;
              opacity: 0;
              transition: all 0.3s ease;
              box-shadow: 0 6px 20px rgba(0,0,0,0.15);
              z-index: 9999;
              display: flex;
              flex-direction: column;
              align-items: center;
              white-space: nowrap;
            `;
            chart.canvas.parentNode?.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0 || !tooltip.dataPoints?.length) {
            tooltipEl.style.opacity = '0';
            return;
          }

          const index = tooltip.dataPoints[0].dataIndex;
          const title = chart.data.labels?.[index] || '';

          const colorsMap: Record<string, string> = {
            'Positive': '#0CAF60',
            'Negative': '#F23838',
            'Neutral': '#98A2B3',
          };
          
          const activeValues = chart.data.datasets
            .filter((ds) => ['Positive', 'Negative', 'Neutral'].includes(ds.label || ''))
            .sort((a, b) => {
                // Sort to match the order in the image (Negative, Neutral, Positive) or a preferred order
                const order = ['Negative', 'Neutral', 'Positive'];
                return order.indexOf(a.label as string) - order.indexOf(b.label as string);
            })
            .map((ds) => {
              const value = ds.data[index] ?? '';
              const color = colorsMap[ds.label as string] ?? '#ccc';
              return `
                <div style="display:flex; align-items:center; gap:4px;">
                  <div style="width:8px;height:8px;border-radius:50%;background:${color}"></div>
                  <span style="font-weight: 600;">${value}</span>
                </div>
              `;
            })
            .join('<div style="width:12px;"></div>'); // Add a separator div for spacing

          tooltipEl.innerHTML = `
            <div style="text-align: center; font-weight: 600; color: #E5E7EB; margin-bottom: 8px; ">${title}</div>
            <div style="display: flex; align-items: center;">
              ${activeValues}
            </div>
          `;

          const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
          tooltipEl.style.opacity = '1';
          tooltipEl.style.left =
            positionX + tooltip.caretX - tooltipEl.offsetWidth / 2 + 'px';
          tooltipEl.style.top =
            positionY + tooltip.caretY - tooltipEl.offsetHeight - 8 + 'px';
        },
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
        min: 0,
        max: 200,
        grid: { color: '#E5E7EB' },
        ticks: {
          color: '#6B7280',
          font: { family: 'spaceGrotesk', size: 12 },
          stepSize: 50,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.9, ease: 'power3.out' }
      );
    }
  }, []);

  const handleDownload = () => {
    const labels = data.labels as string[];
    const datasets = data.datasets;

    // CSV Header
    let csv = 'Date,Neutral,Positive,Negative\n';

    for (let i = 0; i < labels.length; i++) {
      const row = [
        labels[i],
        datasets[0]?.data[i] ?? '',
        datasets[1]?.data[i] ?? '',
        datasets[2]?.data[i] ?? '',
      ];
      csv += row.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white dark:bg-[#fff]/5 dark:border-white/10 backdrop-blur-sm">
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
              <SelectItem value="weekly" className="dark:text-white font-space text-black">Weekly</SelectItem>
              <SelectItem value="daily" className="dark:text-white font-space text-black">Daily</SelectItem>
              <SelectItem value="monthly" className="dark:text-white font-space text-black">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            className="h-8 w-8 p-0 dark:border-white/30 dark:bg-transparent bg-white border-[#D0D5DD] dark:text-white dark:hover:bg-slate-700"
          >
            <Download className="w-4 h-4 text-[#473BF0] dark:text-[rgb(249,248,255)]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#98A2B3]" />
            <span className="text-xs font-space text-[#4A5773] dark:text-white/80">Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#0CAF60]" />
            <span className="text-xs font-space text-[#4A5773] dark:text-white/80">Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#F23838]" />
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