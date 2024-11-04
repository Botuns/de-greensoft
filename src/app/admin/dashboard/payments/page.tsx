"use client";

import { useState } from "react";
import { create } from "zustand";
import { format } from "date-fns";
import { ArrowUpDown, Send } from "lucide-react";
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
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockFarmers } from "@/app/data/farmer";
import { toast, Toaster } from "sonner";
import Link from "next/link";

const regions = [
  "All Regions",
  "North Central",
  "North East",
  "North West",
  "South East",
  "South South",
  "South West",
];

const categories = [
  "All Categories",
  "Crop Farmer",
  "Livestock Farmer",
  "Aquaculture",
  "Apiculture",
  "Horticulture",
];

interface PaymentStore {
  farmers: typeof mockFarmers;
  filteredFarmers: typeof mockFarmers;
  selectedRegion: string;
  selectedCategory: string;
  searchQuery: string;
  setSelectedRegion: (region: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  filterFarmers: () => void;
  disburseFunds: (farmerId: number) => void;
}

const usePaymentStore = create<PaymentStore>((set, get) => ({
  farmers: mockFarmers,
  filteredFarmers: mockFarmers,
  selectedRegion: "All Regions",
  selectedCategory: "All Categories",
  searchQuery: "",
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  filterFarmers: () => {
    const { farmers, selectedRegion, selectedCategory, searchQuery } = get();
    const filtered = farmers.filter((farmer) => {
      const regionMatch =
        selectedRegion === "All Regions" || farmer.region === selectedRegion;
      const categoryMatch =
        selectedCategory === "All Categories" ||
        farmer.category === selectedCategory;
      const searchMatch = farmer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return regionMatch && categoryMatch && searchMatch;
    });
    set({ filteredFarmers: filtered });
  },
  disburseFunds: (farmerId) => {
    // Implement fund disbursement logic here
    console.log(`Disbursing funds to farmer with ID: ${farmerId}`);
    toast("Funds disbursed successfully!");
  },
}));

export default function PaymentsPage() {
  const {
    filteredFarmers,
    selectedRegion,
    selectedCategory,
    searchQuery,
    setSelectedRegion,
    setSelectedCategory,
    setSearchQuery,
    filterFarmers,
    disburseFunds,
  } = usePaymentStore();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedFarmer, setSelectedFarmer] = useState<
    (typeof mockFarmers)[0] | null
  >(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedFarmers = [...filteredFarmers].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    // @ts-expect-error: dynamic key access
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    // @ts-expect-error: dynamic key access
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8">Farmer Payments</h1>
      <div className="flex my-2 bg-primary p-2">
        <Badge variant="outline" className="text-sm text-white">
          {filteredFarmers.length} farmers
        </Badge>
        <Link
          href="/admin/dashboard/payments/add"
          className="ml-auto text-sm text-white underline"
        >
          Add/Manage Payment Method
        </Link>
        <Link
          href="/admin/dashboard/payments/transactions "
          className="ml-4 text-sm text-white underline"
        >
          See Transactions
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 overflow-x-auto">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search farmers..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              filterFarmers();
            }}
            className="w-full"
          />
        </div>
        <Select
          value={selectedRegion}
          onValueChange={(value) => {
            setSelectedRegion(value);
            filterFarmers();
          }}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            filterFarmers();
          }}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)] rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="font-bold"
                >
                  Farmer
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("amountDue")}
                  className="font-bold"
                >
                  Amount Due
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("dueDate")}
                  className="font-bold"
                >
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFarmers.map((farmer) => (
              <TableRow key={farmer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={farmer.avatar} alt={farmer.name} />
                      <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{farmer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {farmer.id}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{farmer.region}</TableCell>
                <TableCell>
                  <Badge variant="outline">{farmer.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  ₦{farmer.amountDue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {format(new Date(farmer.dueDate), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFarmer(farmer)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Disburse
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog
        open={!!selectedFarmer}
        onOpenChange={() => setSelectedFarmer(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment Disbursement</DialogTitle>
            <DialogDescription>
              Are you sure you want to disburse funds to this farmer?
            </DialogDescription>
          </DialogHeader>
          {selectedFarmer && (
            <div className="py-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage
                    src={selectedFarmer.avatar}
                    alt={selectedFarmer.name}
                  />
                  <AvatarFallback>
                    {selectedFarmer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedFarmer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFarmer.category}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Region
                  </p>
                  <p>{selectedFarmer.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Amount Due
                  </p>
                  <p className="font-semibold">
                    ₦{selectedFarmer.amountDue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Due Date
                  </p>
                  <p>
                    {format(new Date(selectedFarmer.dueDate), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedFarmer(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedFarmer) {
                  disburseFunds(selectedFarmer.id);
                  setSelectedFarmer(null);
                }
              }}
            >
              Confirm Disbursement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
