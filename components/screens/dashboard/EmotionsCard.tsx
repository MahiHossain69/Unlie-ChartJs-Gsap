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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";

const emotions = [
  { name: "Joy", value: 95, count: "480K", color: "#FD27E0" },
  { name: "Disgust", value: 65, count: "185K", color: "#665CF3", badge: "120K" },
  { name: "Anger", value: 50, count: "220K", color: "#F23838" },
  { name: "Surprise", value: 30, count: "95K", color: "#E38604" },
  { name: "Sadness", value: 20, count: "72K", color: "#8D8D8D" },
];

export default function EmotionsCard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-01-10"),
    to: new Date("2025-01-16"),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const progressRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setProgressRef = (index: number) => (el: HTMLDivElement | null) => {
    progressRefs.current[index] = el;
  };

  useEffect(() => {
    // Animate progress bars on mount
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        const bar = ref.querySelector<HTMLElement>("[data-progress-indicator]");
        if (bar) {
          // Simple animation without gsap
          setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = `${emotions[index].value}%`;
          }, 100 + index * 100);
        }
      }
    });
  }, []);

  return (
    <Card className="bg-white dark:bg-[#101828] dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center mt-4 justify-between p-6 pb-4">
        <CardTitle className="text-gray-900 dark:text-white font-space font-semibold text-xl">
          Emotions
        </CardTitle>
        <div className="flex items-center font-space gap-2">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-9 px-3 text-sm text-[#4A5773]  font-spacetext-[#4A5773] sm:text-sm dark:bg-slate-800 bg-white border-[#D0D5DD]  dark:text-white"
              >
                <CalendarIcon className="w-4 h-4 mr-2 dark:text-white  text-gray-600" />
                Jan 10 - Jan 16
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white dark:bg-black border border-gray-200 rounded-xl shadow-lg p-4 w-80">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={1}
                className="rounded-lg"
              />
              <div className="flex justify-between items-center mt-4 gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border border-gray-300 dark:text-white dark:hover:bg-slate-700 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setCalendarOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  onClick={() => setCalendarOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            size="sm"
            variant="outline"
            className="h-9 w-9 p-0 dark:bg-slate-800 bg-white border-[#D0D5DD]  dark:text-white dark:hover:bg-slate-700"
          >
            <Download className="w-4 h-4 text-[#473BF0]" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-6 cursor-pointer pb-6 space-y-6">
        {emotions.map((emotion, index) => (
          <div key={emotion.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="dark:text-white/80 text-[#4A5773] font-space text-sm font-normal">
                {emotion.name}
              </span>
              <span className="dark:text-white text-black font-space font-semibold text-sm">
                {emotion.count}
              </span>
            </div>
            
            <div ref={setProgressRef(index)} className="relative">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  data-progress-indicator
                  className="h-full rounded-full relative transition-all duration-1000 ease-out"
                  style={{ 
                    width: "0%",
                    backgroundColor: emotion.color
                  }}
                >
                  {emotion.badge && (
                    <div className="absolute -top-10 right-0 transform translate-x-1/2">
                      <div className="bg-black text-white text-xs px-2 py-1 rounded font-medium whitespace-nowrap">
                        {emotion.badge}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}