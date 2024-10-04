/* eslint-disable @typescript-eslint/no-explicit-any*/

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Wheat, ChartPie, BrainCircuit } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";
import { useFarmerStore } from "@/hooks/providers/usefarmerStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Farmers } from "@/app/data/farmer";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { farmers, setFarmers } = useFarmerStore();
  const farmersPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFarmers(Farmers);
      setIsLoading(false);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const DataCard = ({ title, value, icon: Icon }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-secondary-foreground">
          Get an overview of available farmers data
        </h1>
        <Button
          className=""
          onClick={() => {
            router.push("/admin/dashboard/add-farmer");
          }}
        >
          Add new farmer
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <DataCard title="Total Farmers" value={totalFarmers} icon={Users} />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <DataCard title="Crop Farmers" value={cropFarmers} icon={Wheat} />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <DataCard
            title="Livestock Farmers"
            value={livestockFarmers}
            icon={BrainCircuit}
          />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <DataCard
            title="Mixed Farmers"
            value={mixedFarmers}
            icon={ChartPie}
          />
        </motion.div>
      </div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Farm Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={farmTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={farmers.slice(0, farmersPerPage)}
                />
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => router.push("/admin/dashboard/farmers")}
                  >
                    View All Farmers
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
