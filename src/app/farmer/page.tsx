"use client";

import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  CreditCard,
  FileText,
  ShoppingCart,
  MessageSquare,
  MapPin,
  Activity,
  Calendar,
  Settings,
  ChevronDown,
  Bell,
  Search,
  Loader,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Leaf, Clipboard, Wrench } from "lucide-react";
import { Sun, Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import MarketPricesCard from "./market-prices-card";

const activities = [
  {
    icon: Leaf,
    text: "Planted new crops",
    type: "Farming",
    date: "2023-05-10",
  },
  {
    icon: Clipboard,
    text: "Updated farm inventory",
    type: "Admin",
    date: "2023-05-09",
  },
  {
    icon: Wrench,
    text: "Scheduled equipment maintenance",
    type: "Maintenance",
    date: "2023-05-08",
  },
];

interface FarmerState {
  fullName: string;
  nin: string;
  phoneNumber: string;
  state: string;
  lga: string;
  geoPoliticalZone: string;
  gender: string;
  farmType: string;
  farmSize: string;
  cropTypes: string[];
  livestockTypes: string[];
}

interface FarmerStore extends FarmerState {
  setField: (field: keyof FarmerState, value: string | string[]) => void;
}

const useFarmerStore = create<FarmerStore>()(
  persist(
    (set) => ({
      fullName: "",
      nin: "",
      phoneNumber: "",
      state: "",
      lga: "",
      geoPoliticalZone: "",
      gender: "",
      farmType: "",
      farmSize: "",
      cropTypes: [],
      livestockTypes: [],
      setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
    }),
    {
      name: "farmer-storage",
    }
  )
);

const menuItems = [
  { icon: Home, name: "Dashboard", href: "/farmer/dashboard" },
  { icon: CreditCard, name: "Payments", href: "/farmer/dashboard/payments" },
  { icon: FileText, name: "Reports", href: "/farmer/dashboard/reports" },
  { icon: ShoppingCart, name: "Orders", href: "/farmer/orders" },
  {
    icon: MessageSquare,
    name: "Communication",
    href: "/farmer/dashboard/communication",
  },
  { icon: MapPin, name: "Geo-tagging", href: "/farmer/dashboard/geo-tagging" },
  {
    icon: Activity,
    name: "Farm Management",
    href: "/farmer/dashboard/farm-management",
  },
  { icon: Calendar, name: "Schedule", href: "/farmer/dashboard/schedule" },
  { icon: Settings, name: "Settings", href: "/farmer/dashboard/settings" },
];

export default function FarmerDashboard() {
  const weatherData = {
    condition: "Partly Cloudy",
    temperature: 28,
    chanceOfRain: 20,
    humidity: 45,
    windSpeed: 10,
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return Sun;
      case "partly cloudy":
        return Cloud;
      default:
        return Sun;
    }
  };

  const WeatherIcon = getWeatherIcon(weatherData.condition);

  const getTemperatureColor = (temp: number) => {
    if (temp < 10) return "text-blue-500";
    if (temp < 20) return "text-green-500";
    if (temp < 30) return "text-yellow-500";
    return "text-red-500";
  };
  const farmer = useFarmerStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // return null;
    return (
      <div className="flex justify-normal items-center text-center flex-col">
        <p>Loading...</p>
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <Avatar>
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt={farmer.fullName}
                />
                <AvatarFallback>
                  {farmer.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-primary">
                  {farmer.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {farmer.farmType} Farmer
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="gap-3 md:mt-8 md:ml-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center p-4 bg-white shadow-sm">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-semibold text-primary">
                Farmer Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 rounded-full bg-gray-100"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt={farmer.fullName}
                      />
                      <AvatarFallback>
                        {farmer.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{farmer.fullName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Farm Size
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {farmer.farmSize}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {farmer.farmType} farm
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crops</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {farmer.cropTypes.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {farmer.cropTypes.join(", ")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Livestock
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {farmer.livestockTypes.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {farmer.livestockTypes.join(", ")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Location
                  </CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {farmer.state}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {farmer.lga}, {farmer.geoPoliticalZone}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-6" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="w-full max-w-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                  <CardTitle className="text-2xl font-bold">
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    {activities.map((activity, index) => (
                      <li
                        key={index}
                        className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <activity.icon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.text}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.date}
                            </p>
                          </div>
                          <div>
                            <Badge
                              variant="outline"
                              className={`${
                                activity.type === "Farming"
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : activity.type === "Admin"
                                  ? "bg-blue-100 text-blue-800 border-blue-300"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
                              }`}
                            >
                              {activity.type}
                            </Badge>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="w-full max-w-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                  <CardTitle className="text-2xl font-bold flex items-center justify-between">
                    Weather Forecast
                    <WeatherIcon className="h-8 w-8" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Condition</span>
                      <span className="text-lg">{weatherData.condition}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Temperature</span>
                      <span
                        className={`text-lg font-bold ${getTemperatureColor(
                          weatherData.temperature
                        )}`}
                      >
                        <Thermometer className="inline-block mr-1 h-5 w-5" />
                        {weatherData.temperature}°C
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">
                        Chance of Rain
                      </span>
                      <span className="text-lg text-blue-500">
                        <Droplets className="inline-block mr-1 h-5 w-5" />
                        {weatherData.chanceOfRain}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Humidity</span>
                      <span className="text-lg">
                        <Droplets className="inline-block mr-1 h-5 w-5" />
                        {weatherData.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Wind Speed</span>
                      <span className="text-lg">
                        <Wind className="inline-block mr-1 h-5 w-5" />
                        {weatherData.windSpeed} km/h
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <MarketPricesCard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
