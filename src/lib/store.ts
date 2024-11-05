import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FarmerState {
  fullName: string;
  nin: string;
  phoneNumber: string;
  state: string;
  lga: string;
  geoPoliticalZone: string;
  gender: string;
  farmType: string;
  farmSize: string;
  cropTypes: string[];
  livestockTypes: string[];
}

interface FarmerStore extends FarmerState {
  setField: (field: keyof FarmerState, value: string | string[]) => void;
}

export const useFarmerStore = create<FarmerStore>()(
  persist(
    (set) => ({
      fullName: "",
      nin: "",
      phoneNumber: "",
      state: "",
      lga: "",
      geoPoliticalZone: "",
      gender: "",
      farmType: "",
      farmSize: "",
      cropTypes: [],
      livestockTypes: [],
      setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
    }),
    {
      name: "farmer-storage",
    }
  )
);
