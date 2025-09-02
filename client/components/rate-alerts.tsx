"use client"

import { useState } from "react"
import { Plus, Bell, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface RateAlert {
  id: string
  currency: string
  bank: string
  targetRate: number
  condition: "above" | "below"
  isActive: boolean
  createdAt: Date
}

export function RateAlerts() {
  const [alerts, setAlerts] = useState<RateAlert[]>([
    {
      id: "1",
      currency: "USD",
      bank: "Commercial Bank of Ethiopia",
      targetRate: 58.5,
      condition: "above",
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      currency: "EUR",
      bank: "Dashen Bank",
      targetRate: 65.0,
      condition: "below",
      isActive: false,
      createdAt: new Date(),
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newAlert, setNewAlert] = useState({
    currency: "",
    bank: "",
    targetRate: "",
    condition: "above" as "above" | "below",
  })

  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "SEK"]
  const banks = ["Commercial Bank of Ethiopia", "Dashen Bank", "Bank of Abyssinia", "Awash Bank", "United Bank"]

  const addAlert = () => {
    if (newAlert.currency && newAlert.bank && newAlert.targetRate) {
      const alert: RateAlert = {
        id: Date.now().toString(),
        currency: newAlert.currency,
        bank: newAlert.bank,
        targetRate: Number.parseFloat(newAlert.targetRate),
        condition: newAlert.condition,
        isActive: true,
        createdAt: new Date(),
      }
      setAlerts((prev) => [alert, ...prev])
      setNewAlert({ currency: "", bank: "", targetRate: "", condition: "above" })
      setShowForm(false)
    }
  }

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Rate Alerts
          </CardTitle>
          <Button onClick={() => setShowForm(!showForm)} size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-1" />
            Add Alert
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && (
          <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={newAlert.currency}
                  onValueChange={(value) => setNewAlert((prev) => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bank">Bank</Label>
                <Select
                  value={newAlert.bank}
                  onValueChange={(value) => setNewAlert((prev) => ({ ...prev, bank: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select
                  value={newAlert.condition}
                  onValueChange={(value: "above" | "below") => setNewAlert((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetRate">Target Rate (ETB)</Label>
                <Input
                  id="targetRate"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newAlert.targetRate}
                  onChange={(e) => setNewAlert((prev) => ({ ...prev, targetRate: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addAlert} size="sm">
                Create Alert
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${alert.condition === "above" ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"}`}
                >
                  {alert.condition === "above" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {alert.currency}/ETB {alert.condition} {alert.targetRate}
                  </div>
                  <div className="text-sm text-muted-foreground">{alert.bank}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={alert.isActive ? "default" : "secondary"}>{alert.isActive ? "Active" : "Paused"}</Badge>
                <Button onClick={() => toggleAlert(alert.id)} variant="ghost" size="sm">
                  {alert.isActive ? "Pause" : "Resume"}
                </Button>
                <Button
                  onClick={() => deleteAlert(alert.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No rate alerts set up yet</p>
            <p className="text-sm">Create your first alert to get notified when rates change</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
