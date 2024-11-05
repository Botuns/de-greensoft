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
import { Progress } from "@/components/ui/progress";

export default function ProduceInventory() {
  const [inventory] = useState([
    { id: 1, product: "Maize", quantity: 5000, unit: "tons", capacity: 80 },
    { id: 2, product: "Rice", quantity: 3500, unit: "tons", capacity: 70 },
    { id: 3, product: "Cassava", quantity: 2000, unit: "tons", capacity: 40 },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produce Inventory</CardTitle>
        <CardDescription>
          Track and manage farm produce inventory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Storage Capacity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product}</TableCell>
                <TableCell>
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Progress value={item.capacity} className="mr-2" />
                    <span>{item.capacity}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
