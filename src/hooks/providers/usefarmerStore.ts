import { Farmer } from "@/lib/types/farmer";
import { create } from "zustand";

interface FarmerStore {
  farmers: Farmer[];
  addFarmer: (farmer: Farmer) => void;
  getFarmerById: (id: string) => Farmer | undefined;
  setFarmers: (farmers: Farmer[]) => void;
}

export const useFarmerStore = create<FarmerStore>((set, get) => ({
  farmers: [],
  addFarmer: (farmer) =>
    set((state) => ({ farmers: [...state.farmers, farmer] })),
  getFarmerById: (id) => get().farmers.find((farmer) => farmer.id === id),
  setFarmers: (farmers) => set({ farmers }),
}));
