"use client";

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function StatisticsCard() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const data: ChartData<"bar"> = {
    labels: ["Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", "Jan 16"],
    datasets: [
      {
        label: "High Risk",
        data: [20, 10, 20, 30, 25, 15, 20],
        backgroundColor: "#F23838",
        borderRadius: 6,
        stack: "stack1",
      },
      {
        label: "Medium Risk",
        data: [10, 5, 10, 10, 15, 5, 10],
        backgroundColor: "#E38604",
        borderRadius: 6,
        stack: "stack1",
      },
      {
        label: "Low Risk",
        data: [30, 25, 30, 20, 35, 25, 30],
        backgroundColor: "#0CAF60",
        borderRadius: 6,
        stack: "stack1",
      },
      {
        label: "Mitigated Risk",
        data: [25, 15, 20, 20, 35, 15, 20],
        backgroundColor: "#665CF3",
        borderRadius: 6,
        stack: "stack2",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: (context) => {
          // Custom tooltip handler
          const { chart, tooltip } = context;
          let tooltipEl = chart.canvas.parentNode?.querySelector(
            "div.chart-tooltip"
          ) as HTMLDivElement;

          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.className = "chart-tooltip";
            tooltipEl.style.cssText = `
              position: absolute;
              background: #111827;
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
            `;
            chart.canvas.parentNode?.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          const title = tooltip.title[0];
          const bodyLines = tooltip.body
            .map((b, i) => {
              const color = tooltip.labelColors[i].backgroundColor;
              const value = b.lines[0].split(": ")[1];
              return `<div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                        <div style="width:8px;height:8px;border-radius:50%;background:${color}"></div>
                        <span>${value}</span>
                      </div>`;
            })
            .join("");

          tooltipEl.innerHTML = `
            <div style="text-align:center; font-weight:600; margin-bottom:6px;">${title}</div>
            ${bodyLines}
          `;

          const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
          tooltipEl.style.opacity = "1";
          tooltipEl.style.left =
            positionX + tooltip.caretX - tooltipEl.offsetWidth / 2 + "px";
          tooltipEl.style.top =
            positionY + tooltip.caretY - tooltipEl.offsetHeight - 8 + "px";
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: { family: "spaceGrotesk", size: 12 },
        },
      },
      y: {
        stacked: true,
        grid: { color: "#E5E7EB" },
        ticks: {
          color: "#6B7280",
          font: { family: "spaceGrotesk", size: 12 },
          stepSize: 20,
        },
        max: 80,
      },
    },
  };

  // Convert chart data to CSV string
  function convertDataToCSV() {
    const labels = data.labels as string[];
    const datasets = data.datasets;

    // Header row
    let csv = "Date," + datasets.map((ds) => ds.label).join(",") + "\n";

    // Each row per label
    labels.forEach((label, idx) => {
      const row = [label];
      datasets.forEach((ds) => {
        row.push(toString());
      });
      csv += row.join(",") + "\n";
    });

    return csv;
  }

  // Trigger CSV download
  function handleDownload() {
    const csv = convertDataToCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "statistics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="bg-white dark:bg-[#fff]/5 dark:border-white/10 shadow-sm border rounded-xl relative">
      <CardHeader className="flex flex-row items-center mt-4 justify-between px-5">
        <CardTitle className="dark:text-white font-space text-black text-[20px] font-bold">
          Statistic
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-24 h-8 dark:bg-transparent dark:border-[#FFF]/30 bg-white font-medium text-[14px] font-space border-[#D0D5DD] text-[#4A5773] dark:text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 bg-white border-slate-600">
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 dark:bg-transparent bg-white border-[#D0D5DD] dark:border-white/30 dark:text-white dark:hover:bg-slate-700"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 text-[#473BF0] dark:text-[rgb(249,248,255)]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-6 px-5">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 font-space font-normal items-center mb-4">
          {[
            { color: "#F23838", label: "High Risk" },
            { color: "#E38604", label: "Medium Risk" },
            { color: "#0CAF60", label: "Low Risk" },
            { color: "#665CF3", label: "Mitigated Risk" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[12px] text-gray-500 dark:text-white/80">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div ref={chartRef} className="h-52 sm:h-56 md:h-60 relative">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
