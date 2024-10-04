"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Farmer } from "@/lib/types/farmer";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Farmer>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nin",
    header: "NIN",
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lga",
    header: "LGA",
  },
  {
    accessorKey: "geoPoliticalZone",
    header: "Geo-Political Zone",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "farm.type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Farm Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "farm.size",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Farm Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "farm.cropTypes",
    header: "Crop Types",
    cell: ({ row }) => {
      const cropTypes = row.getValue("farm.cropTypes") as string[] | undefined;
      return cropTypes ? cropTypes.join(", ") : "N/A";
    },
  },
  {
    accessorKey: "farm.livestockTypes",
    header: "Livestock Types",
    cell: ({ row }) => {
      const livestockTypes = row.getValue("farm.livestockTypes") as
        | string[]
        | undefined;
      return livestockTypes ? livestockTypes.join(", ") : "N/A";
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
];
