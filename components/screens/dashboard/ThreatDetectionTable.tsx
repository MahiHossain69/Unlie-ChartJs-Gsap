"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import { FaCaretUp } from "react-icons/fa"
import { FaCaretDown } from "react-icons/fa"
import { gsap } from "gsap"

interface Threat {
  id: string
  threatType: string
  platform: string
  contentSummary: string
  reach: string
  status: string
}

type ActionType = "mitigate" | "dismiss" | "escalate" | "archive"

const allThreatsData: { [key: number]: Threat[] } = {
  1: [
    { id: "123456", threatType: "Bitcoin", platform: "Space X", contentSummary: "Content Summary Goes Here....", reach: "High", status: "" },
    { id: "123457", threatType: "Trump", platform: "Space X", contentSummary: "Content Summary Goes Here....", reach: "Low", status: "" },
    { id: "123458", threatType: "Delaware", platform: "Space X", contentSummary: "Content Summary Goes Here....", reach: "High", status: "" },
    { id: "123459", threatType: "Green Energy", platform: "Space X", contentSummary: "Content Summary Goes Here....", reach: "Low", status: "" },
  ],
  2: [
    { id: "223456", threatType: "Cryptocurrency", platform: "Tesla", contentSummary: "Advanced threat analysis required....", reach: "Medium", status: "" },
    { id: "223457", threatType: "AI Ethics", platform: "Neuralink", contentSummary: "Potential regulatory concerns....", reach: "High", status: "" },
    { id: "223458", threatType: "Market Manipulation", platform: "Twitter", contentSummary: "Social media influence detected....", reach: "High", status: "" },
    { id: "223459", threatType: "Privacy Concerns", platform: "Starlink", contentSummary: "Data protection issues identified....", reach: "Medium", status: "" },
  ],
  3: [
    { id: "323456", threatType: "Regulatory Risk", platform: "SpaceX", contentSummary: "Government oversight increasing....", reach: "High", status: "" },
    { id: "323457", threatType: "Competition", platform: "Tesla", contentSummary: "New market entrants detected....", reach: "Medium", status: "" },
    { id: "323458", threatType: "Supply Chain", platform: "Tesla", contentSummary: "Material shortage concerns....", reach: "Low", status: "" },
    { id: "323459", threatType: "Public Opinion", platform: "Twitter", contentSummary: "Sentiment analysis shows decline....", reach: "High", status: "" },
  ],
  4: [
    { id: "423456", threatType: "Technology Risk", platform: "Neuralink", contentSummary: "Technical challenges identified....", reach: "Medium", status: "" },
    { id: "423457", threatType: "Financial Risk", platform: "SpaceX", contentSummary: "Budget overrun concerns....", reach: "High", status: "" },
    { id: "423458", threatType: "Legal Risk", platform: "Tesla", contentSummary: "Potential litigation issues....", reach: "Medium", status: "" },
    { id: "423459", threatType: "Environmental", platform: "SpaceX", contentSummary: "Environmental impact assessment....", reach: "Low", status: "" },
  ],
  5: [
    { id: "523456", threatType: "Cybersecurity", platform: "Tesla", contentSummary: "Security vulnerabilities found....", reach: "High", status: "" },
    { id: "523457", threatType: "Brand Risk", platform: "Twitter", contentSummary: "Reputation management needed....", reach: "High", status: "" },
    { id: "523458", threatType: "Operational Risk", platform: "Starlink", contentSummary: "Service disruption potential....", reach: "Medium", status: "" },
    { id: "523459", threatType: "Strategic Risk", platform: "Neuralink", contentSummary: "Long-term viability concerns....", reach: "Low", status: "" },
  ],
  6: [
    { id: "623456", threatType: "Data Breach", platform: "Tesla", contentSummary: "Customer data exposure risk....", reach: "High", status: "" },
    { id: "623457", threatType: "Insider Threat", platform: "SpaceX", contentSummary: "Employee access concerns....", reach: "Medium", status: "" },
    { id: "623458", threatType: "Misinformation", platform: "Twitter", contentSummary: "False information spreading....", reach: "High", status: "" },
    { id: "623459", threatType: "Infrastructure", platform: "Starlink", contentSummary: "Network stability issues....", reach: "Low", status: "" },
  ],
}

type SortField = keyof Threat
type SortDirection = "asc" | "desc"

export default function ThreatDetectionTable() {
  const tableRef = useRef<HTMLDivElement>(null)
  const [allThreats, setAllThreats] = useState<Threat[]>(Object.values(allThreatsData).flat())
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  useEffect(() => {
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll(".table-row")
      gsap.fromTo(
        rows,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out",
        }
      )
    }
  }, [currentPage, searchTerm, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...allThreats].sort((a, b) => {
      const aValue = a[field].toString().toLowerCase()
      const bValue = b[field].toString().toLowerCase()
      return newDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    setAllThreats(sorted)
  }

  const handleAction = (threatId: string, action: ActionType) => {
    // Show "In Progress"
    setAllThreats((prevThreats) =>
      prevThreats.map((t) =>
        t.id === threatId ? { ...t, status: "In Progress" } : t
      )
    )

    // Delay update for 2 seconds
    setTimeout(() => {
      setAllThreats((prevThreats) =>
        prevThreats.map((t) =>
          t.id === threatId
            ? {
                ...t,
                status:
                  action === "mitigate"
                    ? "Mitigated"
                    : action === "dismiss"
                    ? "Dismissed"
                    : action === "escalate"
                    ? "Escalated"
                    : "Archived",
              }
            : t
        )
      )
    }, 2000)
  }

  const filteredThreats = allThreats.filter(
    (threat) =>
      threat.threatType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.contentSummary.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredThreats.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedThreats = filteredThreats.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const getStatusBadge = (status: string) => {
    const base =
      "border-0 font-medium text-sm px-2 py-1 rounded bg-opacity-20 hover:bg-opacity-40"
    switch (status) {
      case "In Progress":
        return <Badge className={`${base} bg-[#F38E001A]/10 dark:bg-[#FFFFFF14]/10 dark:text-[white] text-[#E38604] font-space font-medium text-[13px]`}>{status}</Badge>
      case "Mitigated":
        return <Badge className={`${base} bg-[#473BF01A]/10 dark:bg-[#F2383826]/15 dark:text-[#F23838] text-[#473BF0] font-space font-medium text-[13px]`}>{status}</Badge>
      case "Dismissed":
        return <Badge className={`${base} bg-[#0CAF6014]/10 text-[#0CAF60] font-space font-medium text-[13px]`}>{status}</Badge>
      case "Escalated":
        return <Badge className={`${base} bg-red-100 font-space font-medium text-[13px] text-red-600`}>{status}</Badge>
      case "Archived":
        return <Badge className={`${base} bg-gray-100 font-space font-medium text-[13px] text-gray-600`}>{status}</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getReachBadge = (reach: string) => {
    switch (reach) {
      case "High":
        return <Badge className="bg-transparent shadow-none hover:bg-transparent cursor-pointer text-[#F23838]">{reach}</Badge>
      case "Medium":
        return <Badge className="bg-transparent shadow-none hover:bg-transparent cursor-pointer text-yellow-600">{reach}</Badge>
      case "Low":
        return <Badge className="bg-transparent shadow-none hover:bg-transparent cursor-pointer text-[#4A5773] dark:text-[#fff]">{reach}</Badge>
      default:
        return <Badge variant="secondary">{reach}</Badge>
    }
  }

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="text-left py-4 px-4 whitespace-nowrap">
      <button
        onClick={() => handleSort(field)}
        className="flex gap-[25px] dark:text-[#E4E7EC] font-space text-[#4A5773] font-medium text-[13px] items-center space-x-2  hover:text-gray-800  group"
      >
        <span>{children}</span>
        <div className="flex flex-col">
          <FaCaretUp
            className={`w-3 h-3 -mb-1 ${
              sortField === field && sortDirection === "asc"
                ? "text-[#687588] dark:text-[#687588]"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
          <FaCaretDown
            className={`w-3 h-3 ${
              sortField === field && sortDirection === "desc"
                ? "text-[#687588] dark:text-[#687588]"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </div>
      </button>
    </th>
  )

  return (
    <div className="">
      <Card className="bg-white border border-gray-200 dark:bg-[#101828] dark:border-slate-700 shadow-sm">
        <CardHeader className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-6 ">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="dark:text-white font-space text-black text-[18px] font-semibold">Threat Detection</CardTitle>
            <Badge className="bg-red-100 font-space font-normal text-[13px] text-red-600">8 open threats to review</Badge>
          </div>
          <div className="w-full lg:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#98A2B3]" />
              <Input
                placeholder="Search Threats"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border font-space border-[#D0D5DD] bg-[#0000000F]/5 placeholder:font-space placeholder:font-normal placeholder:text-[13px] placeholder:text-[#98A2B3] w-full h-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 ">
          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full  text-sm min-w-[900px]">
              <thead className="bg-[#4444440D]/5   dark:bg-white/5 border border-[#0000001A]/10 dark:border-white/10">
                <tr className="border  border-gray-200 dark:border-[#FFFFFF1A]/10">
                  <SortableHeader  field="threatType">Threat Type</SortableHeader>
                  <SortableHeader field="platform">Platform</SortableHeader>
                  <SortableHeader field="contentSummary">Content Summary</SortableHeader>
                  <SortableHeader field="id">ID</SortableHeader>
                  <SortableHeader field="reach">Reach</SortableHeader>
                  <th className="text-left text-[#4A5773] dark:text-[#E4E7EC]  py-4 px-4">Action</th>
                  <SortableHeader field="status">Status</SortableHeader>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#101828]">
                {paginatedThreats.map((threat) => (
                  <tr key={threat.id} className="table-row border-b border-l border-r dark:border-l dark:border-r dark:bg-[#101828] dark:border-white/10 border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-space font-normal text-[13px] text-[#1880F0] dark:text-[#84CAFF]">{threat.threatType}</td>
                    <td className="py-4 px-4 font-space font-normal text-[13px] text-[#1880F0] dark:text-[#84CAFF]">{threat.platform}</td>
                    <td className="py-4 px-4 font-space font-normal text-[13px] text-[#1880F0] dark:text-[#84CAFF]">{threat.contentSummary}</td>
                    <td className="py-4 px-4 font-space font-normal text-[13px] text-[#1880F0] dark:text-[#fff]">{threat.id}</td>
                    <td className="py-4 px-4">{getReachBadge(threat.reach)}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Select 
                          onValueChange={(value) => handleAction(threat.id, value as any)}
                          disabled={["Mitigated", "Dismissed", "Escalated", "Archived"].includes(threat.status)}
                        >
                          <SelectTrigger className="w-24 h-8 bg-[#F23838] font-space  font-medium !text-[#FEF3F2] text-xs">
                            <SelectValue placeholder="Mitigate" />
                          </SelectTrigger>
                          <SelectContent className="text-black dark:text-white font-space font-normal">
                            <SelectItem value="mitigate" >Mitigate</SelectItem>
                            <SelectItem value="escalate">Escalate</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          onValueChange={(value) => handleAction(threat.id, value as any)}
                          disabled={["Mitigated", "Dismissed", "Escalated", "Archived"].includes(threat.status)}
                        >
                          <SelectTrigger className="w-24 h-8 bg-[#0CAF60] font-space  font-medium !text-[#FEF3F2] text-xs">
                            <SelectValue placeholder="Dismiss" />
                          </SelectTrigger>
                          <SelectContent className="text-black dark:text-white font-space font-normal">
                            <SelectItem value="dismiss">Dismiss</SelectItem>
                            <SelectItem value="archive">Archive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                    <td className="py-4 px-4 ">{getStatusBadge(threat.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-1 mt-6 px-6 pb-2">
            <Button
              variant="ghost"
              size="sm"
              className=""
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`min-w-[32px] h-8 text-sm font-medium ${
                  page === currentPage
                    ? "bg-[#0000000F]/5 dark:bg-white/5 font-space dark:text-white rounded-full text-[#101828]"
                    : "text-[#4A5773] dark:hover:bg-neutral-800 font-space dark:text-white rounded-full hover:bg-gray-100"
                }`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
