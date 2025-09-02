"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface Bank {
  id: string
  name: string
  category: "Private Banks" | "Government Banks" | "Private Exchangers" | "Black Market"
  logo: string
  status: "Active" | "Inactive"
  lastUpdated: string
  totalRates: number
  description?: string
}

const mockBanks: Bank[] = [
  {
    id: "1",
    name: "Commercial Bank of Ethiopia",
    category: "Government Banks",
    logo: "🏛️",
    status: "Active",
    lastUpdated: "2024-01-15 10:30",
    totalRates: 8,
    description: "The largest commercial bank in Ethiopia",
  },
  {
    id: "2",
    name: "Dashen Bank",
    category: "Private Banks",
    logo: "🏦",
    status: "Active",
    lastUpdated: "2024-01-15 09:45",
    totalRates: 8,
    description: "Leading private bank in Ethiopia",
  },
  {
    id: "3",
    name: "Awash Bank",
    category: "Private Banks",
    logo: "🏪",
    status: "Active",
    lastUpdated: "2024-01-15 11:15",
    totalRates: 7,
    description: "One of the oldest private banks",
  },
  {
    id: "4",
    name: "Forex Bureau Central",
    category: "Private Exchangers",
    logo: "💱",
    status: "Active",
    lastUpdated: "2024-01-15 08:20",
    totalRates: 6,
    description: "Licensed foreign exchange bureau",
  },
  {
    id: "5",
    name: "Street Exchange Merkato",
    category: "Black Market",
    logo: "🏪",
    status: "Inactive",
    lastUpdated: "2024-01-14 16:30",
    totalRates: 4,
    description: "Unofficial exchange point",
  },
]

export function BankManagement() {
  const [banks, setBanks] = useState<Bank[]>(mockBanks)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingBank, setEditingBank] = useState<Bank | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Private Banks" as Bank["category"],
    logo: "",
    status: "Active" as Bank["status"],
    description: "",
  })

  const filteredBanks = banks.filter((bank) => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || bank.category === categoryFilter
    const matchesStatus = statusFilter === "all" || bank.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddBank = () => {
    const newBank: Bank = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      logo: formData.logo || "🏦",
      status: formData.status,
      lastUpdated: new Date().toLocaleString(),
      totalRates: 0,
      description: formData.description,
    }
    setBanks([...banks, newBank])
    setFormData({
      name: "",
      category: "Private Banks",
      logo: "",
      status: "Active",
      description: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditBank = (bank: Bank) => {
    setEditingBank(bank)
    setFormData({
      name: bank.name,
      category: bank.category,
      logo: bank.logo,
      status: bank.status,
      description: bank.description || "",
    })
  }

  const handleUpdateBank = () => {
    if (!editingBank) return

    const updatedBanks = banks.map((bank) =>
      bank.id === editingBank.id
        ? {
            ...bank,
            name: formData.name,
            category: formData.category,
            logo: formData.logo || bank.logo,
            status: formData.status,
            description: formData.description,
            lastUpdated: new Date().toLocaleString(),
          }
        : bank,
    )
    setBanks(updatedBanks)
    setEditingBank(null)
    setFormData({
      name: "",
      category: "Private Banks",
      logo: "",
      status: "Active",
      description: "",
    })
  }

  const handleDeleteBank = (bankId: string) => {
    setBanks(banks.filter((bank) => bank.id !== bankId))
  }

  const getCategoryColor = (category: Bank["category"]) => {
    switch (category) {
      case "Government Banks":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Private Banks":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Private Exchangers":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Black Market":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const BankForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Bank Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter bank name"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as Bank["category"] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Government Banks">Government Banks</SelectItem>
            <SelectItem value="Private Banks">Private Banks</SelectItem>
            <SelectItem value="Private Exchangers">Private Exchangers</SelectItem>
            <SelectItem value="Black Market">Black Market</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="logo">Logo (Emoji)</Label>
        <Input
          id="logo"
          value={formData.logo}
          onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          placeholder="🏦"
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as Bank["status"] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter bank description"
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bank Management</h2>
          <p className="text-muted-foreground">Manage banks and their categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Bank</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bank</DialogTitle>
            </DialogHeader>
            <BankForm />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBank}>Add Bank</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search banks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Government Banks">Government Banks</SelectItem>
            <SelectItem value="Private Banks">Private Banks</SelectItem>
            <SelectItem value="Private Exchangers">Private Exchangers</SelectItem>
            <SelectItem value="Black Market">Black Market</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Banks Table */}
      <div className="bg-card border border-border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bank</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rates</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBanks.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{bank.logo}</span>
                    <div>
                      <div className="font-medium text-foreground">{bank.name}</div>
                      {bank.description && <div className="text-sm text-muted-foreground">{bank.description}</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(bank.category)}>{bank.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={bank.status === "Active" ? "default" : "secondary"}>{bank.status}</Badge>
                </TableCell>
                <TableCell>{bank.totalRates} currencies</TableCell>
                <TableCell className="text-muted-foreground">{bank.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditBank(bank)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteBank(bank.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingBank} onOpenChange={() => setEditingBank(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bank</DialogTitle>
          </DialogHeader>
          <BankForm />
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setEditingBank(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBank}>Update Bank</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">{banks.length}</div>
          <div className="text-sm text-muted-foreground">Total Banks</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">{banks.filter((b) => b.status === "Active").length}</div>
          <div className="text-sm text-muted-foreground">Active Banks</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">
            {banks.filter((b) => b.category === "Private Banks").length}
          </div>
          <div className="text-sm text-muted-foreground">Private Banks</div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">
            {banks.filter((b) => b.category === "Government Banks").length}
          </div>
          <div className="text-sm text-muted-foreground">Government Banks</div>
        </div>
      </div>
    </div>
  )
}
