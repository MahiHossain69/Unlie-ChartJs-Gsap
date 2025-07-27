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
import { Tooltip } from "@/components/ui/tooltip"

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

  // Form handlers
  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

 

  // File upload handlers
 const handleFileUpload = (files: FileList | null) => { // Removed isInitial parameter
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

  const handleDrop = (e: React.DragEvent) => { // Removed isInitial parameter
    e.preventDefault()
    handleFileUpload(e.dataTransfer.files) // Removed isInitial argument
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
    setKnowledgeItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)));
  };

  const handleItemSave = (itemId: string) => {
    setKnowledgeItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, isEditing: false } : item)))
    toast({
      title: "Success",
      description: "Item updated successfully!",
    })
  }

 const handleNewItemChange = (field: keyof KnowledgeItem, value: unknown) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

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
      <div className="text-sm text-gray-500 mb-6">Enter title text to submit</div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Tooltip content="Enter title text to submit">
              <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
            </Tooltip>
          </div>
          <Input
            placeholder="Enter your text..."
            className="w-full bg-gray-50 border-gray-200"
            value={formData.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Add Text Information</label>
            <Tooltip content="Add detailed text information here">
              <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
            </Tooltip>
          </div>
          <Textarea
            placeholder="Enter your text..."
            className="w-full h-24 resize-none bg-gray-50 border-gray-200"
            value={formData.textInfo}
            onChange={(e) => handleFormChange("textInfo", e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Tooltip content="Provide another title if needed">
              <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
            </Tooltip>
          </div>
          <Input
            placeholder="Enter your text..."
            className="w-full bg-gray-50 border-gray-200"
            value={formData.secondTitle}
            onChange={(e) => handleFormChange("secondTitle", e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Upload Initial Documents</label>
            <Tooltip content="Upload Initial Document">
              <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
            </Tooltip>
          </div>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, )}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
            <div className="text-sm text-gray-600 mb-1">Choose a Documents or drag & drop it here.</div>
            <div className="text-xs text-gray-400 mb-4">PDF, DOC, JPG file formats, up to 100 MB</div>
            <Button variant="outline" className="bg-white">
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

      <div className="flex justify-end pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Submit</Button>
      </div>
    </div>
  )

  const renderKnowledgeTableContent = () => (
    <div className="space-y-6 pt-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Information</h3>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Threats"
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="pl-3 pr-8 py-2 border border-gray-200 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none min-w-[160px]"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="Filter by category">Filter by category</option>
              <option value="article">Article</option>
              <option value="social">Social Media</option>
              <option value="post">Post</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  In Use
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {/* Add new item row */}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter title"
                    className="text-sm bg-white"
                    value={newItem.title || ""}
                    onChange={(e) => handleNewItemChange("title", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter type"
                    className="text-sm bg-white"
                    value={newItem.type || ""}
                    onChange={(e) => handleNewItemChange("type", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter date"
                    className="text-sm bg-white"
                    value={newItem.date || ""}
                    onChange={(e) => handleNewItemChange("date", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Input
                    placeholder="Enter source"
                    className="text-sm bg-white"
                    value={newItem.source || ""}
                    onChange={(e) => handleNewItemChange("source", e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Switch
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
                    <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            )
          })}
          {totalPages > 5 && (
            <>
              <span className="text-gray-400 px-2">...</span>
              <Button variant="ghost" size="sm" onClick={() => handlePageChange(totalPages)} className="h-8 w-8 p-0">
                {totalPages}
              </Button>
            </>
          )}
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
      <div>
        <div className="flex items-center mb-4">
          <label className="text-sm font-medium text-gray-700">Relevant Keywords</label>
          <Tooltip content="Add relevant keywords for better search">
            <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
          </Tooltip>
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

      <div>
        <div className="flex items-center mb-4">
          <label className="text-sm font-medium text-gray-700">Trusted Online Sources</label>
          <Tooltip content="Manage trusted online sources">
            <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
          </Tooltip>
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

      <div>
        <div className="flex items-center mb-2">
          <label className="text-sm font-medium text-gray-700">Upload Initial Documents</label>
          <Tooltip content="Upload Initial Document">
            <span className="text-gray-400 ml-2 cursor-help">ⓘ</span>
          </Tooltip>
        </div>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 mb-4 hover:bg-gray-100 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, )}
          onClick={() => initialFileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
          <div className="text-sm text-gray-600 mb-1">Choose a Documents or drag & drop it here.</div>
          <div className="text-xs text-gray-400 mb-4">PDF, DOC, JPG file formats, up to 100 MB</div>
          <Button variant="outline" className="bg-white">
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

      <div className="flex justify-end pt-4">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
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
    <div className=" space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
            onClick={() => toggleSection(section.id)}
          >
            <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
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
