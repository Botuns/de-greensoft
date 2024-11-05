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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function TransportManagement() {
  const [transports] = useState([
    {
      id: 1,
      vehicle: "Truck A",
      origin: "Green Acres Farm",
      destination: "Central Warehouse",
      status: "In Transit",
    },
    {
      id: 2,
      vehicle: "Truck B",
      origin: "Sunshine Fields",
      destination: "Export Terminal",
      status: "Delivered",
    },
    {
      id: 3,
      vehicle: "Van C",
      origin: "Valley View Farm",
      destination: "Local Market",
      status: "Loading",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transport Management System</CardTitle>
        <CardDescription>
          Monitor real-time transportation of farm produce
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transports.map((transport) => (
              <TableRow key={transport.id}>
                <TableCell>{transport.vehicle}</TableCell>
                <TableCell>{transport.origin}</TableCell>
                <TableCell>{transport.destination}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transport.status === "Delivered"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {transport.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
