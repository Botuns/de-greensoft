"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  ShoppingCart,
  Truck,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Bell,
  ChevronDown,
} from "lucide-react";
import FarmerSidebar from "@/components/FarmerSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFarmerStore } from "@/lib/store";

const orders = [
  {
    id: "001",
    product: "Fertilizer",
    quantity: 5,
    total: "₦25,000",
    status: "Pending",
    date: "2023-05-01",
  },
  {
    id: "002",
    product: "Seeds (Maize)",
    quantity: 10,
    total: "₦15,000",
    status: "Shipped",
    date: "2023-04-28",
  },
  {
    id: "003",
    product: "Pesticides",
    quantity: 2,
    total: "₦8,000",
    status: "Delivered",
    date: "2023-04-25",
  },
  {
    id: "004",
    product: "Irrigation Equipment",
    quantity: 1,
    total: "₦50,000",
    status: "Processing",
    date: "2023-05-02",
  },
  {
    id: "005",
    product: "Tractor Rental",
    quantity: 1,
    total: "₦100,000",
    status: "Pending",
    date: "2023-05-03",
  },
];

export default function OrdersPage() {
  //   const farmer = useFarmerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string;
    product: string;
    quantity: number;
    total: string;
    status: string;
    date: string;
  } | null>(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm)
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "Processing":
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case "Shipped":
        return <Truck className="h-4 w-4 text-purple-500" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="  flex min-h-screen w-full">
        <FarmerSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="p-6">
            <div className="!w-full   flex-1 overflow-x-hidden overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> New Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Order</DialogTitle>
                      <DialogDescription>
                        Place a new order for agricultural supplies or services.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product" className="text-right">
                          Product
                        </Label>
                        <Input id="product" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Place Order
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.total}</TableCell>

                            <TableCell>
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 w-fit justify-between"
                              >
                                {getStatusIcon(order.status)}
                                {order.status}
                              </Badge>
                              <TableCell />

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedOrder(order)}
                                  >
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Order Details</DialogTitle>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right font-medium">
                                          Order ID:
                                        </Label>
                                        <span className="col-span-3">
                                          {selectedOrder?.id}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right font-medium">
                                          Product:
                                        </Label>
                                        <span className="col-span-3">
                                          {selectedOrder.product}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right font-medium">
                                          Quantity:
                                        </Label>
                                        <span className="col-span-3">
                                          {selectedOrder.quantity}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right font-medium">
                                          Total:
                                        </Label>
                                        <span className="col-span-3">
                                          {selectedOrder.total}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right font-medium">
                                          Status:
                                        </Label>
                                        <Badge
                                          variant="outline"
                                          className="col-span-3 w-fit flex items-center gap-1"
                                        >
                                          {getStatusIcon(selectedOrder.status)}
                                          {selectedOrder.status}
                                        </Badge>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right font-medium">
                                          Date:
                                        </Label>
                                        <span className="col-span-3">
                                          {selectedOrder.date}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    {selectedOrder &&
                                      selectedOrder.status === "Pending" && (
                                        <Button className="w-full">
                                          <CreditCard className="mr-2 h-4 w-4" />{" "}
                                          Pay Now
                                        </Button>
                                      )}
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Header() {
  const farmer = useFarmerStore();
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold text-primary">
          Farmer Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 rounded-full bg-gray-100"
          />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt={farmer.fullName}
                />
                <AvatarFallback>
                  {farmer.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{farmer.fullName}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
