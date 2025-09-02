"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";

// Mock currency rates data
const currencyRates = {
  USD: {
    name: "US Dollar",
    flag: "🇺🇸",
    buyRate: 57.85,
    sellRate: 58.15,
    change: 0.25,
    lastUpdated: "2 minutes ago",
    trend: "up",
  },
  EUR: {
    name: "Euro",
    flag: "🇪🇺",
    buyRate: 62.45,
    sellRate: 62.8,
    change: -0.15,
    lastUpdated: "3 minutes ago",
    trend: "down",
  },
  GBP: {
    name: "British Pound",
    flag: "🇬🇧",
    buyRate: 71.2,
    sellRate: 71.65,
    change: 0.45,
    lastUpdated: "1 minute ago",
    trend: "up",
  },
  CAD: {
    name: "Canadian Dollar",
    flag: "🇨🇦",
    buyRate: 42.15,
    sellRate: 42.45,
    change: 0.1,
    lastUpdated: "4 minutes ago",
    trend: "up",
  },
  AUD: {
    name: "Australian Dollar",
    flag: "🇦🇺",
    buyRate: 37.85,
    sellRate: 38.15,
    change: -0.2,
    lastUpdated: "5 minutes ago",
    trend: "down",
  },
  JPY: {
    name: "Japanese Yen",
    flag: "🇯🇵",
    buyRate: 0.385,
    sellRate: 0.395,
    change: 0.005,
    lastUpdated: "2 minutes ago",
    trend: "up",
  },
  CHF: {
    name: "Swiss Franc",
    flag: "🇨🇭",
    buyRate: 64.2,
    sellRate: 64.55,
    change: 0.15,
    lastUpdated: "6 minutes ago",
    trend: "up",
  },
  CNY: {
    name: "Chinese Yuan",
    flag: "🇨🇳",
    buyRate: 7.95,
    sellRate: 8.05,
    change: -0.05,
    lastUpdated: "3 minutes ago",
    trend: "down",
  },
};

const majorCurrencies = ["USD", "EUR", "GBP", "CAD"];
const otherCurrencies = ["AUD", "JPY", "CHF", "CNY"];

function CurrencyCard({ currency, data }: { currency: string; data: any }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/80">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{data.flag}</span>
            <div>
              <h3 className="font-semibold text-card-foreground text-lg">
                {currency}
              </h3>
              <p className="text-sm text-muted-foreground">{data.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {data.trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-secondary" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span
              className={`text-sm font-medium ${
                data.trend === "up" ? "text-secondary" : "text-destructive"
              }`}
            >
              {data.change > 0 ? "+" : ""}
              {data.change}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-xs text-muted-foreground mb-1">Buy Rate</p>
            <p className="text-lg font-bold text-card-foreground">
              {data.buyRate.toFixed(currency === "JPY" ? 3 : 2)}
            </p>
            <p className="text-xs text-muted-foreground">ETB</p>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Sell Rate</p>
            <p className="text-lg font-bold text-card-foreground">
              {data.sellRate.toFixed(currency === "JPY" ? 3 : 2)}
            </p>
            <p className="text-xs text-muted-foreground">ETB</p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Updated {data.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function CurrencyRatesDisplay() {
  const [activeTab, setActiveTab] = useState("major");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-card-foreground">
            Live Exchange Rates
          </h3>
        </div>
        <Badge
          variant="secondary"
          className="bg-secondary/20 text-secondary-foreground"
        >
          Live Updates
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="major" className="flex items-center space-x-2">
            <span>Major Currencies</span>
            <Badge variant="outline" className="ml-2">
              4
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="other" className="flex items-center space-x-2">
            <span>Other Currencies</span>
            <Badge variant="outline" className="ml-2">
              4
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="major" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {majorCurrencies.map((currency) => (
              <CurrencyCard
                key={currency}
                currency={currency}
                data={currencyRates[currency as keyof typeof currencyRates]}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherCurrencies.map((currency) => (
              <CurrencyCard
                key={currency}
                currency={currency}
                data={currencyRates[currency as keyof typeof currencyRates]}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <div className="text-center text-xs text-muted-foreground mt-6">
        <p>Rates are indicative and may vary between banks. Last updated: {new Date().toLocaleTimeString()}</p>
      </div> */}
    </div>
  );
}
