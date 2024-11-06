import NotificationsPage from "@/app/admin/dashboard/notifications/page";
import FarmerSidebar from "@/components/FarmerSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Header } from "../orders/page";

function page() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <FarmerSidebar />
        <div className="flex flex-col flex-1 overflow-hidden w-full">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 w-full">
            <NotificationsPage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default page;
