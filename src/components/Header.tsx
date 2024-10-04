"use client";

import { useState } from "react";
import { Bell, Search, User } from "lucide-react";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-green-600">
                De GreenSoft
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 text-gray-900 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Bell size={20} />
              </button>
              <div className="ml-3 relative">
                <div>
                  <button
                    className="max-w-xs bg-gray-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <User className="h-8 w-8 rounded-full" />
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
