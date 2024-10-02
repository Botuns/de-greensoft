export type FarmType = "Crop" | "Livestock" | "Mixed";

export type CropType =
  | "Maize"
  | "Rice"
  | "Cassava"
  | "Yam"
  | "Vegetables"
  | "Fruits"
  | "Other"
  | "Beans"
  | "Groundnut"
  | "Soybeans"
  | "Sorghum"
  | "Millet"
  | "Wheat"
  | "Cotton"
  | "Oil Palm"
  | "Cocoa"
  | "Rubber"
  | "Coffee"
  | "Tea"
  | "Sugar Cane"
  | "Tobacco"
  | "Groundnuts"
  | "Plantain"
  | "Cashew";

export type FarmSize = "Small" | "Medium" | "Large";

export type GeoPoliticalZone =
  | "North Central"
  | "North East"
  | "North West"
  | "South East"
  | "South South"
  | "South West";

export type Farmer = {
  id: string;
  fullName: string;
  profilePicture: string;
  phoneNumber?: string;
  nin: string;
  state: string;
  lga: string;
  geoPoliticalZone: GeoPoliticalZone;
  gender: "Male" | "Female";
  password: string;
  farm: {
    type: FarmType;
    size: FarmSize;
    cropTypes?: CropType[];
    livestockTypes?: string[];
  };
};
