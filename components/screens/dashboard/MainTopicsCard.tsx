"use client";

import { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { Calendar as CalendarIcon, Download } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { DateRange } from 'react-day-picker';

const topics = [
  { name: 'Trump', color: 'text-[#0CAF60]', fontWeight: 'font-bold',fontSize: 'text-[16px]', fontFamily: 'font-space' },
  { name: 'Apple', color: 'text-[#4A5773]', fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space'},
  { name: 'Amazon', color: 'text-[#0CAF60]',fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space' },
  { name: 'BYD', color: 'text-[#0CAF60]', fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space' },
  { name: 'Delaware', color: 'text-[#F23838]',fontWeight: 'font-bold',fontSize: 'text-[20px]', fontFamily: 'font-space' },
  { name: 'Tesla', color: 'text-[#4A5773]',fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
  { name: 'Semiconductors', color: 'text-[#F23838]',fontWeight: 'font-bold',fontSize: 'text-[20px]', fontFamily: 'font-space' },
  { name: 'Green Energy', color: 'text-[#4A5773]',fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
  { name: 'SpaceX', color: 'text-[#4A5773]',fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
  { name: 'Bitcoin', color: 'text-[#0CAF60]',fontWeight: 'font-bold',fontSize: 'text-[20px]', fontFamily: 'font-space' },
  { name: 'Electric Vehicles', color: 'text-[#F23838]',fontWeight: 'font-bold',fontSize: 'text-[20px]', fontFamily: 'font-space' },
  { name: 'Lucid Motors', color: 'text-[#0CAF60]',fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
  { name: 'Universal Studios', color: 'text-[#0CAF60]',fontWeight: 'font-bold',fontSize: 'text-[20px]', fontFamily: 'font-space' },
  { name: 'Bitcoin', color: 'text-[#4A5773]',fontWeight: 'font-medium',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
  { name: 'Binance', color: 'text-[#0CAF60]',fontWeight: 'font-normal',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
  { name: 'Shopify', color: 'text-[#F23838]',fontWeight: 'font-bold',fontSize: 'text-[18px]', fontFamily: 'font-space' },
  { name: 'Bitcoin', color: 'text-[#4A5773]',fontWeight: 'font-medium',fontSize: 'text-[14px]', fontFamily: 'font-space'  },
 
];

export default function MainTopicsCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const badges = containerRef.current.querySelectorAll('.topic-badge');
      gsap.fromTo(
        badges,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.8,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, []);

  return (
    <Card className="bg-white dark:bg-[#101828]  dark:border-slate-700 backdrop-blur-sm w-full max-w-full sm:max-w-[100%] ">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center mt-4 justify-between gap-4">
        <CardTitle className="dark:text-white font-space text-black text-base sm:text-lg font-semibold">
          Main Topics
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

      <CardContent>
        <div
          ref={containerRef}
          className="flex flex-wrap gap-2 max-h-[200px] sm:max-h-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 pr-1"
        >
          {topics.map((topic, index) => (
            <Badge
              key={`${topic.name}-${index}`}
              className={`topic-badge ${topic.color} ${topic.fontWeight ?? ''} ${topic.fontSize ?? 'text-xs'} ${topic.fontFamily ?? 'font-sans'} px-3 py-1  bg-transparent hover:scale-105 shadow-none hover:bg-transparent transition-transform cursor-pointer`}

            >
              {topic.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
