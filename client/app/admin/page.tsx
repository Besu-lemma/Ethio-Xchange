"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BankManagement } from "@/components/bank-management";
import { CurrencyRateManagement } from "@/components/currency-rate-management";
import { UserManagement } from "@/components/user-management";
import { AnalyticsReports } from "@/components/analytics-reports";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "banks", label: "Bank Management", icon: Building2 },
    { id: "rates", label: "Currency Rates", icon: DollarSign },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics & Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">
              EthioExchange
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${
                    activeSection === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navigation */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground capitalize">
              {activeSection === "dashboard"
                ? "Admin Dashboard"
                : activeSection.replace("-", " ")}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Banks
                      </p>
                      <p className="text-2xl font-bold text-foreground">25</p>
                    </div>
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active Users
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        1,234
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Daily Conversions
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        5,678
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Rate Updates
                      </p>
                      <p className="text-2xl font-bold text-foreground">42</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Commercial Bank of Ethiopia updated USD rates
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        New user registered: john.doe@email.com
                      </p>
                      <p className="text-xs text-muted-foreground">
                        5 minutes ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Dashen Bank added to Private Banks category
                      </p>
                      <p className="text-xs text-muted-foreground">
                        1 hour ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "banks" && <BankManagement />}

          {activeSection === "rates" && <CurrencyRateManagement />}

          {activeSection === "users" && <UserManagement />}

          {activeSection === "analytics" && <AnalyticsReports />}

          {activeSection !== "dashboard" &&
            activeSection !== "banks" &&
            activeSection !== "rates" &&
            activeSection !== "users" &&
            activeSection !== "analytics" && (
              <div className="bg-card p-8 rounded-lg border border-border text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1).replace("-", " ")}{" "}
                  Section
                </h2>
                <p className="text-muted-foreground">
                  This section will be implemented in the next steps.
                </p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
}
