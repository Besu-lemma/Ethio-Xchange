// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import { TrendingUp, BarChart3, LineChartIcon, Calendar } from "lucide-react";

// // Mock historical data
// const generateMockData = (period: string, bank: string, currency: string) => {
//   const baseRate =
//     currency === "USD" ? 57.85 : currency === "EUR" ? 62.45 : 71.2;
//   const dataPoints =
//     period === "daily"
//       ? 30
//       : period === "weekly"
//       ? 12
//       : period === "monthly"
//       ? 12
//       : 5;

//   return Array.from({ length: dataPoints }, (_, i) => {
//     const variation = (Math.random() - 0.5) * 2;
//     const rate = baseRate + variation;

//     let date;
//     if (period === "daily") {
//       date = new Date(Date.now() - (dataPoints - i - 1) * 24 * 60 * 60 * 1000);
//       return {
//         date: date.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//         }),
//         rate: Number(rate.toFixed(2)),
//         volume: Math.floor(Math.random() * 1000000) + 500000,
//       };
//     } else if (period === "weekly") {
//       date = new Date(
//         Date.now() - (dataPoints - i - 1) * 7 * 24 * 60 * 60 * 1000
//       );
//       return {
//         date: `Week ${i + 1}`,
//         rate: Number(rate.toFixed(2)),
//         volume: Math.floor(Math.random() * 5000000) + 2000000,
//       };
//     } else if (period === "monthly") {
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];
//       return {
//         date: months[(new Date().getMonth() - dataPoints + i + 1 + 12) % 12],
//         rate: Number(rate.toFixed(2)),
//         volume: Math.floor(Math.random() * 20000000) + 10000000,
//       };
//     } else {
//       return {
//         date: `${new Date().getFullYear() - dataPoints + i + 1}`,
//         rate: Number(rate.toFixed(2)),
//         volume: Math.floor(Math.random() * 100000000) + 50000000,
//       };
//     }
//   });
// };

// const banks = [
//   { id: "cbe", name: "Commercial Bank of Ethiopia" },
//   { id: "dashen", name: "Dashen Bank" },
//   { id: "awash", name: "Awash Bank" },
//   { id: "boa", name: "Bank of Abyssinia" },
//   { id: "nib", name: "Nib International Bank" },
// ];

// const currencies = [
//   { code: "USD", name: "US Dollar", flag: "🇺🇸" },
//   { code: "EUR", name: "Euro", flag: "🇪🇺" },
//   { code: "GBP", name: "British Pound", flag: "🇬🇧" },
// ];

// const periods = [
//   { value: "daily", label: "Daily (30 days)" },
//   { value: "weekly", label: "Weekly (12 weeks)" },
//   { value: "monthly", label: "Monthly (12 months)" },
//   { value: "yearly", label: "Yearly (5 years)" },
// ];

// export function TrendsChart() {
//   const [selectedBank, setSelectedBank] = useState("cbe");
//   const [selectedCurrency, setSelectedCurrency] = useState("USD");
//   const [selectedPeriod, setSelectedPeriod] = useState("daily");
//   const [chartType, setChartType] = useState<"line" | "bar">("line");

//   const data = generateMockData(selectedPeriod, selectedBank, selectedCurrency);
//   const selectedBankData = banks.find((b) => b.id === selectedBank);
//   const selectedCurrencyData = currencies.find(
//     (c) => c.code === selectedCurrency
//   );

//   const currentRate = data[data.length - 1]?.rate || 0;
//   const previousRate = data[data.length - 2]?.rate || 0;
//   const rateChange = currentRate - previousRate;
//   const rateChangePercent = ((rateChange / previousRate) * 100).toFixed(2);

//   return (
//     <div className="space-y-6">
//       {/* Header with Controls */}
//       <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//         <div className="flex items-center space-x-2">
//           <TrendingUp className="w-6 h-6 text-primary" />
//           <h3 className="text-xl font-semibold text-card-foreground">
//             Exchange Rate Trends
//           </h3>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Chart Type Toggle */}
//           <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
//             <Button
//               variant={chartType === "line" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setChartType("line")}
//               className="h-8 px-3"
//             >
//               <LineChartIcon className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={chartType === "bar" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => setChartType("bar")}
//               className="h-8 px-3"
//             >
//               <BarChart3 className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Period Selection */}
//           <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
//             <SelectTrigger className="w-40">
//               <Calendar className="w-4 h-4 mr-2" />
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {periods.map((period) => (
//                 <SelectItem key={period.value} value={period.value}>
//                   {period.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Currency Selection */}
//           <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
//             <SelectTrigger className="w-32">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {currencies.map((currency) => (
//                 <SelectItem key={currency.code} value={currency.code}>
//                   <div className="flex items-center space-x-2">
//                     <span>{currency.flag}</span>
//                     <span>{currency.code}</span>
//                   </div>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Bank Selection */}
//           <Select value={selectedBank} onValueChange={setSelectedBank}>
//             <SelectTrigger className="w-48">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {banks.map((bank) => (
//                 <SelectItem key={bank.id} value={bank.id}>
//                   {bank.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Current Rate Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground mb-1">Current Rate</p>
//               <p className="text-2xl font-bold text-card-foreground">
//                 {currentRate.toFixed(2)}{" "}
//                 <span className="text-sm font-normal">ETB</span>
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 {selectedCurrencyData?.flag} 1 {selectedCurrency} → 🇪🇹 ETB
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground mb-1">Change</p>
//               <div className="flex items-center justify-center space-x-2">
//                 <p
//                   className={`text-2xl font-bold ${
//                     rateChange >= 0 ? "text-secondary" : "text-destructive"
//                   }`}
//                 >
//                   {rateChange >= 0 ? "+" : ""}
//                   {rateChange.toFixed(2)}
//                 </p>
//                 <Badge
//                   variant={rateChange >= 0 ? "secondary" : "destructive"}
//                   className="text-xs"
//                 >
//                   {rateChangePercent}%
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground mb-1">Bank</p>
//               <p className="text-lg font-semibold text-card-foreground">
//                 {selectedBankData?.name}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 {periods.find((p) => p.value === selectedPeriod)?.label}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">
//             {selectedCurrency} to ETB Exchange Rate -{" "}
//             {periods.find((p) => p.value === selectedPeriod)?.label}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               {chartType === "line" ? (
//                 <LineChart
//                   data={data}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//                   <XAxis
//                     dataKey="date"
//                     tick={{ fontSize: 12 }}
//                     tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
//                   />
//                   <YAxis
//                     tick={{ fontSize: 12 }}
//                     tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
//                     domain={["dataMin - 0.5", "dataMax + 0.5"]}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "hsl(var(--card))",
//                       border: "1px solid hsl(var(--border))",
//                       borderRadius: "8px",
//                       fontSize: "12px",
//                     }}
//                     formatter={(value: any) => [
//                       `${value} ETB`,
//                       "Exchange Rate",
//                     ]}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="rate"
//                     stroke="hsl(var(--primary))"
//                     strokeWidth={2}
//                     dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
//                     activeDot={{
//                       r: 6,
//                       stroke: "hsl(var(--primary))",
//                       strokeWidth: 2,
//                     }}
//                   />
//                 </LineChart>
//               ) : (
//                 <BarChart
//                   data={data}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
//                   <XAxis
//                     dataKey="date"
//                     tick={{ fontSize: 12 }}
//                     tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
//                   />
//                   <YAxis
//                     tick={{ fontSize: 12 }}
//                     tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
//                     domain={["dataMin - 0.5", "dataMax + 0.5"]}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "hsl(var(--card))",
//                       border: "1px solid hsl(var(--border))",
//                       borderRadius: "8px",
//                       fontSize: "12px",
//                     }}
//                     formatter={(value: any) => [
//                       `${value} ETB`,
//                       "Exchange Rate",
//                     ]}
//                   />
//                   <Bar
//                     dataKey="rate"
//                     fill="hsl(var(--primary))"
//                     radius={[2, 2, 0, 0]}
//                   />
//                 </BarChart>
//               )}
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="text-center text-xs text-muted-foreground">
//         <p>
//           Historical data is simulated for demonstration purposes. Actual rates
//           may vary.
//         </p>
//       </div>
//     </div>
//   );
// }
