"use client"

import { useState, useEffect } from "react"
import { X, TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "rate-change" | "alert" | "news" | "info"
  title: string
  message: string
  timestamp: Date
  currency?: string
  change?: number
}

export function NotificationBanner() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "rate-change",
        title: "USD Rate Alert",
        message: "USD/ETB rate increased by 2.3% in the last hour",
        timestamp: new Date(),
        currency: "USD",
        change: 2.3,
      },
      {
        id: "2",
        type: "news",
        title: "Market Update",
        message: "Ethiopian National Bank announces new foreign exchange regulations",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "3",
        type: "alert",
        title: "Price Alert Triggered",
        message: "EUR/ETB reached your target rate of 65.50",
        timestamp: new Date(Date.now() - 600000),
        currency: "EUR",
      },
    ]

    setNotifications(mockNotifications)

    // Simulate new notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? "rate-change" : "info",
        title: "Live Update",
        message: `${["USD", "EUR", "GBP"][Math.floor(Math.random() * 3)]}/ETB rate updated`,
        timestamp: new Date(),
        change: (Math.random() - 0.5) * 5,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Auto-rotate notifications
  useEffect(() => {
    if (notifications.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [notifications.length])

  const getIcon = (type: string) => {
    switch (type) {
      case "rate-change":
        return <TrendingUp className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "news":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    if (currentIndex >= notifications.length - 1) {
      setCurrentIndex(0)
    }
  }

  if (notifications.length === 0) return null

  const currentNotification = notifications[currentIndex]

  return (
    <div className="bg-secondary text-secondary-foreground px-4 py-3 relative overflow-hidden">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 flex-1">
          {getIcon(currentNotification.type)}
          <div className="flex-1">
            <span className="font-medium">{currentNotification.title}</span>
            <span className="ml-2">{currentNotification.message}</span>
          </div>
          {currentNotification.change && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                currentNotification.change > 0 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
              }`}
            >
              {currentNotification.change > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(currentNotification.change).toFixed(1)}%
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {notifications.length > 1 && (
            <div className="flex gap-1">
              {notifications.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-secondary-foreground" : "bg-secondary-foreground/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dismissNotification(currentNotification.id)}
            className="h-6 w-6 p-0 hover:bg-secondary-foreground/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
