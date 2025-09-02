"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Users, DollarSign, Building2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts"

// Mock data for analytics
const conversionData = [
  { month: "Jan", conversions: 1200, users: 450, revenue: 2400 },
  { month: "Feb", conversions: 1800, users: 680, revenue: 3600 },
  { month: "Mar", conversions: 2200, users: 820, revenue: 4400 },
  { month: "Apr", conversions: 1900, users: 720, revenue: 3800 },
  { month: "May", conversions: 2800, users: 1050, revenue: 5600 },
  { month: "Jun", conversions: 3200, users: 1200, revenue: 6400 },
  { month: "Jul", conversions: 2900, users: 1100, revenue: 5800 },
  { month: "Aug", conversions: 3500, users: 1300, revenue: 7000 },
  { month: "Sep", conversions: 3100, users: 1150, revenue: 6200 },
  { month: "Oct", conversions: 3800, users: 1400, revenue: 7600 },
  { month: "Nov", conversions: 4200, users: 1550, revenue: 8400 },
  { month: "Dec", conversions: 4800, users: 1750, revenue: 9600 },
]

const currencyDistribution = [
  { name: "USD", value: 45, color: "#8b5cf6" },
  { name: "EUR", value: 25, color: "#d97706" },
  { name: "GBP", value: 15, color: "#0891b2" },
  { name: "CAD", value: 8, color: "#4b5563" },
  { name: "Others", value: 7, color: "#6b7280" },
]

const bankPerformance = [
  { bank: "Commercial Bank", conversions: 1200, growth: 12.5 },
  { bank: "Dashen Bank", conversions: 980, growth: 8.3 },
  { bank: "Awash Bank", conversions: 850, growth: 15.2 },
  { bank: "Bank of Abyssinia", conversions: 720, growth: -2.1 },
  { bank: "Wegagen Bank", conversions: 650, growth: 6.8 },
]

const dailyActivity = [
  { hour: "00", conversions: 12 },
  { hour: "02", conversions: 8 },
  { hour: "04", conversions: 5 },
  { hour: "06", conversions: 15 },
  { hour: "08", conversions: 45 },
  { hour: "10", conversions: 78 },
  { hour: "12", conversions: 95 },
  { hour: "14", conversions: 88 },
  { hour: "16", conversions: 102 },
  { hour: "18", conversions: 85 },
  { hour: "20", conversions: 65 },
  { hour: "22", conversions: 35 },
]

export function AnalyticsReports() {
  const [timeRange, setTimeRange] = useState("12months")
  const [reportType, setReportType] = useState("overview")

  const exportReport = (type: string) => {
    // Simulate report export
    console.log(`Exporting ${type} report...`)
  }

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
  }: {
    title: string
    value: string
    change: string
    icon: any
    trend: "up" | "down"
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className={`text-xs flex items-center space-x-1 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{change} from last month</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport("overview")}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="banks">Banks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Total Conversions" value="38,420" change="+12.5%" icon={DollarSign} trend="up" />
            <MetricCard title="Active Users" value="12,340" change="+8.2%" icon={Users} trend="up" />
            <MetricCard title="Total Banks" value="25" change="+4.2%" icon={Building2} trend="up" />
            <MetricCard title="Avg. Daily Volume" value="$2.4M" change="-2.1%" icon={DollarSign} trend="down" />
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="conversions" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currency Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currencyDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {currencyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bank Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Banks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankPerformance.map((bank, index) => (
                  <div key={bank.bank} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{bank.bank}</div>
                        <div className="text-sm text-muted-foreground">{bank.conversions} conversions</div>
                      </div>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${bank.growth >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {bank.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-medium">
                        {bank.growth >= 0 ? "+" : ""}
                        {bank.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversions" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Activity Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dailyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="conversions" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Average Daily Volume</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">1,280</div>
                  <div className="text-sm text-muted-foreground">Average Daily Conversions</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">$1,875</div>
                  <div className="text-sm text-muted-foreground">Average Conversion Value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stroke="#d97706" fill="#d97706" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Active Users</span>
                    <span className="font-medium">3,240</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly Active Users</span>
                    <span className="font-medium">8,950</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Active Users</span>
                    <span className="font-medium">12,340</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1-day retention</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7-day retention</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">30-day retention</span>
                    <span className="font-medium">42%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Addis Ababa</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dire Dawa</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Other Cities</span>
                    <span className="font-medium">37%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="banks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bank Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={bankPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bank" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="conversions" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Government Banks</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="w-3/4 bg-primary h-2 rounded-full"></div>
                      </div>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Private Banks</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="w-full bg-primary h-2 rounded-full"></div>
                      </div>
                      <span className="font-medium">15</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Private Exchangers</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div className="w-1/4 bg-primary h-2 rounded-full"></div>
                      </div>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Update Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Updates</span>
                    <span className="font-medium">18 banks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly Updates</span>
                    <span className="font-medium">5 banks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manual Updates</span>
                    <span className="font-medium">2 banks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("revenue")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Revenue Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("conversion")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Conversion Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("commission")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Commission Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("users")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  User Activity Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("engagement")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Engagement Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("retention")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Retention Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("banks")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Bank Performance Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("rates")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Rate History Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => exportReport("system")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  System Usage Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Daily Summary Report</div>
                    <div className="text-sm text-muted-foreground">Sent every day at 9:00 AM</div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Weekly Performance Report</div>
                    <div className="text-sm text-muted-foreground">Sent every Monday at 8:00 AM</div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">Monthly Analytics Report</div>
                    <div className="text-sm text-muted-foreground">Sent on the 1st of each month</div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
