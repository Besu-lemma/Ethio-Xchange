"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Save, Edit3, Plus, Trash2 } from "lucide-react"

interface CurrencyRate {
  id: string
  currency: string
  buyRate: string
  sellRate: string
  isEditing: boolean
}

const CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
]

export function CurrencyRatesTable() {
  const { toast } = useToast()
  const [rates, setRates] = useState<CurrencyRate[]>([
    { id: "1", currency: "USD", buyRate: "142", sellRate: "145", isEditing: false },
    { id: "2", currency: "EUR", buyRate: "155", sellRate: "160", isEditing: false },
    { id: "3", currency: "GBP", buyRate: "175", sellRate: "180", isEditing: false },
    { id: "4", currency: "JPY", buyRate: "0.95", sellRate: "1.05", isEditing: false },
  ])

  const handleEdit = (id: string) => {
    setRates(rates.map((rate) => (rate.id === id ? { ...rate, isEditing: true } : rate)))
  }

  const handleSave = (id: string) => {
    setRates(rates.map((rate) => (rate.id === id ? { ...rate, isEditing: false } : rate)))
    toast({
      title: "Rate Updated",
      description: "Currency rate has been successfully updated.",
    })
  }

  const handleRateChange = (id: string, field: "buyRate" | "sellRate", value: string) => {
    // Only allow numbers and decimal points
    if (!/^\d*\.?\d*$/.test(value)) return

    setRates(rates.map((rate) => (rate.id === id ? { ...rate, [field]: value } : rate)))
  }

  const handleCurrencyChange = (id: string, currency: string) => {
    setRates(rates.map((rate) => (rate.id === id ? { ...rate, currency } : rate)))
  }

  const addNewRate = () => {
    const newRate: CurrencyRate = {
      id: Date.now().toString(),
      currency: "",
      buyRate: "",
      sellRate: "",
      isEditing: true,
    }
    setRates([...rates, newRate])
  }

  const deleteRate = (id: string) => {
    setRates(rates.filter((rate) => rate.id !== id))
    toast({
      title: "Rate Deleted",
      description: "Currency rate has been removed.",
    })
  }

  const saveAllRates = () => {
    // Validate all rates
    const hasEmptyFields = rates.some((rate) => !rate.currency || !rate.buyRate || !rate.sellRate)

    if (hasEmptyFields) {
      toast({
        title: "Validation Error",
        description: "Please fill in all currency rate fields.",
        variant: "destructive",
      })
      return
    }

    // Set all rates to non-editing mode
    setRates(rates.map((rate) => ({ ...rate, isEditing: false })))

    toast({
      title: "Rates Approved",
      description: "All currency rates have been successfully saved and approved.",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Currency Exchange Rates</CardTitle>
        <Button onClick={addNewRate} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Currency</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-2 font-semibold text-foreground">Currency</th>
                <th className="text-left py-4 px-2 font-semibold text-foreground">Buy Rate</th>
                <th className="text-left py-4 px-2 font-semibold text-foreground">Sell Rate</th>
                <th className="text-left py-4 px-2 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr key={rate.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-2">
                    {rate.isEditing ? (
                      <Select value={rate.currency} onValueChange={(value) => handleCurrencyChange(rate.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{rate.currency}</span>
                        <span className="text-sm text-muted-foreground">
                          {CURRENCIES.find((c) => c.code === rate.currency)?.name}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    {rate.isEditing ? (
                      <Input
                        type="text"
                        value={rate.buyRate}
                        onChange={(e) => handleRateChange(rate.id, "buyRate", e.target.value)}
                        className="w-24"
                        placeholder="0.00"
                      />
                    ) : (
                      <span className="font-mono text-foreground">{rate.buyRate}</span>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    {rate.isEditing ? (
                      <Input
                        type="text"
                        value={rate.sellRate}
                        onChange={(e) => handleRateChange(rate.id, "sellRate", e.target.value)}
                        className="w-24"
                        placeholder="0.00"
                      />
                    ) : (
                      <span className="font-mono text-foreground">{rate.sellRate}</span>
                    )}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      {rate.isEditing ? (
                        <Button size="sm" onClick={() => handleSave(rate.id)} className="flex items-center space-x-1">
                          <Save className="w-3 h-3" />
                          <span>Save</span>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(rate.id)}
                          className="flex items-center space-x-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteRate(rate.id)}
                        className="flex items-center space-x-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={saveAllRates} className="flex items-center space-x-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            <span>Save & Approve All Rates</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
