"use client";

import { useState, useCallback } from "react";
import { create } from "zustand";
import { format, subDays, isWithinInterval, parseISO } from "date-fns";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
// import { DateRangePicker } from "@/components/ui/date-range-picker";

// Mock data for transactions
const mockTransactions = [
  {
    id: 1,
    farmerName: "Adebayo Ogunlesi",
    farmerId: "F001",
    amount: 250000,
    status: "completed",
    date: "2024-11-15T10:30:00",
    paymentMethod: "Bank Transfer",
    bankName: "First Bank of Nigeria",
    accountNumber: "**** 1234",
    reference: "TRX001",
  },
  {
    id: 2,
    farmerName: "Amina Mohammed",
    farmerId: "F002",
    amount: 180000,
    status: "pending",
    date: "2024-11-18T14:45:00",
    paymentMethod: "Mobile Money",
    provider: "MTN Mobile Money",
    phoneNumber: "**** 5678",
    reference: "TRX002",
  },
  {
    id: 3,
    farmerName: "Chukwuma Nwosu",
    farmerId: "F003",
    amount: 300000,
    status: "failed",
    date: "2024-11-20T09:15:00",
    paymentMethod: "Bank Transfer",
    bankName: "Zenith Bank",
    accountNumber: "**** 9012",
    reference: "TRX003",
  },
  // Add more mock transactions here...
];

const paymentMethods = ["All Methods", "Bank Transfer", "Mobile Money", "Cash"];
const statuses = ["All Statuses", "completed", "pending", "failed"];

interface TransactionStore {
  transactions: typeof mockTransactions;
  filteredTransactions: typeof mockTransactions;
  selectedPaymentMethod: string;
  selectedStatus: string;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  dateRange: { from: Date | undefined; to: Date | undefined };
  setSelectedPaymentMethod: (method: string) => void;
  setSelectedStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  setDateRange: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  filterTransactions: () => void;
}

const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: mockTransactions,
  filteredTransactions: mockTransactions,
  selectedPaymentMethod: "All Methods",
  selectedStatus: "All Statuses",
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 10,
  dateRange: { from: subDays(new Date(), 30), to: new Date() },
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
  setDateRange: (range) => set({ dateRange: range }),
  filterTransactions: () => {
    const {
      transactions,
      selectedPaymentMethod,
      selectedStatus,
      searchQuery,
      dateRange,
    } = get();
    const filtered = transactions.filter((transaction) => {
      const methodMatch =
        selectedPaymentMethod === "All Methods" ||
        transaction.paymentMethod === selectedPaymentMethod;
      const statusMatch =
        selectedStatus === "All Statuses" ||
        transaction.status === selectedStatus;
      const searchMatch = transaction.farmerName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const dateMatch =
        dateRange.from &&
        dateRange.to &&
        isWithinInterval(parseISO(transaction.date), {
          start: dateRange.from,
          end: dateRange.to,
        });
      return methodMatch && statusMatch && searchMatch && dateMatch;
    });
    set({ filteredTransactions: filtered, currentPage: 1 });
  },
}));

export default function TransactionHistoryPage() {
  const {
    filteredTransactions,
    selectedPaymentMethod,
    selectedStatus,
    searchQuery,
    currentPage,
    itemsPerPage,
    dateRange,
    setSelectedPaymentMethod,
    setSelectedStatus,
    setSearchQuery,
    setCurrentPage,
    setDateRange,
    filterTransactions,
  } = useTransactionStore();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof mockTransactions)[0] | null
  >(null);

  const handleSort = useCallback(
    (key: string) => {
      let direction: "asc" | "desc" = "asc";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "asc"
      ) {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'never'.
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'never'.
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColor = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };

  const exportCSV = useCallback(() => {
    const headers = [
      "ID",
      "Farmer Name",
      "Amount",
      "Status",
      "Date",
      "Payment Method",
    ];
    const csvContent =
      headers.join(",") +
      "\n" +
      filteredTransactions
        .map((t) =>
          [
            t.id,
            t.farmerName,
            t.amount,
            t.status,
            format(new Date(t.date), "yyyy-MM-dd HH:mm:ss"),
            t.paymentMethod,
          ].join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "transaction_history.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [filteredTransactions]);

  const totalAmount = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const completedTransactions = filteredTransactions.filter(
    (t) => t.status === "completed"
  );
  const completedAmount = completedTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <Button onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transactions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredTransactions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {completedTransactions.length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{totalAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ₦{completedAmount.toLocaleString()} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Transaction
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦
              {(
                totalAmount / filteredTransactions.length || 0
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              filterTransactions();
            }}
            className="w-full"
          />
        </div>
        <Select
          value={selectedPaymentMethod}
          onValueChange={(value) => {
            setSelectedPaymentMethod(value);
            filterTransactions();
          }}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedStatus}
          onValueChange={(value) => {
            setSelectedStatus(value);
            filterTransactions();
          }}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateRangePicker
          date={dateRange}
          onDateChange={(newDateRange) => {
            // @ts-expect-error: Argument of type 'DateRange' is not assignable to parameter of type 'SetStateAction<{ from: Date | undefined; to: Date | undefined; }>'.
            setDateRange(newDateRange);
            filterTransactions();
          }}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("id")}
                  className="font-bold"
                >
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("farmerName")}
                  className="font-bold"
                >
                  Farmer Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("amount")}
                  className="font-bold"
                >
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("date")}
                  className="font-bold"
                >
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.farmerName}</TableCell>
                <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      statusColor[
                        transaction.status as keyof typeof statusColor
                      ]
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(transaction.date), "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Download receipt</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Report issue</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{" "}
          {filteredTransactions.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage - 2 + i;
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            }
            return null;
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog
        open={!!selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected transaction.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input
                  id="id"
                  value={selectedTransaction.id}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="farmerName" className="text-right">
                  Farmer Name
                </Label>
                <Input
                  id="farmerName"
                  value={selectedTransaction.farmerName}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="farmerId" className="text-right">
                  Farmer ID
                </Label>
                <Input
                  id="farmerId"
                  value={selectedTransaction.farmerId}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  value={`₦${selectedTransaction.amount.toLocaleString()}`}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  value={selectedTransaction.status}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  value={format(new Date(selectedTransaction.date), "PPpp")}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentMethod" className="text-right">
                  Payment Method
                </Label>
                <Input
                  id="paymentMethod"
                  value={selectedTransaction.paymentMethod}
                  className="col-span-3"
                  readOnly
                />
              </div>
              {selectedTransaction.paymentMethod === "Bank Transfer" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bankName" className="text-right">
                      Bank Name
                    </Label>
                    <Input
                      id="bankName"
                      value={selectedTransaction.bankName}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="accountNumber" className="text-right">
                      Account Number
                    </Label>
                    <Input
                      id="accountNumber"
                      value={selectedTransaction.accountNumber}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                </>
              )}
              {selectedTransaction.paymentMethod === "Mobile Money" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="provider" className="text-right">
                      Provider
                    </Label>
                    <Input
                      id="provider"
                      value={selectedTransaction.provider}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phoneNumber" className="text-right">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={selectedTransaction.phoneNumber}
                      className="col-span-3"
                      readOnly
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reference" className="text-right">
                  Reference
                </Label>
                <Input
                  id="reference"
                  value={selectedTransaction.reference}
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
