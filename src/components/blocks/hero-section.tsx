import Image from "next/image";
import Link from "next/link";
import { Shrub } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-white min-h-screen max-sm:mt-4">
      <main className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-sm font-semibold bg-gray-200 mb-2 w-fit p-1 px-2 rounded-[1rem] barlow-bold">
            Farmers Management System
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 pt-serif-bold leading-tight">
            Increasing Farm{" "}
            <span className="bg-green-200 px-2 rounded">Productivity</span>
          </h1>
          <p className="text-gray-600 mb-6 max-w-md">
            Addressing agriculture&apos;s challenges means solving problems
            across value chain. It provides solution for farm advisors and firms
            with supply chain.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white border border-green-600 text-gray-800 px-6 py-2 rounded-full text-sm hover:bg-gray-100">
              More About
            </button>
            <button className="bg-white border border-green-600 text-gray-800 px-6 py-2 rounded-full text-sm hover:bg-gray-100">
              How It Works
            </button>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <Image
            src="/degreen-soft.png?height=400&width=400"
            alt="Farm management software"
            width={500}
            height={500}
            className="mx-auto"
            // layout="fill"
          />

          <div className="absolute top-0 right-0 bg-orange-500 text-white rounded-full p-2 text-xs flex flex-col text-center items-center shadow-md">
            <Shrub className="" />
            Productivity <br /> Growth
          </div>
        </div>
      </main>

      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="bg-yellow-200 p-4 rounded-lg flex flex-col items-center md:w-1/3">
          <Image
            src="/p1.jpeg?height=80&width=80"
            alt="Organic produce"
            width={250}
            height={260}
            className="mt-[-5rem]"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              An initiative by Degreesoft fully funded by Ekiti State Governent{" "}
            </h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow md:w-1/3">
          <h3 className="font-semibold text-gray-800 mb-2">
            Data Integrations
          </h3>
          <p className="text-sm text-gray-600">
            Boost up the application of your digital integrations seamlessly
            with over 32 digital sources.
          </p>
          <Link
            href="#"
            className="text-sm text-gray-800 font-semibold mt-2 inline-block"
          >
            Details →
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow md:w-1/3">
          <h3 className="font-semibold text-gray-800 mb-2">In this App</h3>
          <p className="text-sm text-gray-600">
            App users can easily integrate and manage their farm data into
            actionable insights.
          </p>
          <Link
            href="#"
            className="text-sm text-gray-800 font-semibold mt-2 inline-block"
          >
            Details →
          </Link>
        </div>
      </section>
    </div>
  );
}
