"use client"

import { useState, useEffect } from "react"
import { Clock, ExternalLink, TrendingUp, Globe, Building2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface NewsItem {
  id: string
  title: string
  summary: string
  category: "market" | "policy" | "bank" | "global"
  timestamp: Date
  impact: "high" | "medium" | "low"
  source: string
}

export function MarketNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: "1",
        title: "Ethiopian National Bank Adjusts Foreign Exchange Regulations",
        summary: "New regulations aim to increase foreign currency availability and reduce black market activities.",
        category: "policy",
        timestamp: new Date(Date.now() - 3600000),
        impact: "high",
        source: "Ethiopian Herald",
      },
      {
        id: "2",
        title: "Commercial Bank of Ethiopia Reports Strong Q4 Performance",
        summary: "CBE announces 15% increase in foreign currency reserves, strengthening ETB position.",
        category: "bank",
        timestamp: new Date(Date.now() - 7200000),
        impact: "medium",
        source: "Addis Fortune",
      },
      {
        id: "3",
        title: "Global USD Strengthens Against Emerging Market Currencies",
        summary: "Federal Reserve signals potential rate hikes affecting emerging market currencies including ETB.",
        category: "global",
        timestamp: new Date(Date.now() - 10800000),
        impact: "high",
        source: "Reuters",
      },
      {
        id: "4",
        title: "Dashen Bank Launches New Foreign Exchange Service",
        summary: "Digital platform promises faster processing and competitive rates for currency exchange.",
        category: "bank",
        timestamp: new Date(Date.now() - 14400000),
        impact: "low",
        source: "Capital Ethiopia",
      },
      {
        id: "5",
        title: "Ethiopia's Export Revenue Reaches Record High",
        summary: "Coffee and gold exports drive foreign currency earnings, potentially strengthening ETB.",
        category: "market",
        timestamp: new Date(Date.now() - 18000000),
        impact: "medium",
        source: "Ethiopian News Agency",
      },
    ]

    setNews(mockNews)
  }, [])

  const categories = [
    { id: "all", label: "All News", icon: Globe },
    { id: "market", label: "Market", icon: TrendingUp },
    { id: "policy", label: "Policy", icon: Building2 },
    { id: "bank", label: "Banking", icon: Building2 },
    { id: "global", label: "Global", icon: Globe },
  ]

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "market":
        return <TrendingUp className="h-4 w-4" />
      case "policy":
        return <Building2 className="h-4 w-4" />
      case "bank":
        return <Building2 className="h-4 w-4" />
      case "global":
        return <Globe className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Market News & Updates
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="h-8"
              >
                <Icon className="h-3 w-3 mr-1" />
                {category.label}
              </Button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredNews.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(item.category)}
                    <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimeAgo(item.timestamp)}
                    </div>
                    <span>•</span>
                    <span>{item.source}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getImpactColor(item.impact)}>{item.impact.toUpperCase()}</Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
