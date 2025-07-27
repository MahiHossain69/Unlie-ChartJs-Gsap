"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import {
  ChevronRight,
  Search,
  Upload,
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  Check,
  AlertCircle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { IoCloudUploadOutline } from "react-icons/io5"

interface AccordionSection {
  id: string
  title: string
  isExpanded: boolean
}

interface KnowledgeItem {
  id: string
  title: string
  type: string
  date: string
  source: string
  inUse: boolean
  isEditing?: boolean
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "completed" | "error"
}

interface FormData {
  title: string
  textInfo: string
  secondTitle: string
}

interface FormErrors {
  title?: string
  textInfo?: string
  secondTitle?: string
}

const KnowledgeBaseAccordion = () => {
  const { toast } = useToast()

  // Accordion state
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "add-info", title: "Add Information to the Knowledge Base", isExpanded: true },
    { id: "knowledge-table", title: "Knowledge Table", isExpanded: false },
    { id: "initial-info", title: "Initial Information", isExpanded: false },
  ])

  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    textInfo: "",
    secondTitle: "",
  })

  // Form validation state
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  // Knowledge table state
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    { id: "1", title: "For Interview", type: "Article", date: "24/11/2024", source: "User", inUse: true },
    { id: "2", title: "X Account", type: "Social Media Account", date: "24/11/2024", source: "X", inUse: false },
    { id: "3", title: "Test", type: "Post", date: "24/11/2024", source: "Facebook", inUse: true },
  ])

  const [newItem, setNewItem] = useState<Partial<KnowledgeItem>>({
    title: "",
    type: "",
    date: "",
    source: "",
    inUse: false,
  })

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("Filter by category")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // Keywords state
  const [keywords, setKeywords] = useState(["Best Price", "Low Price", "Special Offer"])
  const [newKeyword, setNewKeyword] = useState("")
  const [showKeywordInput, setShowKeywordInput] = useState(false)

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "new-video.mp4",
      size: 65400,
      type: "video/mp4",
      progress: 75,
      status: "uploading",
    },
    {
      id: "2",
      name: "my-photo.jpg",
      size: 54000,
      type: "image/jpeg",
      progress: 100,
      status: "completed",
    },
    {
      id: "3",
      name: "my-photo-2.jpg",
      size: 54000,
      type: "image/jpeg",
      progress: 100,
      status: "completed",
    },
  ])

  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const arrowRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialFileInputRef = useRef<HTMLInputElement>(null)

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => ({
        ...section,
        isExpanded: section.id === sectionId ? !section.isExpanded : section.isExpanded,
      })),
    )
  }

  useEffect(() => {
    sections.forEach((section) => {
      const content = contentRefs.current[section.id]
      const arrow = arrowRefs.current[section.id]
      if (content && arrow) {
        if (section.isExpanded) {
          gsap.to(content, {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(arrow, {
            rotation: 90,
            duration: 0.2,
            ease: "power2.out",
          })
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(arrow, {
            rotation: 0,
            duration: 0.2,
            ease: "power2.out",
          })
        }
      }
    })
  }, [sections])

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!formData.textInfo.trim()) {
      errors.textInfo = "Text information is required"
    }

    if (!formData.secondTitle.trim()) {
      errors.secondTitle = "Second title is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Form handlers
  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFormSubmit = () => {
    if (validateForm()) {
      toast({
        title: "Success",
        description: "Information submitted successfully!",
      })
      // Reset form after successful submission
      setFormData({
        title: "",
        textInfo: "",
        secondTitle: "",
      })
      setFormErrors({})
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
    }
  }

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "uploading",
      }
      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === newFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100)
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? "completed" : "uploading",
              }
            }
            return f
          }),
        )
      }, 500)

      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, progress: 100, status: "completed" } : f)),
        )
      }, 3000)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
    toast({
      title: "File removed",
      description: "File has been removed from upload queue",
    })
  }

  // Knowledge table handlers
  const handleItemEdit = (itemId: string) => {
    setKnowledgeItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isEditing: !item.isEditing } : item)),
    )
  }

  const handleItemUpdate = (itemId: string, field: keyof KnowledgeItem, value: unknown) => {
    setKnowledgeItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)))
  }

  const handleItemSave = (itemId: string) => {
    setKnowledgeItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, isEditing: false } : item)))
    toast({
      title: "Success",
      description: "Item updated successfully!",
    })
  }

  const handleNewItemChange = (field: keyof KnowledgeItem, value: unknown) => {
    setNewItem((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddNewItem = () => {
    if (!newItem.title || !newItem.type || !newItem.date || !newItem.source) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const item: KnowledgeItem = {
      id: Date.now().toString(),
      title: newItem.title!,
      type: newItem.type!,
      date: newItem.date!,
      source: newItem.source!,
      inUse: newItem.inUse || false,
    }

    setKnowledgeItems((prev) => [...prev, item])
    setNewItem({ title: "", type: "", date: "", source: "", inUse: false })
    toast({
      title: "Success",
      description: "New item added successfully!",
    })
  }

  // Search and filter
  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterCategory === "Filter by category" || item.type.toLowerCase().includes(filterCategory.toLowerCase())
    return matchesSearch && matchesFilter
  })

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Keywords handlers
  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords((prev) => [...prev, newKeyword.trim()])
      setNewKeyword("")
      setShowKeywordInput(false)
      toast({
        title: "Success",
        description: "Keyword added successfully!",
      })
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword))
    toast({
      title: "Keyword removed",
      description: `"${keyword}" has been removed`,
    })
  }

  const getFileIcon = (type: string) => {
    if (type.includes("video")) return "MP4"
    if (type.includes("image")) return "JPG"
    if (type.includes("pdf")) return "PDF"
    return "DOC"
  }

  const getFileIconColor = (type: string) => {
    if (type.includes("video")) return "bg-blue-500"
    if (type.includes("image")) return "bg-red-500"
    if (type.includes("pdf")) return "bg-green-500"
    return "bg-gray-500"
  }

  const formatFileSize = (bytes: number) => {
    return `${Math.round(bytes / 1024)} kB of 54 kB`
  }

  const renderAddInfoContent = () => (
  <div className="space-y-6 pt-4">
  {/* Title */}
  <div className="bg-[#E4E7EC] -mt-[15px] w-full h-[1px]"></div>
  <div className="flex flex-col md:flex-row items-start md:gap-8 gap-2">
    <div className="flex items-center gap-2 pt-2 md:min-w-[220px]">
      <label className="text-[15px] font-space font-medium text-gray-700">
        Title <span className="text-red-500">*</span>
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-gray-400 cursor-help">ⓘ</span>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Enter title text to submit</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div className="w-full">
      <Input
        placeholder="Enter your text..."
        className={`w-full bg-[#000]/5 border-[#D0D5DD] placeholder:font-space placeholder:text-[#000]/50 ${formErrors.title ? "border-red-500" : ""}`}
        value={formData.title}
        required
        onChange={(e) => handleFormChange("title", e.target.value)}
      />
      {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
    </div>
  </div>

  {/* Add Text Info */}
  <div className="flex flex-col md:flex-row items-start md:gap-8 gap-2">
    <div className="flex items-center gap-2 pt-2 md:min-w-[220px]">
      <label className="text-[15px] font-space font-medium text-gray-700">
        Add Text Information <span className="text-red-500">*</span>
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-gray-400 cursor-help">ⓘ</span>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Add detailed text information here</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div className="w-full">
      <Textarea
        placeholder="Enter your text..."
        className={`w-full h-24 resize-none bg-[#000]/5 border-[#D0D5DD] placeholder:font-space placeholder:text-[#000]/50 ${formErrors.textInfo ? "border-red-500" : ""}`}
        value={formData.textInfo}
        required
        onChange={(e) => handleFormChange("textInfo", e.target.value)}
      />
      {formErrors.textInfo && <p className="text-red-500 text-sm mt-1">{formErrors.textInfo}</p>}
    </div>
  </div>
  <div className="bg-[#E4E7EC] w-full h-[1px]"></div>
  {/* Second Title */}
  <div className="flex flex-col md:flex-row items-start md:gap-8 gap-2">
    <div className="flex items-center gap-2 pt-2 md:min-w-[220px]">
      <label className="text-[15px] font-space font-medium text-gray-700">
        Title <span className="text-red-500">*</span>
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-gray-400 cursor-help">ⓘ</span>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Provide another title if needed</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div className="w-full">
      <Input
        placeholder="Enter your text..."
        className={`w-full bg-[#000]/5 border-[#D0D5DD] placeholder:font-space placeholder:text-[#000]/50 ${formErrors.secondTitle ? "border-red-500" : ""}`}
        value={formData.secondTitle}
        required
        onChange={(e) => handleFormChange("secondTitle", e.target.value)}
      />
      {formErrors.secondTitle && <p className="text-red-500 text-sm mt-1">{formErrors.secondTitle}</p>}
    </div>
  </div>

  {/* Upload Field */}
  <div className="flex flex-col md:flex-row items-start md:gap-8 gap-2">
  {/* Left: Label and Tooltip */}
  <div className="flex items-center gap-2 pt-2 md:min-w-[220px]">
    <label className="text-[15px] font-space font-medium text-gray-700">
      Upload Initial Documents
    </label>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="text-gray-400 cursor-help">ⓘ</span>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Upload Initial Document</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

  {/* Right: Upload Area */}
  <div className="w-full">
    <div
      className="border-2 border-dashed border-[#CDD0D5] rounded-lg p-3 md:p-8 bg-white hover:bg-gray-100 transition-colors cursor-pointer flex flex-col md:flex-row items-center justify-between text-start"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <IoCloudUploadOutline className="h-8 w-8 text-[#525866] mb-3 md:mb-0" />
      <div className="flex flex-col items-start flex-grow mx-4">
        <h1 className="text-sm font-space text-[#0A0D14] mb-1 font-medium ">
          Choose a Document or drag & drop it here.
        </h1>
        <h1 className="text-xs font-space font-normal text-[#868C98]">
          PDF, .pptx, .doc etc formats, up to 20 MB.
        </h1>
      </div>
      <Button variant="outline" className="bg-white border-[#5258660F] font-space text-[#525866] font-medium">
        Browse File
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(e) => handleFileUpload(e.target.files)}
      />
    </div>
  </div>
</div>


  {/* Submit Button */}
  <div className="flex justify-end pt-4">
    <Button className="bg-[#473BF0] hover:bg-blue-700 text-white px-8" onClick={handleFormSubmit}>
      Submit
    </Button>
  </div>
</div>


  )

  const renderKnowledgeTableContent = () => (
    <div className="space-y-6 pt-4">
      <div className="bg-[#D0D5DD] w-full h-[1px] -mt-[15px]"></div>
      <div>
      <div className="lg:flex flex-col  items-center justify-between mb-4">
  <h3 className="text-lg font-bold font-space text-[#101828]">Information</h3>
  <div className="flex gap-4">
    {/* Search Input */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#667085]" />
      <Input
        placeholder="Search Threats"
        className="pl-10 pr-4 py-2 w-[260px] rounded-md border border-[#D0D5DD] text-sm font-space bg-white text-[#344054] placeholder:text-[#667085]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Filter Dropdown */}
    <div className="relative">
      <select
        className="pl-3 pr-8 py-2 w-[200px] rounded-md border border-[#D0D5DD] text-sm font-space bg-white text-[#344054] appearance-none"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="Filter by category">Filter by category</option>
        <option value="article">Article</option>
        <option value="social">Social Media</option>
        <option value="post">Post</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#667085] pointer-events-none" />
    </div>
  </div>
</div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#000]/5 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-[10px] text-[#4A5773] uppercase tracking-wider font-space font-bold">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-[10px] text-[#4A5773] uppercase tracking-wider font-space font-bold">Type</th>
                <th className="px-6 py-3 text-left text-[10px] text-[#4A5773] uppercase tracking-wider font-space font-bold">Date</th>
                <th className="px-6 py-3 text-left text-[10px] text-[#4A5773] uppercase tracking-wider font-space font-bold">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-[10px] text-[#4A5773] uppercase tracking-wider font-space font-bold">
                  In Use
                </th>
                <th className="px-6 py-3 text-left text-[10px] text-[#4A5773] uppercase tracking-wider font-space font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-space font-normal text-[#101828]">
                    {item.isEditing ? (
                      <Input
                        value={item.title}
                        onChange={(e) => handleItemUpdate(item.id, "title", e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-space font-normal text-[#101828]">
                    {item.isEditing ? (
                      <Input
                        value={item.type}
                        onChange={(e) => handleItemUpdate(item.id, "type", e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      item.type
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-space font-normal text-[#101828]">
                    {item.isEditing ? (
                      <Input
                        value={item.date}
                        onChange={(e) => handleItemUpdate(item.id, "date", e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      item.date
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-space font-normal text-[#101828]">
                    {item.isEditing ? (
                      <Input
                        value={item.source}
                        onChange={(e) => handleItemUpdate(item.id, "source", e.target.value)}
                        className="text-sm"
                      />
                    ) : (
                      item.source
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                    className="data-[state=checked]:!bg-[#253EA7]"
                      checked={item.inUse}
                      onCheckedChange={(checked) => handleItemUpdate(item.id, "inUse", checked)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.isEditing ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleItemSave(item.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleItemEdit(item.id)}
                        className="text-[#473BF0] hover:text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {/* Add new item row */}
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter title"
                    className="text-sm text-[#98A2B3] font-space font-normal border-none shadow-none  bg-transparent"
                    value={newItem.title || ""}
                    onChange={(e) => handleNewItemChange("title", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter type"
                    className="text-sm text-[#98A2B3] font-space font-normal border-none shadow-none  bg-transparent"
                    value={newItem.type || ""}
                    onChange={(e) => handleNewItemChange("type", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter date"
                    className="text-sm text-[#98A2B3] font-space font-normal border-none shadow-none  bg-transparent"
                    value={newItem.date || ""}
                    onChange={(e) => handleNewItemChange("date", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter source"
                    className="text-sm text-[#98A2B3] placeholder:font-space font-normal border-none shadow-none  bg-transparent"
                    value={newItem.source || ""}
                    onChange={(e) => handleNewItemChange("source", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Switch
                  className="data-[state=checked]:!bg-[#253EA7]"
                    checked={newItem.inUse || false}
                    onCheckedChange={(checked) => handleNewItemChange("inUse", checked)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700"
                    onClick={handleAddNewItem}
                  >
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" />
                    </div>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
       <div className="flex items-center justify-center space-x-1 mt-6">
  {/* Prev */}
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
    disabled={currentPage === 1}
    className="h-8 w-8 p-0"
  >
    <ChevronLeft className="h-4 w-4" />
  </Button>

  {/* Page Numbers */}
  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const page = i + 1;
    const isActive = currentPage === page;
    return (
      <Button
        key={page}
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(page)}
        className={`h-8 w-8 p-0 rounded-full font-space text-sm ${
          isActive
            ? "bg-[#000]/10 text-[#212B36] "
            : "bg-transparent text-[#101828] "
        }`}
      >
        {page}
      </Button>
    );
  })}

  {/* Ellipsis + Last Page */}
  {totalPages > 5 && (
    <>
      <span className="text-gray-400 px-2">...</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(totalPages)}
        className={`h-8 w-8 p-0 rounded-full font-space text-sm ${
          currentPage === totalPages
            ? "bg-[#101828] text-white "
            : "bg-[#000]/10 text-[#101828] hover:bg-[#000]/20"
        }`}
      >
        {totalPages}
      </Button>
    </>
  )}

  {/* Next */}
  <Button
    variant="ghost"
    size="sm"
    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
    disabled={currentPage === totalPages}
    className="h-8 w-8 p-0"
  >
    <ChevronRight className="h-4 w-4" />
  </Button>
</div>

      </div>
    </div>
  )

  const renderInitialInfoContent = () => (
    <div className="space-y-8 pt-4">
      <div className="hidden lg:block">
        {/* Relevant Keywords */}
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
  {/* Label + Tooltip */}
  <div className="flex items-center min-w-[220px]">
    <label className="text-[15px] font-space font-medium text-gray-700">Relevant Keywords</label>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Add relevant keywords for better search</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

  {/* Keywords + Add */}
  <div className="flex flex-wrap items-center gap-2">
    {keywords.map((keyword, index) => (
      <Badge
        key={index}
        variant="secondary"
        className="bg-[#EBEFFF] text-[#3C37FF] px-3 py-1 rounded-full text-sm"
      >
        {keyword}
        <X
          className="ml-2 h-3 w-3 cursor-pointer hover:text-red-600"
          onClick={() => handleRemoveKeyword(keyword)}
        />
      </Badge>
    ))}
    {showKeywordInput ? (
      <div className="flex items-center gap-2">
        <Input
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Enter keyword"
          className="w-32 h-8 text-sm"
          onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
        />
        <Button size="sm" onClick={handleAddKeyword} className="h-8 w-8 p-0">
          <Check className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setShowKeywordInput(false)
            setNewKeyword("")
          }}
          className="h-8 w-8 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    ) : (
      <Button
        variant="default"
        size="sm"
        className="bg-[#3C37FF] text-white rounded-full text-xs font-medium px-4 py-1 hover:bg-[#2d2bc4]"
        onClick={() => setShowKeywordInput(true)}
      >
        + Add keyword
      </Button>
    )}
  </div>
</div>
 <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
  {/* Left Column: Heading */}
  <div className="min-w-[220px]">
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold text-gray-900">
        Trusted Online Sources
      </h2>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-gray-400 cursor-help">ⓘ</span>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">
            Link verified social or official sources
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>

  {/* Right Column: Grid of Sources */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
    {[
      { label: "Wikipedia Page", placeholder: "Filter by category", status: "success" },
      { label: "X", placeholder: "X account name", status: "error" },
      { label: "Facebook", placeholder: "Facebook account name", status: "loading" },
      { label: "Instagram", placeholder: "Instagram account name", status: "success" },
      { label: "TikTok", placeholder: "TikTok account name", status: "success" },
      { label: "Youtube", placeholder: "Youtube account name", status: "success" },
    ].map((source, idx) => (
      <div key={idx} className="space-y-1">
        <label className="text-sm font-medium text-gray-900">
          {source.label}
        </label>
        <div className="flex items-center justify-between border border-gray-200 rounded-md bg-gray-50 px-3 py-2">
          <input
            type="text"
            placeholder={source.placeholder}
            className="bg-transparent text-sm text-gray-500 w-full focus:outline-none"
            disabled
          />
          {source.status === "success" && (
            <Check className="w-4 h-4 text-green-600 ml-2 shrink-0" />
          )}
          {source.status === "error" && (
            <X className="w-4 h-4 text-red-500 ml-2 shrink-0" />
          )}
          {source.status === "loading" && (
            <svg
              className="w-4 h-4 text-gray-400 animate-spin ml-2 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
<div className="flex flex-col lg:flex-row justify-between gap-6 mb-6">
  {/* Left Column: Label + Tooltip */}
  <div className="min-w-[220px]">
    <div className="flex items-center">
      <label className="text-[15px] font-space font-medium text-gray-700">Upload Initial Documents</label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Upload Initial Document</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>

  {/* Right Column: Drag-drop area + Files + Submit */}
  <div className="flex-1 space-y-4">
    {/* Drag & Drop Upload */}
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => initialFileInputRef.current?.click()}
    >
      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
      <div className="text-sm font-space text-[#0A0D14] font-medium mb-1">Choose a document or drag & drop it here.</div>
      <div className="text-xs text-[#868C98] font-space font-normal mb-4">PDF, .pptx, .doc etc formats, up to 20 MB.</div>
      <Button variant="outline" className="bg-white border-[#5258660F] font-space text-[#525866] font-medium">Browse File</Button>
      <input
        ref={initialFileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
        onChange={(e) => handleFileUpload(e.target.files)}
      />
    </div>

    {/* Uploaded Files List */}
    <div className="space-y-3">
      {uploadedFiles.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
        >
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded flex items-center justify-center ${getFileIconColor(file.type)}`}>
              <span className="text-white text-xs font-bold">{getFileIcon(file.type)}</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{file.name}</div>
              <div className="text-xs text-gray-500 flex items-center">
                {formatFileSize(file.size)}
                {file.status === "uploading" && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Uploading...</span>
                  </>
                )}
                {file.status === "completed" && (
                  <>
                    <span className="mx-2">•</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    <span>Completed</span>
                  </>
                )}
                {file.status === "error" && (
                  <>
                    <span className="mx-2">•</span>
                    <AlertCircle className="w-3 h-3 text-red-500 mr-1" />
                    <span>Error</span>
                  </>
                )}
              </div>
              {file.status === "uploading" && (
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFile(file.id)}
            className="text-red-400 hover:text-red-600 h-8 w-8 p-0"
          >
            {file.status === "uploading" ? <X className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      ))}
    </div>

    {/* Submit Button */}
    <div className="flex justify-end pt-2">
      <Button
        className="bg-[#473BF0] hover:bg-blue-700 text-white px-8"
        onClick={() => {
          toast({
            title: "Success",
            description: "Initial information submitted successfully!",
          });
        }}
      >
        Submit
      </Button>
    </div>
  </div>
</div>




      </div>

      {/* mobile  */}
      <div className="lg:hidden block">
        <div className="flex items-center mb-4">
          <label className="text-[15px] font-space font-medium text-gray-700">Relevant Keywords</label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Add relevant keywords for better search</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((keyword, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-100 text-blue-800 px-3 py-1 hover:bg-blue-200 transition-colors"
            >
              {keyword}
              <X
                className="ml-2 h-3 w-3 cursor-pointer hover:text-red-600"
                onClick={() => handleRemoveKeyword(keyword)}
              />
            </Badge>
          ))}
          {showKeywordInput ? (
            <div className="flex items-center gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Enter keyword"
                className="w-32 h-8 text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
              />
              <Button size="sm" onClick={handleAddKeyword} className="h-8 w-8 p-0">
                <Check className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowKeywordInput(false)
                  setNewKeyword("")
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 bg-transparent hover:bg-blue-50"
              onClick={() => setShowKeywordInput(true)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add keyword
            </Button>
          )}
        </div>
      </div>

      <div className="lg:hidden block">
        <div className="flex items-center mb-4">
          <label className="text-[15px] font-space font-medium text-gray-700">Trusted Online Sources</label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Manage trusted online sources</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-3">
          {[
            { name: "Wikipedia Page", account: "X account name", status: "red" },
            { name: "Facebook", account: "Facebook account name", status: "yellow" },
            { name: "Instagram", account: "Instagram account name", status: "green" },
            { name: "TikTok", account: "TikTok account name", status: "green" },
            { name: "YouTube", account: "YouTube account name", status: "green" },
          ].map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">{source.name}</span>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      source.status === "red"
                        ? "bg-red-500"
                        : source.status === "yellow"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-500">{source.account}</span>
                </div>
              </div>
              <X className="h-4 w-4 text-gray-400 cursor-pointer hover:text-red-600" />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden block">
        <div className="flex items-center mb-2">
          <label className="text-[15px] font-space font-medium text-gray-700">Upload Initial Documents</label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#0A0D14] border shadow-md border-[#E2E4E9]">Upload Initial Document</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 mb-4 hover:bg-gray-100 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => initialFileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
          <div className="text-sm font-space text-[#0A0D14] font-medium  mb-1">Choose a Documents or drag & drop it here.</div>
          <div className="text-xs text-[#868C98] font-space font-normal mb-4">PDF, .pptx, .doc etc formats, up to 20 MB.</div>
          <Button variant="outline" className="bg-white border-[#5258660F] font-space text-[#525866] font-medium">
            Browse File
          </Button>
          <input
            ref={initialFileInputRef}
            type="file"
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </div>
        <div className="space-y-3">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${getFileIconColor(file.type)}`}>
                  <span className="text-white text-xs font-bold">{getFileIcon(file.type)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{file.name}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    {formatFileSize(file.size)}
                    {file.status === "uploading" ? (
                      <>
                        <span className="ml-2 mr-2">•</span>
                        <span>Uploading...</span>
                      </>
                    ) : file.status === "completed" ? (
                      <>
                        <span className="ml-2 mr-2">•</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <span className="ml-2 mr-2">•</span>
                        <AlertCircle className="w-3 h-3 text-red-500 mr-1" />
                        <span>Error</span>
                      </>
                    )}
                  </div>
                  {file.status === "uploading" && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
                className="text-red-400 hover:text-red-600 h-8 w-8 p-0"
              >
                {file.status === "uploading" ? <X className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden  flex justify-end pt-4">
        <Button
          className="bg-[#473BF0] hover:bg-blue-700 text-white px-8"
          onClick={() => {
            toast({
              title: "Success",
              description: "Initial information submitted successfully!",
            })
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  )

  const renderContent = (sectionId: string) => {
    switch (sectionId) {
      case "add-info":
        return renderAddInfoContent()
      case "knowledge-table":
        return renderKnowledgeTableContent()
      case "initial-info":
        return renderInitialInfoContent()
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors "
            onClick={() => toggleSection(section.id)}
          >
            <h2 className="text-[24px] font-bold font-space text-[#101828]">{section.title}</h2>
            <div
              ref={(el) => {
                if (el) arrowRefs.current[section.id] = el
              }}
              className="text-gray-400 transition-transform"
            >
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
          <div
            ref={(el) => {
              if (el) contentRefs.current[section.id] = el
            }}
            className="overflow-hidden"
            style={{ height: section.isExpanded ? "auto" : 0, opacity: section.isExpanded ? 1 : 0 }}
          >
            <div className="px-6 pb-6">{renderContent(section.id)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default KnowledgeBaseAccordion
