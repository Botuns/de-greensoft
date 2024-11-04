"use client";

import { useState } from "react";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const paymentMethodSchema = z.object({
  type: z.enum(["bank", "card", "wallet"]),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(10, {
    message: "Account number must be at least 10 characters.",
  }),
  bankName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  walletProvider: z.string().optional(),
});

type PaymentMethod = z.infer<typeof paymentMethodSchema>;

interface PaymentMethodStore {
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: PaymentMethod) => void;
}

const usePaymentMethodStore = create<PaymentMethodStore>((set) => ({
  paymentMethods: [],
  addPaymentMethod: (method) =>
    set((state) => ({ paymentMethods: [...state.paymentMethods, method] })),
}));

export default function AddPaymentPage() {
  const [selectedType, setSelectedType] = useState<"bank" | "card" | "wallet">(
    "bank"
  );
  const addPaymentMethod = usePaymentMethodStore(
    (state) => state.addPaymentMethod
  );

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: "bank",
      name: "",
      accountNumber: "",
    },
  });

  function onSubmit(data: PaymentMethod) {
    addPaymentMethod(data);
    toast({
      title: "Payment method added",
      description: "Your new payment method has been successfully added.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Add New Payment Method</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Method Details</CardTitle>
          <CardDescription>
            Add a new payment method for disbursing funds to farmers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method Type</FormLabel>
                    <Select
                      onValueChange={(value: "bank" | "card" | "wallet") => {
                        field.onChange(value);
                        setSelectedType(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment method type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bank">
                          <div className="flex items-center">
                            <Landmark className="mr-2 h-4 w-4" />
                            Bank Account
                          </div>
                        </SelectItem>
                        <SelectItem value="card">
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit/Debit Card
                          </div>
                        </SelectItem>
                        <SelectItem value="wallet">
                          <div className="flex items-center">
                            <Wallet className="mr-2 h-4 w-4" />
                            Digital Wallet
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type of payment method you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Account</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the name associated with this payment method.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedType === "bank"
                        ? "Account Number"
                        : selectedType === "card"
                        ? "Card Number"
                        : "Wallet ID"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          selectedType === "bank"
                            ? "0123456789"
                            : selectedType === "card"
                            ? "1234 5678 9012 3456"
                            : "wallet@example.com"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {selectedType === "bank"
                        ? "Enter your bank account number."
                        : selectedType === "card"
                        ? "Enter your card number without spaces."
                        : "Enter your wallet ID or associated email."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedType === "bank" && (
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter bank name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedType === "card" && (
                <>
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {selectedType === "wallet" && (
                <FormField
                  control={form.control}
                  name="walletProvider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wallet Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter wallet provider" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full">
                Add Payment Method
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
