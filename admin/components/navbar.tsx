"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Settings, LogOut, User, Building2 } from "lucide-react"
import { NotificationsDropdown } from "./notifications-dropdown"

interface NavbarProps {
  onViewChange: (view: "dashboard" | "profile") => void
  currentView: "dashboard" | "profile"
}

export function Navbar({ onViewChange, currentView }: NavbarProps) {
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Bank Logo and Name */}
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">SecureBank Admin</h1>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationsDropdown />

            {/* Profile/Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onViewChange("profile")} className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-destructive">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
