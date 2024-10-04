"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const menuItems = [
  { icon: Home, name: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, name: "Farmers", href: "/admin/dashboard/farmers" },
  { icon: Bell, name: "Notifications", href: "/admin/notifications" },
  { icon: CreditCard, name: "Payments", href: "/admin/payments" },
  { icon: FileText, name: "Reports", href: "/admin/dashboard/reports" },
  { icon: ShoppingCart, name: "Orders", href: "/admin/dashboard/orders" },
  { icon: MessageSquare, name: "Communication", href: "/admin/dashboard/communication" },
  { icon: MapPin, name: "Geo-tagging", href: "/admin/dashboard/geo-tagging" },
  { icon: Home, name: "Property", href: "/admin/dashboard/property" },
  { icon: Activity, name: "Precision Farming", href: "/admin/dashboard/precision-farming" },
  { icon: Calendar, name: "Schedule", href: "/admin/dashboard/schedule" },
  { icon: Activity, name: "Farm Activities", href: "/admin/dashboard/farm-activities" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="lg:hidden fixed z-20 top-4 left-4 p-2 bg-green-600 text-white rounded-md "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-10 w-64 bg-primary text-white transition-transform duration-300 ease-in-out h-full
      `}
      >
        <div className="flex items-center justify-center h-16 bg-primary">
          <span className="text-2xl font-semibold">De GreenSoft</span>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-6 py-3 text-base
                ${
                  pathname === item.href ? "bg-green-800" : "hover:bg-green-600"
                }
              `}
            >
              <item.icon className="mr-3" size={20} />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
