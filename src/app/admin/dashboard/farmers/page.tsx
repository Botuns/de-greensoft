"use client";

import { useState, useEffect } from "react";
import { Farmer } from "@/lib/types/farmer";
import { columns } from "@/components/columns";
// import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
// import { toast } from "@/components/ui/use-toast";
import { Download, ChevronDown } from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { DataTable } from "@/components/DataTable";
import { toast } from "@/hooks/use-toast";
import { useFarmerStore } from "@/hooks/providers/usefarmerStore";
import autoTable, { UserOptions } from "jspdf-autotable";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export default function AllFarmersPage() {
  const router = useRouter();
  const { farmers, setFarmers } = useFarmerStore();
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>(farmers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Farmer>("fullName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    const sorted = [...farmers].sort((a, b) => {
      const aValue = a[sortColumn as keyof Farmer];
      const bValue = b[sortColumn as keyof Farmer];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortDirection === "asc" ? 1 : -1;
      if (bValue === undefined) return sortDirection === "asc" ? -1 : 1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    const filtered = sorted.filter((farmer) =>
      farmer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredFarmers(filtered);
  }, [farmers, searchTerm, sortColumn, sortDirection]);

  const handleSort = (column: keyof Farmer) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFarmer) {
      const updatedFarmers = farmers.filter((f) => f.id !== selectedFarmer.id);
      setFarmers(updatedFarmers);
      toast({
        title: "Farmer deleted",
        description: `${selectedFarmer.fullName} has been removed from the database.`,
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const handleUpdate = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsUpdateDialogOpen(true);
  };

  const confirmUpdate = (updatedFarmer: Farmer) => {
    const updatedFarmers = farmers.map((f) =>
      f.id === updatedFarmer.id ? updatedFarmer : f
    );
    setFarmers(updatedFarmers);
    setIsUpdateDialogOpen(false);
    toast({
      title: "Farmer updated",
      description: `${updatedFarmer.fullName}'s information has been updated.`,
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "State", "Farm Type", "Farm Size"]],
      body: filteredFarmers.map((farmer) => [
        farmer.fullName,
        farmer.state,
        farmer.farm.type,
        farmer.farm.size,
      ]),
    } as UserOptions);
    doc.save("farmers-data.pdf");
  };
  const updatedColumns = [
    ...columns,
    {
      id: "actions",
      cell: ({ row }: { row: Row<Farmer> }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              onClick={() => handleUpdate(row.original)}
            >
              Update
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onClick={() => handleDelete(row.original)}
            >
              Delete
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="container max-w-6xl py-10 mx-auto overflow-x-auto overflow-x-hidden">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">All Farmers</h1>
        <Button
          onClick={() => {
            router.push("/admin/dashboard/add-farmer");
          }}
        >
          Add new farmer
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search farmers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={downloadPDF}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>
      <DataTable
        columns={updatedColumns}
        data={filteredFarmers}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this farmer?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              farmer from our database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Farmer Information</DialogTitle>
          </DialogHeader>
          {selectedFarmer && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedFarmer = {
                  ...selectedFarmer,
                  fullName: formData.get("fullName") as string,
                  state: formData.get("state") as string,
                  farm: {
                    ...selectedFarmer.farm,
                    type: formData.get("farmType") as
                      | "Crop"
                      | "Livestock"
                      | "Mixed",
                    size: formData.get("farmSize") as
                      | "Small"
                      | "Medium"
                      | "Large",
                  },
                };
                confirmUpdate(updatedFarmer);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    defaultValue={selectedFarmer.fullName}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    defaultValue={selectedFarmer.state}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="farmType" className="text-right">
                    Farm Type
                  </Label>
                  <select
                    id="farmType"
                    name="farmType"
                    defaultValue={selectedFarmer.farm.type}
                    className="col-span-3"
                  >
                    <option value="Crop">Crop</option>
                    <option value="Livestock">Livestock</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="farmSize" className="text-right">
                    Farm Size
                  </Label>
                  <select
                    id="farmSize"
                    name="farmSize"
                    defaultValue={selectedFarmer.farm.size}
                    className="col-span-3"
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
