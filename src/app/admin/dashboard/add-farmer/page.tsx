/* eslint-disable @typescript-eslint/no-explicit-any*/
"use client";

import { useState } from "react";
import { Farmer } from "@/lib/types/farmer";
import { useFarmerStore } from "@/hooks/providers/usefarmerStore";
import { toast, Toaster } from "sonner";
import { FarmerForm } from "./FarmerForm";
import { NINVerificationModal } from "./NINVerificationModal";

export default function AddFarmerPage() {
  const [isNINModalOpen, setIsNINModalOpen] = useState(false);
  const [tempNIN, setTempNIN] = useState("");
  const addFarmer = useFarmerStore((state) => state.addFarmer);

  const handleNINVerification = (nin: string) => {
    setTempNIN(nin);
    setIsNINModalOpen(true);
  };

  const handleFormSubmit = (farmer: Omit<Farmer, "id">) => {
    try {
      const newFarmer: Farmer = {
        ...farmer,
        id: `F${Math.floor(Math.random() * 100000)
          .toString()
          .padStart(5, "0")}`,
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      };
      addFarmer(newFarmer);
      toast.success("Farmer added successfully");
      console.log(newFarmer);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl h-full">
      <Toaster richColors />
      <h1 className="text-2xl font-bold mb-4 text-primary">Add New Farmer</h1>
      <FarmerForm
        onNINVerification={handleNINVerification}
        onSubmit={handleFormSubmit}
      />
      <NINVerificationModal
        isOpen={isNINModalOpen}
        onClose={() => setIsNINModalOpen(false)}
        nin={tempNIN}
      />
    </div>
  );
}
