/* eslint-disable @typescript-eslint/no-explicit-any*/
"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Cloud } from "lucide-react";
// import Image from "next/image";
import { useFarmerStore } from "@/hooks/providers/usefarmerStore";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";
import { Farmers } from "@/app/data/farmer";
import { useRouter } from "next/navigation";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const router = useRouter();
  const { farmers, setFarmers } = useFarmerStore();
  useEffect(() => {
    const timer = setTimeout(() => {
      setFarmers(Farmers);
      // setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setFarmers]);

  const totalFarmers = farmers.length;
  const cropFarmers = farmers.filter(
    (farmer) => farmer.farm.type === "Crop"
  ).length;
  const livestockFarmers = farmers.filter(
    (farmer) => farmer.farm.type === "Livestock"
  ).length;
  const mixedFarmers = farmers.filter(
    (farmer) => farmer.farm.type === "Mixed"
  ).length;

  const farmTypeData = [
    { name: "Crop", value: cropFarmers },
    { name: "Livestock", value: livestockFarmers },
    { name: "Mixed", value: mixedFarmers },
  ];

  const yieldData = [
    { name: "Jan", yield: 200 },
    { name: "Feb", yield: 300 },
    { name: "Mar", yield: 350 },
    { name: "Apr", yield: 200 },
    { name: "May", yield: 500 },
    { name: "Jun", yield: 300 },
    { name: "Jul", yield: 400 },
    { name: "Aug", yield: 450 },
    { name: "Sep", yield: 500 },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/*  */}

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">Good Morning !</h2>
            <p className="text-muted-foreground">
              Optimize Your Farm Operations with Real-Time Insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="this-month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              Export <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Chicago
                </div>
                <Select defaultValue="celsius">
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">°C</SelectItem>
                    <SelectItem value="fahrenheit">°F</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-4xl font-bold">24° C</p>
                  <p className="text-muted-foreground">Monday, 27 Aug 2024</p>
                </div>
                <div className="text-right">
                  <Cloud className="h-10 w-10 text-blue-500 mb-2" />
                  <p>Cloudy</p>
                  <p className="text-muted-foreground">Feels like 25</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Production Overview</span>
                <Select defaultValue="yearly">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={farmTypeData}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {farmTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex justify-between text-sm mt-4">
                {farmTypeData.map((entry, index) => (
                  <span key={index} className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    {entry.name}: {entry.value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-2">{totalFarmers}</p>
              <p className="text-sm text-green-500">+8.05% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Monthly Yield Analysis</CardTitle>
              <div className="flex items-center space-x-2">
                <Select defaultValue="corn">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corn">Corn</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="2024">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={farmers.slice(0, 5)} />
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push("dashboard/farmers");
                  }}
                >
                  View All Farmers
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
