"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  CreditCard,
  FileText,
  ShoppingCart,
  MessageSquare,
  MapPin,
  Activity,
  Settings,
  Bell,
} from "lucide-react";
import { useFarmerStore } from "@/lib/store";

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
  { icon: Bell, name: "Notifications", href: "/farmer/notifications" },
  { icon: Settings, name: "Settings", href: "/farmer/dashboard/settings" },
];

export default function FarmerSidebar() {
  const farmer = useFarmerStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    <div>
      <p>Loading...</p>
    </div>;
  }

  return (
    <Sidebar className="overflow-x-hidden">
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
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{farmer.fullName}</p>
            <p className="text-xs text-gray-500">{farmer.farmType} Farmer</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="mt-8 ml-3 overflow-x-hidden">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name} className="gap-3 ">
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
  );
}
