"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type FarmType = "livestock" | "crop" | "mixed";

interface CommunicationFormProps {
  onSuccess: (message: string) => void;
}

export function CommunicationForm({ onSuccess }: CommunicationFormProps) {
  const [recipient, setRecipient] = useState<
    "category" | "individual" | "bulk"
  >("category");
  const [farmType, setFarmType] = useState<FarmType>("livestock");
  const [individualFarmer, setIndividualFarmer] = useState("");
  const [bulkFarmers, setBulkFarmers] = useState("");
  const [message, setMessage] = useState("");
  const [notificationChannels, setNotificationChannels] = useState({
    inApp: true,
    sms: false,
    email: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onSuccess(
        `Message sent successfully to ${
          recipient === "category"
            ? farmType
            : recipient === "individual"
            ? individualFarmer
            : "bulk"
        } farmers`
      );
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Recipient Type</Label>
        <Select
          onValueChange={(value: "category" | "individual" | "bulk") =>
            setRecipient(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select recipient type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="individual">Individual Farmer</SelectItem>
            <SelectItem value="bulk">Bulk Farmers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {recipient === "category" && (
        <div>
          <Label>Farm Type</Label>
          <Select onValueChange={(value: FarmType) => setFarmType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select farm type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="livestock">Livestock</SelectItem>
              <SelectItem value="crop">Crop</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {recipient === "individual" && (
        <div>
          <Label>Individual Farmer</Label>
          <Input
            type="text"
            placeholder="Enter farmer's name or ID"
            value={individualFarmer}
            onChange={(e) => setIndividualFarmer(e.target.value)}
          />
        </div>
      )}

      {recipient === "bulk" && (
        <div>
          <Label>Bulk Farmers</Label>
          <Textarea
            placeholder="Enter farmers' names or IDs (comma-separated)"
            value={bulkFarmers}
            onChange={(e) => setBulkFarmers(e.target.value)}
          />
        </div>
      )}

      <div>
        <Label>Message</Label>
        <Textarea
          placeholder="Enter your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Notification Channels</Label>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inApp"
              checked={notificationChannels.inApp}
              onCheckedChange={(checked) =>
                setNotificationChannels((prev) => ({
                  ...prev,
                  inApp: checked as boolean,
                }))
              }
            />
            <label htmlFor="inApp">In-App</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sms"
              checked={notificationChannels.sms}
              onCheckedChange={(checked) =>
                setNotificationChannels((prev) => ({
                  ...prev,
                  sms: checked as boolean,
                }))
              }
            />
            <label htmlFor="sms">SMS</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={notificationChannels.email}
              onCheckedChange={(checked) =>
                setNotificationChannels((prev) => ({
                  ...prev,
                  email: checked as boolean,
                }))
              }
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
