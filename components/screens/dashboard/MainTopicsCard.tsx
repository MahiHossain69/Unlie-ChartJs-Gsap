"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';

const topics = [
  { name: 'Trump', color: 'bg-emerald-500 text-white' },
  { name: 'Apple', color: 'bg-slate-600 text-gray-300' },
  { name: 'Amazon', color: 'bg-emerald-500 text-white' },
  { name: 'BYD', color: 'bg-slate-600 text-gray-300' },
  { name: 'Delaware', color: 'bg-red-500 text-white' },
  { name: 'Tesla', color: 'bg-slate-600 text-gray-300' },
  { name: 'Semiconductors', color: 'bg-red-500 text-white' },
  { name: 'Green Energy', color: 'bg-slate-600 text-gray-300' },
  { name: 'SpaceX', color: 'bg-slate-600 text-gray-300' },
  { name: 'Bitcoin', color: 'bg-emerald-500 text-white' },
  { name: 'Electric Vehicles', color: 'bg-red-500 text-white' },
  { name: 'Lucid Motors', color: 'bg-slate-600 text-gray-300' },
  { name: 'Universal Studios', color: 'bg-emerald-500 text-white' },
  { name: 'Bitcoin', color: 'bg-slate-600 text-gray-300' },
  { name: 'Binance', color: 'bg-slate-600 text-gray-300' },
  { name: 'Shopify', color: 'bg-red-500 text-white' },
  { name: 'Bitcoin', color: 'bg-slate-600 text-gray-300' },
  { name: 'Ethereum', color: 'bg-emerald-500 text-white' },
  { name: 'Netflix', color: 'bg-red-500 text-white' },
  { name: 'Alibaba', color: 'bg-slate-600 text-gray-300' },
  { name: 'Netflix', color: 'bg-slate-600 text-gray-300' },
];

export default function MainTopicsCard() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <Card className="bg-white dark:bg-[#101828] dark:border-slate-700 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg font-semibold">Main Topics</CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue="jan10-jan16">
            <SelectTrigger className="w-32 h-8 bg-slate-800 border-slate-600 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="jan10-jan16" className="text-white">Jan 10 - Jan 16</SelectItem>
              <SelectItem value="jan17-jan23" className="text-white">Jan 17 - Jan 23</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-slate-800 border-slate-600 hover:bg-slate-700">
            <Download className="w-3 h-3 text-gray-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <Badge 
              key={`${topic.name}-${index}`}
              className={`topic-badge ${topic.color} px-3 py-1 text-xs font-medium hover:scale-105 transition-transform cursor-pointer`}
            >
              {topic.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}