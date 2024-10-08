// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select } from "@/components/ui/select";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Bell, ChevronDown, Cloud, Download, Search, Sun } from "lucide-react";
// import Image from "next/image";

// const yieldData = [
//   { name: "Jan", yield: 200 },
//   { name: "Feb", yield: 300 },
//   { name: "Mar", yield: 350 },
//   { name: "Apr", yield: 200 },
//   { name: "May", yield: 500 },
//   { name: "Jun", yield: 300 },
//   { name: "Jul", yield: 400 },
//   { name: "Aug", yield: 450 },
//   { name: "Sep", yield: 500 },
// ];

// const taskData = [
//   {
//     task: "Apply Fertilizer to Corn",
//     assignedTo: "Jane Smith",
//     dueDate: "29-Aug-24",
//     status: "Pending",
//   },
// ];

// const vegetableData = [
//   { name: "Tomatoes", amount: "150 tons" },
//   { name: "Carrots", amount: "120 tons" },
// ];

// export default function Dashboard() {
//   return (
//     <div className="bg-background min-h-screen">
//       <header className="flex justify-between items-center p-4 border-b">
//         <div className="flex items-center space-x-4">
//           <Image
//             src="/placeholder.svg"
//             alt="FarmVista Logo"
//             width={40}
//             height={40}
//           />
//           <h1 className="text-2xl font-bold text-green-600">FarmVista</h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//             <Input
//               className="pl-10 w-64"
//               placeholder="Search something here..."
//             />
//           </div>
//           <Bell className="h-6 w-6 text-muted-foreground" />
//           <Avatar>
//             <AvatarImage src="/placeholder.svg" alt="Albert Flores" />
//             <AvatarFallback>AF</AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="font-semibold">Albert Flores</p>
//             <p className="text-sm text-muted-foreground">albert@gmail.com</p>
//           </div>
//           <ChevronDown className="h-4 w-4 text-muted-foreground" />
//         </div>
//       </header>

//       <main className="p-6">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-3xl font-bold">Good Morning !</h2>
//             <p className="text-muted-foreground">
//               Optimize Your Farm Operations with Real-Time Insights
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Select defaultValue="this-month">
//               <option value="this-month">This Month</option>
//               <option value="last-month">Last Month</option>
//             </Select>
//             <Button variant="outline">
//               Export <Download className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-4 gap-6 mb-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
//                   Chicago
//                 </div>
//                 <Select defaultValue="celsius">
//                   <option value="celsius">°C</option>
//                   <option value="fahrenheit">°F</option>
//                 </Select>
//               </div>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <p className="text-4xl font-bold">24° C</p>
//                   <p className="text-muted-foreground">Monday, 27 Aug 2024</p>
//                 </div>
//                 <div className="text-right">
//                   <Sun className="h-10 w-10 text-yellow-500 mb-2" />
//                   <p>Cloudy</p>
//                   <p className="text-muted-foreground">Feels like 25</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="col-span-2">
//             <CardHeader>
//               <CardTitle className="flex justify-between">
//                 <span>Production Overview</span>
//                 <Select defaultValue="yearly">
//                   <option value="yearly">Yearly</option>
//                   <option value="monthly">Monthly</option>
//                 </Select>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex justify-center items-center">
//                 <div className="relative w-48 h-48">
//                   <svg className="w-full h-full" viewBox="0 0 100 100">
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="45"
//                       fill="none"
//                       stroke="#E5E7EB"
//                       strokeWidth="10"
//                     />
//                     <circle
//                       cx="50"
//                       cy="50"
//                       r="45"
//                       fill="none"
//                       stroke="#10B981"
//                       strokeWidth="10"
//                       strokeDasharray="282.7"
//                       strokeDashoffset="70.7"
//                     />
//                   </svg>
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                     <p className="text-3xl font-bold">1,000</p>
//                     <p className="text-sm text-muted-foreground">tons</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-between text-sm mt-4">
//                 <span className="flex items-center">
//                   <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
//                   Wheat: 40%
//                 </span>
//                 <span className="flex items-center">
//                   <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
//                   Corn: 30%
//                 </span>
//                 <span className="flex items-center">
//                   <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
//                   Rice: 30%
//                 </span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Total Land Area</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-4xl font-bold mb-2">1,200 acres</p>
//               <p className="text-sm text-green-500">+8.05% from last month</p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <Card>
//             <CardHeader className="flex justify-between items-center">
//               <CardTitle>Monthly Yield Analysis</CardTitle>
//               <div className="flex items-center space-x-2">
//                 <Select defaultValue="corn">
//                   <option value="corn">Corn</option>
//                   <option value="wheat">Wheat</option>
//                   <option value="rice">Rice</option>
//                 </Select>
//                 <Select defaultValue="2024">
//                   <option value="2024">2024</option>
//                   <option value="2023">2023</option>
//                 </Select>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={yieldData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="yield" fill="#10B981" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           <Card
//             className="bg-cover bg-center"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')",
//             }}
//           >
//             <CardContent className="p-6 bg-black bg-opacity-50 text-white h-full flex flex-col justify-between">
//               <div>
//                 <h3 className="text-2xl font-bold mb-2">Corn Field</h3>
//                 <Button variant="outline" className="text-white border-white">
//                   More Details <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//               <div className="grid grid-cols-3 gap-4 mt-4">
//                 <div>
//                   <p className="text-sm opacity-75">Crop Health</p>
//                   <p className="font-bold">Good</p>
//                 </div>
//                 <div>
//                   <p className="text-sm opacity-75">Planting Date</p>
//                   <p className="font-bold">16 March, 2024</p>
//                 </div>
//                 <div>
//                   <p className="text-sm opacity-75">Harvest Time</p>
//                   <p className="font-bold">6 month</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <Card>
//             <CardHeader className="flex justify-between items-center">
//               <CardTitle>Task Management</CardTitle>
//               <div className="flex space-x-2">
//                 <Button variant="outline">Add New Task +</Button>
//                 <Button variant="ghost">View All</Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left">
//                     <th className="pb-4">Task Name</th>
//                     <th className="pb-4">Assigned To</th>
//                     <th className="pb-4">Due Date</th>
//                     <th className="pb-4">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {taskData.map((task, index) => (
//                     <tr key={index}>
//                       <td className="py-2">{task.task}</td>
//                       <td className="py-2">{task.assignedTo}</td>
//                       <td className="py-2">{task.dueDate}</td>
//                       <td className="py-2">
//                         <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
//                           {task.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Vegetable Harvest Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-4">
//                 {vegetableData.map((item, index) => (
//                   <li key={index} className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <span
//                         className={`w-3 h-3 rounded-full ${
//                           index === 0 ? "bg-green-500" : "bg-orange-500"
//                         } mr-2`}
//                       ></span>
//                       <span>{item.name}</span>
//                     </div>
//                     <span className="font-bold">{item.amount}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }
