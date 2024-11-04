"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, ChevronDown, Filter, Search, Trash2 } from "lucide-react";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockNotifications } from "@/app/data/notifications";

interface NotificationStore {
  notifications: typeof mockNotifications;
  filter: string;
  searchQuery: string;
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
  setFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: mockNotifications,
  filter: "all",
  searchQuery: "",
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  setFilter: (filter) => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
// @ts-expect-error: NotificationItem does not have explicit types
const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-start space-x-4 p-4 my-2 ${
        notification.read ? "bg-background" : "bg-accent"
      } rounded-lg transition-colors duration-300 ease-in-out`}
    >
      {notification.avatar ? (
        <Avatar>
          <AvatarImage src={notification.avatar} alt={notification.name} />
          <AvatarFallback>{notification.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          <Bell size={20} />
        </div>
      )}
      <div className="flex-grow">
        <p className="text-sm font-medium">{notification.content}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {notification.timestamp}
        </p>
      </div>
      <div className="flex-shrink-0 space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMarkAsRead(notification.id)}
                className={
                  notification.read ? "text-muted-foreground" : "text-primary"
                }
              >
                <Check size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as {notification.read ? "unread" : "read"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(notification.id)}
                className="text-destructive"
              >
                <Trash2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete notification</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default function NotificationsPage() {
  const {
    notifications,
    filter,
    searchQuery,
    markAsRead,
    deleteNotification,
    setFilter,
    setSearchQuery,
  } = useNotificationStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread" && notification.read) return false;
    if (filter === "read" && !notification.read) return false;
    return notification.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 p-6 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Badge variant="secondary" className="text-sm">
              {notifications.filter((n) => !n.read).length} unread
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
            </div>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} className="mr-2" />
                Filter
                <ChevronDown size={18} className="ml-2" />
              </Button>
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg z-10"
                  >
                    <div className="p-2">
                      <Select
                        value={filter}
                        onValueChange={(value) => {
                          setFilter(value);
                          setIsFilterOpen(false);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter notifications" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-220px)] ">
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </AnimatePresence>
            {filteredNotifications.length === 0 && (
              <div className="text-center py-12">
                <Bell
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <p className="text-xl font-semibold">No notifications found</p>
                <p className="text-muted-foreground mt-2">
                  {searchQuery
                    ? "Try adjusting your search or filter"
                    : "You're all caught up!"}
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
