"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { States } from "@/lib/types/state";
import { localGovernment } from "@/lib/types/local-governent";
import {
  CropType,
  FarmSize,
  FarmType,
  GeoPoliticalZone,
} from "../../admin/dashboard/add-farmer";
import { toast, Toaster } from "sonner";

interface FarmerState {
  fullName: string;
  nin: string;
  phoneNumber: string;
  state: string;
  lga: string;
  geoPoliticalZone: string;
  gender: string;
  password: string;
  farmType: string;
  farmSize: string;
  cropTypes: string[];
  livestockTypes: string[];
}

interface FarmerStore extends FarmerState {
  setField: (field: keyof FarmerState, value: string | string[]) => void;
  resetForm: () => void;
}

const initialState: FarmerState = {
  fullName: "",
  nin: "",
  phoneNumber: "",
  state: "",
  lga: "",
  geoPoliticalZone: "",
  gender: "",
  password: "",
  farmType: "",
  farmSize: "",
  cropTypes: [],
  livestockTypes: [],
};

const useFarmerStore = create<FarmerStore>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
      resetForm: () => set(initialState),
    }),
    {
      name: "farmer-storage",
    }
  )
);

const steps = [
  "Basic Info",
  "NIN Verification",
  "Phone Verification",
  "Farm Details",
  "Completion",
];

export default function FarmerOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNINModalOpen, setIsNINModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  // const [showToast, setShowToast] = useState(false);
  const farmerStore = useFarmerStore();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNINVerification = () => {
    setTimeout(() => {
      setIsNINModalOpen(false);
      handleNext();
    }, 2000);
  };

  const handlePhoneVerification = () => {
    setTimeout(() => {
      setIsPhoneModalOpen(false);
      handleNext();
    }, 2000);
  };

  const handleSubmit = () => {
    // setShowToast(true);
    // setTimeout(() => setShowToast(false), 3000);
    toast.success("Farmer registration complete!");
    router.push("/farmer");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            fullName={farmerStore.fullName}
            setFullName={(value: string) =>
              farmerStore.setField("fullName", value)
            }
            gender={farmerStore.gender}
            setGender={(value: string) => farmerStore.setField("gender", value)}
            state={farmerStore.state}
            setState={(value: string) => farmerStore.setField("state", value)}
            lga={farmerStore.lga}
            setLga={(value: string) => farmerStore.setField("lga", value)}
            geoPoliticalZone={farmerStore.geoPoliticalZone}
            setGeoPoliticalZone={(value: string) =>
              farmerStore.setField("geoPoliticalZone", value)
            }
          />
        );
      case 1:
        return (
          <NINStep
            nin={farmerStore.nin}
            setNin={(value: string) => farmerStore.setField("nin", value)}
            onVerify={() => setIsNINModalOpen(true)}
          />
        );
      case 2:
        return (
          <PhoneStep
            phoneNumber={farmerStore.phoneNumber}
            setPhoneNumber={(value: string) =>
              farmerStore.setField("phoneNumber", value)
            }
            onVerify={() => setIsPhoneModalOpen(true)}
          />
        );
      case 3:
        return (
          <FarmDetailsStep
            farmType={farmerStore.farmType}
            setFarmType={(value: string) =>
              farmerStore.setField("farmType", value)
            }
            farmSize={farmerStore.farmSize}
            setFarmSize={(value: string) =>
              farmerStore.setField("farmSize", value)
            }
            cropTypes={farmerStore.cropTypes}
            setCropTypes={(value: string[]) =>
              farmerStore.setField("cropTypes", value)
            }
            livestockTypes={farmerStore.livestockTypes}
            setLivestockTypes={(value: string[]) =>
              farmerStore.setField("livestockTypes", value)
            }
          />
        );
      case 4:
        return <CompletionStep onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster richColors />
      <Card className="w-full max-w-2xl rounded-none">
        <CardHeader>
          <CardTitle>
            Farmer Onboarding - Step {currentStep + 1} of {steps.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="rounded-none"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="rounded-none"
          >
            Next
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isNINModalOpen} onOpenChange={setIsNINModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>NIN Verification</DialogTitle>
            <DialogDescription>
              Verifying your National Identification Number...
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={handleNINVerification}
              className="rounded-none w-full"
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phone Verification</DialogTitle>
            <DialogDescription>
              Enter the 4-digit OTP sent to your phone number.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <Input
                  key={i}
                  className="w-full text-center rounded-none"
                  type="text"
                  maxLength={1}
                  onChange={(e) => {
                    if (e.target.value && e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLInputElement).focus();
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handlePhoneVerification}
              className="w-full rounded-none"
            >
              Verify OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* {showToast && (
        <Toast>
          <p className="text-sm font-medium text-gray-900">
            Farmer registration complete!
          </p>
        </Toast>
      )} */}
    </div>
  );
}

interface BasicInfoStepProps {
  fullName: string;
  setFullName: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  lga: string;
  setLga: (value: string) => void;
  geoPoliticalZone: string;
  setGeoPoliticalZone: (value: string) => void;
}

function BasicInfoStep({
  fullName,
  setFullName,
  gender,
  setGender,
  state,
  setState,
  lga,
  setLga,
  geoPoliticalZone,
  setGeoPoliticalZone,
}: BasicInfoStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="rounded-none"
        />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger id="gender" className="rounded-none">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger id="state" className="rounded-none">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {States.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {state && (
        <div>
          <Label htmlFor="lga">LGA</Label>
          <Select value={lga} onValueChange={setLga}>
            <SelectTrigger id="lga" className="rounded-none">
              <SelectValue placeholder="Select LGA" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {localGovernment
                .find((lg) => lg.state === state)
                ?.lgas.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label htmlFor="geoPoliticalZone">Geo-Political Zone</Label>
        <Select value={geoPoliticalZone} onValueChange={setGeoPoliticalZone}>
          <SelectTrigger id="geoPoliticalZone" className="rounded-none">
            <SelectValue placeholder="Select geo-political zone" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {Object.values(GeoPoliticalZone).map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

interface NINStepProps {
  nin: string;
  setNin: (value: string) => void;
  onVerify: () => void;
}

function NINStep({ nin, setNin, onVerify }: NINStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="nin">National Identification Number (NIN)</Label>
        <Input
          id="nin"
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          maxLength={11}
          className="rounded-none"
        />
      </div>
      <Button onClick={onVerify} className="rounded-none w-full">
        Verify NIN
      </Button>
    </div>
  );
}

interface PhoneStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onVerify: () => void;
}

function PhoneStep({ phoneNumber, setPhoneNumber, onVerify }: PhoneStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="08012345678"
          maxLength={11}
          className="rounded-none"
        />
      </div>
      <Button onClick={onVerify} className="rounded-none w-full">
        Verify Phone Number
      </Button>
    </div>
  );
}

interface FarmDetailsStepProps {
  farmType: string;
  setFarmType: (value: string) => void;
  farmSize: string;
  setFarmSize: (value: string) => void;
  cropTypes: string[];
  setCropTypes: (value: string[]) => void;
  livestockTypes: string[];
  setLivestockTypes: (value: string[]) => void;
}

function FarmDetailsStep({
  farmType,
  setFarmType,
  farmSize,
  setFarmSize,
  cropTypes,
  setCropTypes,
  livestockTypes,
  setLivestockTypes,
}: FarmDetailsStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="farmType">Farm Type</Label>
        <Select value={farmType} onValueChange={setFarmType}>
          <SelectTrigger id="farmType" className="rounded-none">
            <SelectValue placeholder="Select farm type" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {Object.values(FarmType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="farmSize">Farm Size</Label>
        <Select value={farmSize} onValueChange={setFarmSize}>
          <SelectTrigger id="farmSize" className="rounded-none">
            <SelectValue placeholder="Select farm size" />
          </SelectTrigger>
          <SelectContent className="rounded-none">
            {Object.values(FarmSize).map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {(farmType === "Crop" || farmType === "Mixed") && (
        <div>
          <Label>Crop Types</Label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(CropType).map((crop) => (
              <div key={crop} className="flex items-center space-x-2">
                <Checkbox
                  id={`crop-${crop}`}
                  checked={cropTypes.includes(crop)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setCropTypes([...cropTypes, crop]);
                    } else {
                      setCropTypes(cropTypes.filter((t) => t !== crop));
                    }
                  }}
                />
                <Label htmlFor={`crop-${crop}`}>{crop}</Label>
              </div>
            ))}
          </div>
        </div>
      )}
      {(farmType === "Livestock" || farmType === "Mixed") && (
        <div>
          <Label htmlFor="livestockTypes">Livestock Types</Label>
          <Input
            id="livestockTypes"
            value={livestockTypes.join(", ")}
            onChange={(e) => setLivestockTypes(e.target.value.split(", "))}
            placeholder="Enter livestock types separated by commas"
            className="rounded-none"
          />
        </div>
      )}
    </div>
  );
}

function CompletionStep({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="space-y-4">
      <p>
        Thank you for completing the onboarding process. Click submit to
        finalize your registration.
      </p>
      <Button onClick={onSubmit} className="w-full rounded-none">
        Submit Registration
      </Button>
    </div>
  );
}
