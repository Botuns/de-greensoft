"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Leaf,
  MapPin,
  Calendar,
  MessageCircle,
  CreditCard,
  FileText,
  Truck,
  Zap,
} from "lucide-react";
// import MasonryGallery from "./MasonryGallery";

export default function LandingPageSections() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-all hover:shadow-lg rounded-none"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Farm Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={`/assets/${index + 1}.jpeg`}
                  alt={`Farm image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* <MasonryGallery /> */}

      {/* Call to Action Section */}
      <section className="py-16 bg-green-600 text-white my-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="mb-8 text-lg">
            Join our platform and experience the future of agriculture
            management.
          </p>
          <Button variant="secondary" size="lg" className="rounded-none">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Farmers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="italic mb-4">&apos;{testimonial.quote}&apos;</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                Empowering farmers with cutting-edge technology for better farm
                management and increased productivity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm mb-2">123 Farm Road, Ekiti State</p>
              <p className="text-sm mb-2">Phone: (234) 123-4567</p>
              <p className="text-sm">Email: info@ekitifarmportal.com</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>
              &copy; 2023 Ekiti State Farm Management Portal. All rights
              reserved.
            </p>
            <small>Powered by De Greensoft Networks and Technologies</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Farmer Registration",
    description: "Easy registration and management of farmer information.",
    icon: CheckCircle,
  },
  {
    title: "E-Notification",
    description: "Stay updated with real-time notifications and alerts.",
    icon: MessageCircle,
  },
  {
    title: "Online Payments",
    description: "Secure and convenient online payment system.",
    icon: CreditCard,
  },
  {
    title: "Report Generation",
    description: "Generate comprehensive reports for better insights.",
    icon: FileText,
  },
  {
    title: "Online Ordering",
    description: "Streamlined ordering and delivery services.",
    icon: Truck,
  },
  {
    title: "Geo-tagging",
    description: "Precise location tracking and mapping of farm assets.",
    icon: MapPin,
  },
  {
    title: "Precision Farming",
    description: "Advanced tools for precision agriculture practices.",
    icon: Zap,
  },
  {
    title: "Activity Scheduling",
    description: "Efficient planning and scheduling of farm activities.",
    icon: Calendar,
  },
  {
    title: "Crop Management",
    description: "Comprehensive crop lifecycle management tools.",
    icon: Leaf,
  },
];

// const testimonials = [
//   {
//     quote:
//       "This portal has revolutionized how I manage my farm. It's user-friendly and packed with features!",
//     name: "Adebayo Ogunlesi",
//     role: "Crop Farmer",
//   },
//   {
//     quote:
//       "The precision farming support has significantly increased my yield. I'm impressed!",
//     name: "Funmilayo Adeyemi",
//     role: "Tech-savvy Farmer",
//   },
//   {
//     quote:
//       "The e-notification system keeps me updated on important information. It's a game-changer!",
//     name: "Oluwaseun Adekunle",
//     role: "Livestock Farmer",
//   },
// ];
