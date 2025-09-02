"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft, Calculator, TrendingUp, RefreshCw } from "lucide-react"

const ethiopianBanks = [
  {
    id: "cbe",
    name: "Commercial Bank of Ethiopia",
    rates: {
      USD: 57.85,
      EUR: 62.45,
      GBP: 73.2,
      CAD: 42.15,
      AUD: 38.9,
      JPY: 0.39,
      CHF: 63.8,
      CNY: 8.05,
      ETB: 1.0,
    },
  },
  {
    id: "dashen",
    name: "Dashen Bank",
    rates: {
      USD: 58.12,
      EUR: 62.75,
      GBP: 73.55,
      CAD: 42.35,
      AUD: 39.1,
      JPY: 0.4,
      CHF: 64.1,
      CNY: 8.1,
      ETB: 1.0,
    },
  },
  {
    id: "awash",
    name: "Awash Bank",
    rates: {
      USD: 57.95,
      EUR: 62.6,
      GBP: 73.35,
      CAD: 42.25,
      AUD: 39.0,
      JPY: 0.39,
      CHF: 63.95,
      CNY: 8.08,
      ETB: 1.0,
    },
  },
  {
    id: "boa",
    name: "Bank of Abyssinia",
    rates: {
      USD: 58.05,
      EUR: 62.65,
      GBP: 73.4,
      CAD: 42.3,
      AUD: 39.05,
      JPY: 0.4,
      CHF: 64.0,
      CNY: 8.09,
      ETB: 1.0,
    },
  },
  {
    id: "nib",
    name: "Nib International Bank",
    rates: {
      USD: 58.2,
      EUR: 62.8,
      GBP: 73.6,
      CAD: 42.4,
      AUD: 39.15,
      JPY: 0.4,
      CHF: 64.15,
      CNY: 8.12,
      ETB: 1.0,
    },
  },
  {
    id: "coop",
    name: "Cooperative Bank of Oromia",
    rates: {
      USD: 57.9,
      EUR: 62.55,
      GBP: 73.3,
      CAD: 42.2,
      AUD: 38.95,
      JPY: 0.39,
      CHF: 63.9,
      CNY: 8.07,
      ETB: 1.0,
    },
  },
  {
    id: "lion",
    name: "Lion International Bank",
    rates: {
      USD: 58.15,
      EUR: 62.7,
      GBP: 73.5,
      CAD: 42.35,
      AUD: 39.1,
      JPY: 0.4,
      CHF: 64.05,
      CNY: 8.11,
      ETB: 1.0,
    },
  },
  {
    id: "wegagen",
    name: "Wegagen Bank",
    rates: {
      USD: 58.0,
      EUR: 62.65,
      GBP: 73.45,
      CAD: 42.3,
      AUD: 39.0,
      JPY: 0.4,
      CHF: 64.0,
      CNY: 8.09,
      ETB: 1.0,
    },
  },
]

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "ETB", name: "Ethiopian Birr", flag: "🇪🇹" },
]

export function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [fromCurrency, setFromCurrency] = useState("")
  const [toCurrency, setToCurrency] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [isConverting, setIsConverting] = useState(false)

  const handleConvert = async () => {
    if (!amount || !selectedBank || !fromCurrency || !toCurrency) return

    setIsConverting(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const bank = ethiopianBanks.find((b) => b.id === selectedBank)
    if (bank) {
      const fromRate = bank.rates[fromCurrency as keyof typeof bank.rates]
      const toRate = bank.rates[toCurrency as keyof typeof bank.rates]

      // Convert from source currency to ETB, then to target currency
      const etbAmount = Number.parseFloat(amount) * fromRate
      const convertedAmount = etbAmount / toRate

      setResult(convertedAmount)
    }

    setIsConverting(false)
  }

  const handleSwapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setResult(null)
  }

  const selectedBankData = ethiopianBanks.find((b) => b.id === selectedBank)
  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency)
  const toCurrencyData = currencies.find((c) => c.code === toCurrency)

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border border-border shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Calculator className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-bold text-card-foreground">Currency Converter</CardTitle>
          </div>
          <p className="text-muted-foreground">Convert between any currencies using Ethiopian bank rates</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-card-foreground">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg h-12 bg-background border-border focus:ring-primary"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">From Currency</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="h-12 bg-background border-border">
                    <SelectValue placeholder="Select from currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center space-x-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-muted-foreground">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">To Currency</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="h-12 bg-background border-border">
                    <SelectValue placeholder="Select to currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center space-x-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-muted-foreground">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapCurrencies}
                disabled={!fromCurrency || !toCurrency}
                className="flex items-center space-x-2 hover:bg-secondary/80 bg-transparent"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Swap</span>
              </Button>
            </div>
          </div>

          {/* Bank Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-card-foreground">Bank</Label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="h-12 bg-background border-border">
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                {ethiopianBanks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{bank.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">USD Rate: {bank.rates.USD}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button
            onClick={handleConvert}
            disabled={!amount || !selectedBank || !fromCurrency || !toCurrency || isConverting}
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {isConverting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Converting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5" />
                <span>Convert {fromCurrency && toCurrency ? `${fromCurrency} to ${toCurrency}` : "Currency"}</span>
              </div>
            )}
          </Button>

          {result !== null && selectedBankData && fromCurrencyData && toCurrencyData && (
            <Card className="bg-secondary/10 border-secondary/20 animate-in slide-in-from-bottom-4 duration-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <span>{fromCurrencyData.flag}</span>
                    <span>
                      {amount} {fromCurrency}
                    </span>
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>{toCurrencyData.flag}</span>
                    <span>{toCurrency}</span>
                  </div>

                  <div className="text-3xl font-bold text-card-foreground">
                    {result.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-lg font-normal text-muted-foreground">{toCurrency}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      Rate: 1 {fromCurrency} ={" "}
                      {(
                        selectedBankData.rates[fromCurrency as keyof typeof selectedBankData.rates] /
                        selectedBankData.rates[toCurrency as keyof typeof selectedBankData.rates]
                      ).toFixed(4)}{" "}
                      {toCurrency}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground">Via {selectedBankData.name}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
