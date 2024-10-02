export const FarmType = {
  Crop: "Crop",
  Livestock: "Livestock",
  Mixed: "Mixed",
} as const;

export const CropType = [
  "Maize",
  "Rice",
  "Cassava",
  "Yam",
  "Vegetables",
  "Fruits",
  "Other",
  "Beans",
  "Groundnut",
  "Soybeans",
  "Sorghum",
  "Millet",
  "Wheat",
  "Cotton",
  "Oil Palm",
  "Cocoa",
  "Rubber",
  "Coffee",
  "Tea",
  "Sugar Cane",
  "Tobacco",
  "Groundnuts",
  "Plantain",
  "Cashew",
] as const;

export const FarmSize = {
  Small: "Small",
  Medium: "Medium",
  Large: "Large",
} as const;

export const GeoPoliticalZone = [
  "North Central",
  "North East",
  "North West",
  "South East",
  "South South",
  "South West",
] as const;

// Type definitions based on the constants
export type FarmType = (typeof FarmType)[keyof typeof FarmType];
export type CropType = (typeof CropType)[number];
export type FarmSize = (typeof FarmSize)[keyof typeof FarmSize];
export type GeoPoliticalZone = (typeof GeoPoliticalZone)[number];
