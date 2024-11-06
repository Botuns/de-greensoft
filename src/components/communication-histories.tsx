"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Communication {
  id: number;
  date: string;
  recipient: string;
  message: string;
  channels: string[];
}

export function CommunicationHistory() {
  const [communications, setCommunications] = useState<Communication[]>([]);

  useEffect(() => {
    // Simulate API call to fetch communication history
    setTimeout(() => {
      setCommunications([
        {
          id: 1,
          date: "2024-03-06",
          recipient: "Livestock Farmers",
          message: "New vaccination schedule",
          channels: ["In-App", "SMS"],
        },
        {
          id: 2,
          date: "2024-03-05",
          recipient: "John Doe",
          message: "Farm inspection reminder",
          channels: ["Email"],
        },
        {
          id: 3,
          date: "2024-03-04",
          recipient: "Crop Farmers",
          message: "Weather alert: Heavy rain expected",
          channels: ["In-App", "SMS", "Email"],
        },
      ]);
    }, 1000);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Communication History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Channels</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {communications.map((comm) => (
            <TableRow key={comm.id}>
              <TableCell>{comm.date}</TableCell>
              <TableCell>{comm.recipient}</TableCell>
              <TableCell>{comm.message}</TableCell>
              <TableCell>{comm.channels.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
