"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Save,
  X,
  TrendingUp,
  TrendingDown,
  Upload,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CurrencyRate {
  id: string;
  bankName: string;
  bankId: string;
  currency: string;
  currencyCode: string;
  buyRate: number;
  sellRate: number;
  lastUpdated: string;
  updatedBy: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
  status: "active" | "outdated" | "pending";
}

const mockRates: CurrencyRate[] = [
  {
    id: "1",
    bankName: "Commercial Bank of Ethiopia",
    bankId: "cbe",
    currency: "US Dollar",
    currencyCode: "USD",
    buyRate: 55.25,
    sellRate: 56.75,
    lastUpdated: "2024-01-15 10:30",
    updatedBy: "admin@ethioexchange.com",
    trend: "up",
    changePercent: 0.5,
    status: "active",
  },
  {
    id: "2",
    bankName: "Dashen Bank",
    bankId: "dashen",
    currency: "US Dollar",
    currencyCode: "USD",
    buyRate: 55.5,
    sellRate: 57.0,
    lastUpdated: "2024-01-15 09:45",
    updatedBy: "admin@ethioexchange.com",
    trend: "up",
    changePercent: 0.3,
    status: "active",
  },
  {
    id: "3",
    bankName: "Commercial Bank of Ethiopia",
    bankId: "cbe",
    currency: "Euro",
    currencyCode: "EUR",
    buyRate: 60.15,
    sellRate: 61.85,
    lastUpdated: "2024-01-15 08:20",
    updatedBy: "admin@ethioexchange.com",
    trend: "down",
    changePercent: -0.2,
    status: "outdated",
  },
  {
    id: "4",
    bankName: "Awash Bank",
    bankId: "awash",
    currency: "British Pound",
    currencyCode: "GBP",
    buyRate: 69.8,
    sellRate: 71.2,
    lastUpdated: "2024-01-15 11:15",
    updatedBy: "admin@ethioexchange.com",
    trend: "stable",
    changePercent: 0.0,
    status: "active",
  },
];

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
];

const banks = [
  { id: "cbe", name: "Commercial Bank of Ethiopia" },
  { id: "dashen", name: "Dashen Bank" },
  { id: "awash", name: "Awash Bank" },
  { id: "boa", name: "Bank of Abyssinia" },
];

export function CurrencyRateManagement() {
  const [rates, setRates] = useState<CurrencyRate[]>(mockRates);
  const [searchTerm, setSearchTerm] = useState("");
  const [bankFilter, setBankFilter] = useState<string>("all");
  const [currencyFilter, setCurrencyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingRate, setEditingRate] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ buyRate: "", sellRate: "" });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRateForm, setNewRateForm] = useState({
    bankId: "",
    currencyCode: "",
    buyRate: "",
    sellRate: "",
  });

  const filteredRates = rates.filter((rate) => {
    const matchesSearch =
      rate.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.currencyCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBank = bankFilter === "all" || rate.bankId === bankFilter;
    const matchesCurrency =
      currencyFilter === "all" || rate.currencyCode === currencyFilter;
    const matchesStatus =
      statusFilter === "all" || rate.status === statusFilter;
    return matchesSearch && matchesBank && matchesCurrency && matchesStatus;
  });

  const handleEditStart = (
    rateId: string,
    buyRate: number,
    sellRate: number
  ) => {
    setEditingRate(rateId);
    setEditValues({
      buyRate: buyRate.toString(),
      sellRate: sellRate.toString(),
    });
  };

  const handleEditSave = (rateId: string) => {
    const updatedRates = rates.map((rate) =>
      rate.id === rateId
        ? {
            ...rate,
            buyRate: Number.parseFloat(editValues.buyRate),
            sellRate: Number.parseFloat(editValues.sellRate),
            lastUpdated: new Date().toLocaleString(),
            status: "active" as const,
          }
        : rate
    );
    setRates(updatedRates);
    setEditingRate(null);
    setEditValues({ buyRate: "", sellRate: "" });
  };

  const handleEditCancel = () => {
    setEditingRate(null);
    setEditValues({ buyRate: "", sellRate: "" });
  };

  const handleAddRate = () => {
    const selectedBank = banks.find((b) => b.id === newRateForm.bankId);
    const selectedCurrency = currencies.find(
      (c) => c.code === newRateForm.currencyCode
    );

    if (!selectedBank || !selectedCurrency) return;

    const newRate: CurrencyRate = {
      id: Date.now().toString(),
      bankName: selectedBank.name,
      bankId: newRateForm.bankId,
      currency: selectedCurrency.name,
      currencyCode: newRateForm.currencyCode,
      buyRate: Number.parseFloat(newRateForm.buyRate),
      sellRate: Number.parseFloat(newRateForm.sellRate),
      lastUpdated: new Date().toLocaleString(),
      updatedBy: "admin@ethioexchange.com",
      trend: "stable",
      changePercent: 0,
      status: "active",
    };

    setRates([...rates, newRate]);
    setNewRateForm({ bankId: "", currencyCode: "", buyRate: "", sellRate: "" });
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: CurrencyRate["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "outdated":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTrendIcon = (trend: CurrencyRate["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const bulkUpdateRates = () => {
    // Simulate bulk update
    const updatedRates = rates.map((rate) => ({
      ...rate,
      lastUpdated: new Date().toLocaleString(),
      status: "active" as const,
    }));
    setRates(updatedRates);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Currency Rate Management
          </h2>
          <p className="text-muted-foreground">
            Manage exchange rates across all banks and currencies
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={bulkUpdateRates}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Bulk Update
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Rate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Exchange Rate</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank">Bank</Label>
                  <Select
                    value={newRateForm.bankId}
                    onValueChange={(value) =>
                      setNewRateForm({ ...newRateForm, bankId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={newRateForm.currencyCode}
                    onValueChange={(value) =>
                      setNewRateForm({ ...newRateForm, currencyCode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.flag} {currency.name} ({currency.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buyRate">Buy Rate</Label>
                    <Input
                      id="buyRate"
                      type="number"
                      step="0.01"
                      value={newRateForm.buyRate}
                      onChange={(e) =>
                        setNewRateForm({
                          ...newRateForm,
                          buyRate: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellRate">Sell Rate</Label>
                    <Input
                      id="sellRate"
                      type="number"
                      step="0.01"
                      value={newRateForm.sellRate}
                      onChange={(e) =>
                        setNewRateForm({
                          ...newRateForm,
                          sellRate: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddRate}>Add Rate</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="rates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
          <TabsTrigger value="alerts">Rate Alerts</TabsTrigger>
          <TabsTrigger value="history">Rate History</TabsTrigger>
        </TabsList>

        <TabsContent value="rates" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search rates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={bankFilter} onValueChange={setBankFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Banks</SelectItem>
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Currencies</SelectItem>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="outdated">Outdated</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rates Table */}
          <div className="bg-card border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Buy Rate</TableHead>
                  <TableHead>Sell Rate</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {rate.bankName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {
                            currencies.find((c) => c.code === rate.currencyCode)
                              ?.flag
                          }
                        </span>
                        <div>
                          <div className="font-medium">{rate.currencyCode}</div>
                          <div className="text-sm text-muted-foreground">
                            {rate.currency}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingRate === rate.id ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={editValues.buyRate}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              buyRate: e.target.value,
                            })
                          }
                          className="w-20"
                        />
                      ) : (
                        <span className="font-mono text-green-600">
                          {rate.buyRate.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRate === rate.id ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={editValues.sellRate}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              sellRate: e.target.value,
                            })
                          }
                          className="w-20"
                        />
                      ) : (
                        <span className="font-mono text-red-600">
                          {rate.sellRate.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(rate.trend)}
                        <span
                          className={`text-sm ${
                            rate.changePercent > 0
                              ? "text-green-600"
                              : rate.changePercent < 0
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {rate.changePercent > 0 ? "+" : ""}
                          {rate.changePercent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(rate.status)}>
                        {rate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {rate.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingRate === rate.id ? (
                        <div className="flex items-center space-x-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditSave(rate.id)}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleEditCancel}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            handleEditStart(
                              rate.id,
                              rate.buyRate,
                              rate.sellRate
                            )
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {rates.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {rates.filter((r) => r.status === "active").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Outdated Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {rates.filter((r) => r.status === "outdated").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Currencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {new Set(rates.map((r) => r.currencyCode)).size}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Rate Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Rate alert system will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Rate History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Historical rate data and trends will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
