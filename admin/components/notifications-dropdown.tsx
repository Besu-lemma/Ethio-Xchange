"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  time: string
}

export function NotificationsDropdown() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Rate Update Approved",
      message: "USD exchange rate has been successfully updated.",
      time: "2 min ago",
    },
    {
      id: "2",
      type: "warning",
      title: "System Maintenance",
      message: "Scheduled maintenance tonight at 2:00 AM.",
      time: "1 hour ago",
    },
    {
      id: "3",
      type: "info",
      title: "New Feature Available",
      message: "Bulk rate import feature is now available.",
      time: "3 hours ago",
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {notifications.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h3 className="font-semibold text-sm mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No new notifications</p>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3">
                  {getIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
