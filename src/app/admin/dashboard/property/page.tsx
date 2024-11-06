"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FileText, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Property {
  id: string;
  name: string;
  type: string;
  size: number;
  location: string;
  owner: string;
  ownerType: "government" | "individual" | "organization";
  status: "available" | "leased" | "pending";
  documents: string[];
  images: string[];
  activities: { date: string; description: string }[];
}

const mockProperties: Property[] = [
  {
    id: "1",
    name: "Green Acres",
    type: "Farmland",
    size: 100,
    location: "Lagos",
    owner: "Nigerian Government",
    ownerType: "government",
    status: "available",
    documents: ["deed.pdf", "survey.pdf"],
    images: [
      "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg",
      "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg",
    ],
    activities: [
      { date: "2024-03-06", description: "Property listed" },
      { date: "2024-03-07", description: "Soil analysis conducted" },
    ],
  },
  {
    id: "2",
    name: "Sunny Fields",
    type: "Orchard",
    size: 50,
    location: "Abuja",
    owner: "John Doe",
    ownerType: "individual",
    status: "leased",
    documents: ["lease_agreement.pdf"],
    images: [
      "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg",
      "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg",
    ],
    activities: [
      { date: "2024-03-05", description: "Lease agreement signed" },
      { date: "2024-03-08", description: "Irrigation system installed" },
    ],
  },
  {
    id: "3",
    name: "Sunny Fields",
    type: "Orchard",
    size: 50,
    location: "Abuja",
    owner: "John Doe",
    ownerType: "individual",
    status: "pending",
    documents: ["lease_agreement.pdf"],
    images: [
      "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg",
      "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg",
    ],
    activities: [
      { date: "2024-03-05", description: "Lease agreement signed" },
      { date: "2024-03-08", description: "Irrigation system installed" },
    ],
  },
];

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLeaseOpen, setIsLeaseOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch properties
    setTimeout(() => {
      setProperties(mockProperties);
    }, 1000);
  }, []);

  const PropertyList = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size (ha)</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell>{property.name}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.size}</TableCell>
            <TableCell>{property.location}</TableCell>
            <TableCell>{property.owner}</TableCell>
            <TableCell>
              <Badge
                variant={
                  property.status === "available"
                    ? "default"
                    : property.status === "leased"
                    ? "secondary"
                    : "outline"
                }
              >
                {property.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedProperty(property);
                  setIsDetailsOpen(true);
                }}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const PropertyApproval = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties
          .filter((p) => p.status === "pending")
          .map((property) => (
            <TableRow key={property.id}>
              <TableCell>{property.name}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>{property.owner}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleApprove(property.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(property.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  const PropertyDetails = () => {
    if (!selectedProperty) return null;
    return (
      <ScrollArea className="">
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <ScrollArea>
              <DialogHeader>
                <DialogTitle>{selectedProperty.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Input value={selectedProperty.type} readOnly />
                  </div>
                  <div>
                    <Label>Size (ha)</Label>
                    <Input value={selectedProperty.size} readOnly />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={selectedProperty.location} readOnly />
                  </div>
                  <div>
                    <Label>Owner</Label>
                    <Input value={selectedProperty.owner} readOnly />
                  </div>
                  <div>
                    <Label>Owner Type</Label>
                    <Input value={selectedProperty.ownerType} readOnly />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Input value={selectedProperty.status} readOnly />
                  </div>
                </div>
                <div>
                  <Label>Documents</Label>
                  <div className="flex gap-2 mt-2">
                    {selectedProperty.documents.map((doc, index) => (
                      <Badge key={index} variant="secondary">
                        <FileText className="w-4 h-4 mr-2" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Images</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {selectedProperty.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Recent Activities</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedProperty.activities.map((activity, index) => (
                        <TableRow key={index}>
                          <TableCell>{activity.date}</TableCell>
                          <TableCell>{activity.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </ScrollArea>
    );
  };

  const LeaseProperty = () => {
    const [farmer, setFarmer] = useState("");
    const [propertyId, setPropertyId] = useState("");

    const handleLease = () => {
      // Simulate API call to lease property
      console.log(`Leasing property ${propertyId} to farmer ${farmer}`);
      setIsLeaseOpen(false);
    };

    return (
      <Dialog open={isLeaseOpen} onOpenChange={setIsLeaseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lease Property</DialogTitle>
            <DialogDescription>
              Enter the details to lease a property to a farmer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="farmer" className="text-right">
                Farmer
              </Label>
              <Input
                id="farmer"
                value={farmer}
                onChange={(e) => setFarmer(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="property" className="text-right">
                Property
              </Label>
              <Select onValueChange={setPropertyId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties
                    .filter((p) => p.status === "available")
                    .map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleLease}>Lease Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const AddProperty = () => {
    const [newProperty, setNewProperty] = useState<Partial<Property>>({
      name: "",
      type: "",
      size: 0,
      location: "",
      owner: "",
      ownerType: "individual",
      status: "available",
      documents: [],
      images: [],
      activities: [],
    });

    const handleAddProperty = () => {
      // Simulate API call to add new property
      const id = (properties.length + 1).toString();
      setProperties([...properties, { ...newProperty, id } as Property]);
      setIsAddPropertyOpen(false);
    };

    return (
      <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newProperty.name}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={newProperty.type}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, type: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="size">Size (ha)</Label>
                <Input
                  id="size"
                  type="number"
                  value={newProperty.size}
                  onChange={(e) =>
                    setNewProperty({
                      ...newProperty,
                      size: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newProperty.location}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="owner">Owner</Label>
                <Input
                  id="owner"
                  value={newProperty.owner}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, owner: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="ownerType">Owner Type</Label>
                <Select
                  onValueChange={(value: Property["ownerType"]) =>
                    setNewProperty({ ...newProperty, ownerType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="documents">Documents (comma-separated)</Label>
              <Input
                id="documents"
                value={newProperty.documents?.join(", ")}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    documents: e.target.value.split(", "),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="images">Images (comma-separated URLs)</Label>
              <Input
                id="images"
                value={newProperty.images?.join(", ")}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    images: e.target.value.split(", "),
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddProperty} className="w-full">
              Add Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const Analytics = () => {
    const data = [
      {
        name: "Available",
        value: properties.filter((p) => p.status === "available").length,
      },
      {
        name: "Leased",
        value: properties.filter((p) => p.status === "leased").length,
      },
      {
        name: "Pending",
        value: properties.filter((p) => p.status === "pending").length,
      },
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle>Property Analytics</CardTitle>
          <CardDescription>
            Overview of property status and distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  const handleApprove = (id: string) => {
    // Simulate API call to approve property
    setProperties(
      properties.map((p) => (p.id === id ? { ...p, status: "available" } : p))
    );
  };

  const handleReject = (id: string) => {
    // Simulate API call to reject property
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Management</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Properties</TabsTrigger>
          <TabsTrigger value="approve">Properties to Approve</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Property List</h2>
            <Button onClick={() => setIsAddPropertyOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Property
            </Button>
          </div>
          <PropertyList />
        </TabsContent>
        <TabsContent value="approve">
          <PropertyApproval />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
      <Button className="mt-4" onClick={() => setIsLeaseOpen(true)}>
        Lease Property to Farmer
      </Button>
      <PropertyDetails />
      <LeaseProperty />
      <AddProperty />
    </div>
  );
}
