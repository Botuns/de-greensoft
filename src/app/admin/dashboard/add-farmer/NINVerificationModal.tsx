"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type NINVerificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nin: string;
};

export function NINVerificationModal({
  isOpen,
  onClose,
  nin,
}: NINVerificationModalProps) {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    // Simulating OTP verification
    if (otp.length === 6) {
      setIsVerified(true);
      setTimeout(() => {
        onClose();
        setIsVerified(false);
        setOtp("");
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NIN Verification</DialogTitle>
        </DialogHeader>
        <p>
          An OTP has been sent to the phone number associated with NIN: {nin}
        </p>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
        />
        <Button onClick={handleVerify} disabled={otp.length !== 6}>
          Verify
        </Button>
        {isVerified && <p className="text-green-500">Successfully verified!</p>}
      </DialogContent>
    </Dialog>
  );
}
