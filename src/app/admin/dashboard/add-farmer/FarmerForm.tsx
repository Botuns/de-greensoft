"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { States } from "@/lib/types/state";
import { localGovernment } from "@/lib/types/local-governent";
import { CropType, FarmSize, FarmType, GeoPoliticalZone } from ".";
import { Farmer } from "@/lib/types/farmer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

type FarmerFormProps = {
  onNINVerification: (nin: string) => void;
  onSubmit: (farmer: Omit<Farmer, "id">) => void;
};

export function FarmerForm({ onNINVerification, onSubmit }: FarmerFormProps) {
  const [formData, setFormData] = useState<Omit<Farmer, "id">>({
    fullName: "",
    profilePicture: "",
    nin: "",
    state: "",
    lga: "",
    phoneNumber: "",
    geoPoliticalZone: "North Central",
    gender: "Male",
    password: "",
    farm: {
      type: "Crop",
      size: "Small",
      cropTypes: [],
      livestockTypes: [],
    },
  });
  //   const handleCropTypeChange = (cropType: CropType, isChecked: boolean) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       farm: {
  //         ...prev.farm,
  //         cropTypes: isChecked
  //           ? [...prev.farm.cropTypes, cropType]
  //           : prev.farm.cropTypes.filter((type) => type !== cropType),
  //       },
  //     }));
  //   };
  const handleCropTypeChange = (cropType: CropType, isChecked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      farm: {
        ...prev.farm,
        cropTypes: isChecked
          ? [...(prev.farm.cropTypes || []), cropType]
          : (prev.farm.cropTypes || []).filter((type) => type !== cropType),
      },
    }));
  };
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFarmInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, farm: { ...prev.farm, [name]: value } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ScrollArea className="w-full h-screen border-none">
      <Card className="w-full max-w-2xl mx-auto overflow-hidden overflow-y-auto ">
        <CardHeader>
          <CardTitle>Farmer Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                required
                className="rounded"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nin">NIN</Label>
              <Input
                id="nin"
                value={formData.nin}
                onChange={(e) => {
                  handleInputChange("nin", e.target.value);
                  if (e.target.value.length === 11) {
                    onNINVerification(e.target.value);
                  }
                }}
                required
                maxLength={11}
                className="rounded"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                required
                className="rounded"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleInputChange("state", value)}
              >
                <SelectTrigger className="rounded">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {States.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.state && (
              <div className="space-y-2">
                <Label htmlFor="lga">LGA</Label>
                <Select
                  value={formData.lga}
                  onValueChange={(value) => handleInputChange("lga", value)}
                >
                  <SelectTrigger className="rounded">
                    <SelectValue placeholder="Select an LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {localGovernment
                      .find((lg) => lg.state === formData.state)
                      ?.lgas.map((lga) => (
                        <SelectItem key={lga} value={lga}>
                          {lga}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="geoPoliticalZone">Geo-Political Zone</Label>
              <Select
                value={formData.geoPoliticalZone}
                onValueChange={(value) =>
                  handleInputChange("geoPoliticalZone", value)
                }
              >
                <SelectTrigger className="rounded">
                  <SelectValue placeholder="Select a geo-political zone" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(GeoPoliticalZone).map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="rounded">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="rounded"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmType">Farm Type</Label>
              <Select
                value={formData.farm.type}
                onValueChange={(value) => handleFarmInputChange("type", value)}
              >
                <SelectTrigger className="rounded">
                  <SelectValue placeholder="Select farm type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(FarmType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size</Label>
              <Select
                value={formData.farm.size}
                onValueChange={(value) => handleFarmInputChange("size", value)}
              >
                <SelectTrigger className="rounded">
                  <SelectValue placeholder="Select farm size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(FarmSize).map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(formData.farm.type === "Crop" ||
              formData.farm.type === "Mixed") && (
              <div className="space-y-2">
                <Label>Crop Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(CropType).map((crop) => (
                    <div key={crop} className="flex items-center space-x-2">
                      <Checkbox
                        id={`crop-${crop}`}
                        checked={
                          (formData.farm.cropTypes &&
                            formData.farm.cropTypes.includes(crop)) ||
                          undefined
                        }
                        onCheckedChange={(checked) =>
                          handleCropTypeChange(crop, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`crop-${crop}`}
                        className="text-sm font-normal"
                      >
                        {crop}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(formData.farm.type === "Livestock" ||
              formData.farm.type === "Mixed") && (
              <div className="space-y-2">
                <Label htmlFor="livestockTypes">Livestock Types</Label>
                <Input
                  id="livestockTypes"
                  className="rounded"
                  value={formData.farm.livestockTypes?.join(", ")}
                  onChange={(e) => {
                    const livestockTypes = e.target.value
                      .split(",")
                      .map((type) => type.trim());
                    setFormData((prev) => ({
                      ...prev,
                      farm: { ...prev.farm, livestockTypes },
                    }));
                  }}
                  placeholder="Enter livestock types separated by commas"
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full rounded"
            onClick={handleSubmit}
          >
            Add Farmer
          </Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
