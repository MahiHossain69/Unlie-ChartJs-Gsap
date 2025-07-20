"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { gsap } from "gsap";

const threats = [
  {
    id: "123456",
    threatType: "Bitcoin",
    platform: "Space X",
    contentSummary: "Content Summary Goes Here...",
    reach: "High",
    status: "In Progress",
  },
  {
    id: "123456",
    threatType: "Trump",
    platform: "Space X",
    contentSummary: "Content Summary Goes Here...",
    reach: "Low",
    status: "Mitigated",
  },
  {
    id: "123456",
    threatType: "Delaware",
    platform: "Space X",
    contentSummary: "Content Summary Goes Here...",
    reach: "High",
    status: "In Progress",
  },
  {
    id: "123456",
    threatType: "Green Energy",
    platform: "Space X",
    contentSummary: "Content Summary Goes Here...",
    reach: "Low",
    status: "Dismissed",
  },
];

export default function ThreatDetectionTable() {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll(".table-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">
            {status}
          </Badge>
        );
      case "Mitigated":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
            {status}
          </Badge>
        );
      case "Dismissed":
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getReachBadge = (reach: string) => {
    return reach === "High" ? (
      <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
        {reach}
      </Badge>
    ) : (
      <Badge className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">
        {reach}
      </Badge>
    );
  };

  return (
    <Card className="bg-white dark:bg-[#101828] dark:border-slate-700 backdrop-blur-sm">
      {/* Header */}
      <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center space-x-4">
          <CardTitle className="text-white text-lg font-semibold">
            Threat Detection
          </CardTitle>
          <Badge className="bg-red-500/20 text-red-400 whitespace-nowrap">
            8 open threats to review
          </Badge>
        </div>
        <div className="w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search Threats"
              className="pl-10 w-full h-9 bg-slate-800 border-slate-600 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </CardHeader>

      {/* Table */}
      <CardContent className="px-4 sm:px-6">
        <div ref={tableRef} className="overflow-x-auto">
          <table className="w-full text-sm min-w-[768px]">
            <thead>
              <tr className="border-b border-slate-700 text-xs sm:text-sm text-gray-400">
                {[
                  "Threat Type",
                  "Platform",
                  "Content Summary",
                  "ID",
                  "Reach",
                  "Action",
                  "Status",
                ].map((title, idx) => (
                  <th key={idx} className="text-left py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span>{title}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {threats.map((threat, index) => (
                <tr
                  key={index}
                  className="table-row border-b border-slate-800 hover:bg-slate-800/50"
                >
                  <td className="py-3 px-4 text-blue-400 hover:text-blue-300 cursor-pointer whitespace-nowrap">
                    {threat.threatType}
                  </td>
                  <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                    {threat.platform}
                  </td>
                  <td className="py-3 px-4 text-blue-400 hover:text-blue-300 cursor-pointer whitespace-nowrap">
                    {threat.contentSummary}
                  </td>
                  <td className="py-3 px-4 text-gray-300">{threat.id}</td>
                  <td className="py-3 px-4">{getReachBadge(threat.reach)}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <Select>
                        <SelectTrigger className="w-full sm:w-20 h-8 bg-red-500/20 border-red-500/50 text-red-400 text-xs">
                          <SelectValue placeholder="Mitigate" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="mitigate" className="text-red-400">
                            Mitigate
                          </SelectItem>
                          <SelectItem value="escalate" className="text-red-400">
                            Escalate
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-full sm:w-20 h-8 bg-green-500/20 border-green-500/50 text-green-400 text-xs">
                          <SelectValue placeholder="Dismiss" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="dismiss" className="text-green-400">
                            Dismiss
                          </SelectItem>
                          <SelectItem value="archive" className="text-green-400">
                            Archive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(threat.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center space-x-1 sm:space-x-2 mt-6">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              className={`${
                page === 1 ? "bg-slate-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {page}
            </Button>
          ))}
          <span className="text-gray-400">...</span>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
