// "use client"

// import { Calculator, Bell, TrendingUp, Bookmark, RefreshCw, Settings } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

// export function QuickActions() {
//   const actions = [
//     {
//       id: "calculator",
//       title: "Quick Convert",
//       description: "Fast currency conversion",
//       icon: Calculator,
//       color: "bg-blue-500",
//       action: () => console.log("Quick convert"),
//     },
//     {
//       id: "alerts",
//       title: "Rate Alerts",
//       description: "Manage your alerts",
//       icon: Bell,
//       color: "bg-orange-500",
//       badge: "3",
//       action: () => console.log("Rate alerts"),
//     },
//     {
//       id: "trends",
//       title: "Market Trends",
//       description: "View rate analysis",
//       icon: TrendingUp,
//       color: "bg-green-500",
//       action: () => console.log("Market trends"),
//     },
//     {
//       id: "favorites",
//       title: "Favorite Banks",
//       description: "Quick access to preferred banks",
//       icon: Bookmark,
//       color: "bg-purple-500",
//       action: () => console.log("Favorites"),
//     },
//     {
//       id: "refresh",
//       title: "Refresh Rates",
//       description: "Update all currency rates",
//       icon: RefreshCw,
//       color: "bg-cyan-500",
//       action: () => console.log("Refresh rates"),
//     },
//     {
//       id: "settings",
//       title: "Preferences",
//       description: "Customize your dashboard",
//       icon: Settings,
//       color: "bg-gray-500",
//       action: () => console.log("Settings"),
//     },
//   ]

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg">Quick Actions</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-2 gap-3">
//           {actions.map((action) => {
//             const Icon = action.icon
//             return (
//               <Button
//                 key={action.id}
//                 variant="outline"
//                 className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50 relative bg-transparent"
//                 onClick={action.action}
//               >
//                 <div className="flex items-center justify-between w-full">
//                   <div className={`p-2 rounded-lg ${action.color} text-white`}>
//                     <Icon className="h-4 w-4" />
//                   </div>
//                   {action.badge && (
//                     <Badge variant="secondary" className="h-5 text-xs">
//                       {action.badge}
//                     </Badge>
//                   )}
//                 </div>
//                 <div className="text-left">
//                   <div className="font-medium text-sm">{action.title}</div>
//                   <div className="text-xs text-muted-foreground">{action.description}</div>
//                 </div>
//               </Button>
//             )
//           })}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
