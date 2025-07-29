"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MentionsCard() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  const data: ChartData<"line"> = {
    labels: ["Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", "Jan 16"],
    datasets: [
      {
        label: "YouTube",
        data: [15, 25, 32, 18, 25, 20, 12],
        borderColor: "#F23838",
        backgroundColor: "#F23838",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "Facebook",
        data: [25, 35, 38, 30, 40, 32, 47],
        borderColor: "#1C89F6",
        backgroundColor: "#1C89F6",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "X",
        data: [30, 65, 60, 55, 63, 63, 30],
        borderColor: "#E38604",
        backgroundColor: "#E38604",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "TikTok",
        data: [50, 45, 50, 45, 55, 52, 68],
        borderColor: "#0CAF60",
        backgroundColor: "#0CAF60",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "Instagram",
        data: [75, 58, 70, 55, 78, 65, 76],
        borderColor: "#FE16D4",
        backgroundColor: "#FE16D4",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          color: "#4A5773",
          font: {
            family: "spaceGrotesk",
            size: 12,
          },
          padding: 8,
        },
      },
      y: {
        min: 0,
        max: 80,
        ticks: {
          stepSize: 20,
          color: "#4A5773",
          font: {
            family: "spaceGrotesk",
            size: 12,
          },
          padding: 8,
        },
        grid: {
         
          color: "#D1D5DB",
         
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <Card className="bg-white dark:bg-[#fff]/5 dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="dark:text-white font-space text-black text-[18px] font-semibold">
          Mentions
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-24 h-8 dark:bg-transparent dark:border-white/30 bg-white font-space border-[#D0D5DD] text-[#4A5773] dark:text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 bg-white border-slate-600">
              <SelectItem
                value="weekly"
                className="dark:text-white font-space text-black"
              >
                Weekly
              </SelectItem>
              <SelectItem
                value="daily"
                className="dark:text-white font-space text-black"
              >
                Daily
              </SelectItem>
              <SelectItem
                value="monthly"
                className="dark:text-white font-space text-black"
              >
                Monthly
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 dark:bg-transparent dark:border-white/30 bg-white border-[#D0D5DD] dark:text-white dark:hover:bg-slate-700"
          >
            <Download className="w-4 h-4 text-[#473BF0] dark:text-[rgb(249,248,255)]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-6 text-[#4A5773] dark:text-white">
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
          {[
            { label: "YouTube", color: "bg-[#F23838]" },
            { label: "Facebook", color: "bg-[#1C89F6]" },
            { label: "X", color: "bg-[#E38604]" },
            { label: "TikTok", color: "bg-[#0CAF60]" },
            { label: "Instagram", color: "bg-[#FE16D4]" },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="font-space text-[12px] font-normal text-[#4A5773] dark:text-white/80 leading-none">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div ref={chartRef} className="h-48 relative">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
