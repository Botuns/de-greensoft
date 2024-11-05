"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tractor, Truck, Warehouse, ShoppingCart } from "lucide-react";
import FarmMonitoring from "@/components/farm-monitoring";
import TransportManagement from "@/components/transport-management";
import ProduceInventory from "@/components/produce-inventory";
import GovernmentPurchase from "@/components/government-purchase";

export default function FarmManagementDashboard() {
  const [activeTab, setActiveTab] = useState("monitoring");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Orders and Monitoring
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4 !text-primary"
      >
        <TabsList className="grid w-full grid-cols-4 gap-4">
          <TabsTrigger
            value="monitoring"
            className="flex items-center justify-center !text-primary"
          >
            <Tractor className="w-4 h-4 mr-2" />
            Farm Monitoring
          </TabsTrigger>
          <TabsTrigger
            value="transport"
            className="flex items-center justify-center !text-primary"
          >
            <Truck className="w-4 h-4 mr-2" />
            Transport Management
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="flex items-center justify-center !text-primary"
          >
            <Warehouse className="w-4 h-4 mr-2" />
            Produce Inventory
          </TabsTrigger>
          <TabsTrigger
            value="government"
            className="flex items-center justify-center !text-primary"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Government Purchase
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monitoring">
          <FarmMonitoring />
        </TabsContent>
        <TabsContent value="transport">
          <TransportManagement />
        </TabsContent>
        <TabsContent value="inventory">
          <ProduceInventory />
        </TabsContent>
        <TabsContent value="government">
          <GovernmentPurchase />
        </TabsContent>
      </Tabs>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="!text-primary">
            Overall Farm Statistics
          </CardTitle>
          <CardDescription>
            Key performance indicators for all farms in the state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Production</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,234,567 tons</div>
                <p className="text-sm text-muted-foreground">
                  +12% from last year
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45,678</div>
                <p className="text-sm text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₦789,012,345</div>
                <p className="text-sm text-muted-foreground">
                  +8% from last quarter
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
