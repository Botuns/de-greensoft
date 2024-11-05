"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FarmMonitoring() {
  const [selectedFarm, setSelectedFarm] = useState("all");

  const farms = [
    {
      id: 1,
      name: "Green Acres Farm",
      crop: "Maize",
      area: "500 hectares",
      status: "Healthy",
    },
    {
      id: 2,
      name: "Sunshine Fields",
      crop: "Rice",
      area: "750 hectares",
      status: "Needs Attention",
    },
    {
      id: 3,
      name: "Valley View Farm",
      crop: "Cassava",
      area: "300 hectares",
      status: "Healthy",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Monitoring</CardTitle>
        <CardDescription>
          Track and manage agricultural processes across farms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedFarm} onValueChange={setSelectedFarm}>
            <SelectTrigger>
              <SelectValue placeholder="Select a farm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Farms</SelectItem>
              {farms.map((farm) => (
                <SelectItem key={farm.id} value={farm.id.toString()}>
                  {farm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farm Name</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farms.map((farm) => (
              <TableRow key={farm.id}>
                <TableCell>{farm.name}</TableCell>
                <TableCell>{farm.crop}</TableCell>
                <TableCell>{farm.area}</TableCell>
                <TableCell>{farm.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
