import Image from "next/image";
import Link from "next/link";
import React from "react";

// type Props = {};

function NavBar() {
  return (
    <div className="inset-0 z-50">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center fixed z-50 bg-blend-saturation bg-white">
        <div className="flex items-center">
          <Image
            src="https://www.ekitistate.gov.ng/wp-content/uploads/LOGO-1.jpg?height=40&width=40"
            alt="Genonstera logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-semibold text-gray-800">
            De GreenSoft
          </span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Platform
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Solutions
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Company
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Stories
          </Link>
        </nav>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm">
          Contact Us
        </button>
      </header>
    </div>
  );
}

export default NavBar;