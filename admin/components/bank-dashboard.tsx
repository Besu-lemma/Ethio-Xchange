"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"
import { Navbar } from "./navbar"
import { CurrencyRatesTable } from "./currency-rates-table"
import { ProfileSettings } from "./profile-settings"

export function BankDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "profile">("dashboard")
  const { toast } = useToast()

  return (
    <div className="min-h-screen bg-background">
      <Navbar onViewChange={setCurrentView} currentView={currentView} />

      <main className="container mx-auto px-4 py-8">
        {currentView === "dashboard" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Currency Rates Management</h1>
              <Badge variant="secondary" className="text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                System Online
              </Badge>
            </div>

            <CurrencyRatesTable />
          </div>
        ) : (
          <ProfileSettings onBack={() => setCurrentView("dashboard")} />
        )}
      </main>
    </div>
  )
}
