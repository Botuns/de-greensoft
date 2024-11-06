"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunicationForm } from "@/components/communication-form";
import { CommunicationHistory } from "@/components/communication-histories";
import { SuccessModal } from "@/components/success-modal";

export default function Communication() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4 md:max-w-5xl bg-white md:p-8 md:mt-[5%] rounded">
      <h1 className="text-2xl font-bold mb-4 text-primary">
        Communication Center
      </h1>
      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>
        <TabsContent value="compose">
          <CommunicationForm onSuccess={setSuccessMessage} />
        </TabsContent>
        <TabsContent value="history">
          <CommunicationHistory />
        </TabsContent>
      </Tabs>
      {successMessage && (
        <SuccessModal
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
}
