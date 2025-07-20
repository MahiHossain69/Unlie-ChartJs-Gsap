"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { gsap } from "gsap";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

const emotions = [
  { name: "Joy", value: 85, count: "480K", color: "bg-pink-500" },
  { name: "Disgust", value: 35, count: "165K", color: "bg-purple-500", badge: "30K" },
  { name: "Anger", value: 45, count: "220K", color: "bg-red-500" },
  { name: "Surprise", value: 25, count: "95K", color: "bg-orange-500" },
  { name: "Sadness", value: 18, count: "72K", color: "bg-gray-500" },
];

export default function EmotionsCard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const progressRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setProgressRef = (index: number) => (el: HTMLDivElement | null) => {
    progressRefs.current[index] = el;
  };

  useEffect(() => {
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        const bar = ref.querySelector<HTMLElement>("[data-progress-indicator]");
        if (bar) {
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${emotions[index].value}%`,
              duration: 1.5,
              delay: 0.8 + index * 0.1,
              ease: "power3.out",
            }
          );
        }
      }
    });
  }, []);

  return (
    <Card className="bg-white dark:bg-[#101828] dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-col xl:flex-row lg:items-center lg:justify-between gap-3">
        <CardTitle className="text-black dark:text-white text-[15px] font-semibold">
          Emotions
        </CardTitle>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-1">
          {/* Calendar Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-3 bg-slate-800 border-slate-600 text-white text-sm w-full lg:w-auto"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd")
                  )
                ) : (
                  <span>Pick a range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>

          {/* Download Button */}
          <Button
            size="sm"
            variant="outline"
            className="h-10 w-full lg:w-10 p-0 bg-slate-800 border-slate-600 hover:bg-slate-700"
          >
            <Download className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {emotions.map((emotion, index) => (
          <div
            key={emotion.name}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-2"
          >
            <div className="flex flex-1 items-center space-x-3 w-full">
              <span className="text-gray-700 dark:text-gray-300 text-sm w-20 shrink-0">
                {emotion.name}
              </span>
              <div
                ref={setProgressRef(index)}
                className="flex-1 relative"
              >
                <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    data-progress-indicator
                    className={`h-full ${emotion.color} rounded-full relative`}
                    style={{ width: "0%" }}
                  >
                    {emotion.badge && (
                      <div className="absolute -top-6 right-0 bg-black text-white text-xs px-2 py-1 rounded">
                        {emotion.badge}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <span className="text-black dark:text-white font-semibold text-sm text-right w-full lg:w-16">
              {emotion.count}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
