"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, UserCircle, HelpCircle } from "lucide-react";
import {
  Users,
  Bell,
  CreditCard,
  FileText,
  ShoppingCart,
  MessageSquare,
  MapPin,
  Home,
  Calendar,
  Activity,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, name: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, name: "Farmers", href: "/admin/dashboard/farmers" },
  { icon: Bell, name: "Notifications", href: "/admin/notifications" },
  { icon: CreditCard, name: "Payments", href: "/admin/payments" },
  { icon: FileText, name: "Reports", href: "/admin/dashboard/reports" },
  { icon: ShoppingCart, name: "Orders", href: "/admin/dashboard/orders" },
  {
    icon: MessageSquare,
    name: "Communication",
    href: "/admin/dashboard/communication",
  },
  { icon: MapPin, name: "Geo-tagging", href: "/admin/dashboard/geo-tagging" },
  { icon: Home, name: "Property", href: "/admin/dashboard/property" },
  {
    icon: Activity,
    name: "Precision Farming",
    href: "/admin/dashboard/precision-farming",
  },
  { icon: Calendar, name: "Schedule", href: "/admin/dashboard/schedule" },
  {
    icon: Activity,
    name: "Farm Activities",
    href: "/admin/dashboard/farm-activities",
  },
  { icon: Settings, name: "Settings", href: "/admin/dashboard/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed z-20 top-4 left-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-10 w-64 bg-white border-r transition-transform duration-300 ease-in-out h-full
      `}
      >
        <div className="flex items-center h-16 px-4 border-b">
          <Image
            src="https://www.ekitistate.gov.ng/wp-content/uploads/LOGO-1.jpg?height=40&width=40"
            alt="EKFARMS Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-semibold text-green-600">EKFARMS</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] py-4">
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${
                    pathname === item.href
                      ? "bg-green-100 text-green-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/admin/profile"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
          >
            <UserCircle className="mr-3 h-5 w-5" />
            My Account
          </Link>
          <Link
            href="/admin/help"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
          >
            <HelpCircle className="mr-3 h-5 w-5" />
            Help & Support
          </Link>
        </div>
      </aside>
    </>
  );
}
