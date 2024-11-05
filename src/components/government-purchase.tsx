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
import { Button } from "@/components/ui/button";

export default function GovernmentPurchase() {
  const [purchases] = useState([
    {
      id: 1,
      product: "Maize",
      quantity: 1000,
      unit: "tons",
      price: 250000,
      status: "Pending",
    },
    {
      id: 2,
      product: "Rice",
      quantity: 750,
      unit: "tons",
      price: 300000,
      status: "Approved",
    },
    {
      id: 3,
      product: "Cassava",
      quantity: 500,
      unit: "tons",
      price: 150000,
      status: "Completed",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Government Purchase</CardTitle>
        <CardDescription>
          Manage government purchases of farm produce
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price (₦)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.product}</TableCell>
                <TableCell>
                  {purchase.quantity} {purchase.unit}
                </TableCell>
                <TableCell>{purchase.price.toLocaleString()}</TableCell>
                <TableCell>{purchase.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    {purchase.status === "Pending" ? "Approve" : "View Details"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
