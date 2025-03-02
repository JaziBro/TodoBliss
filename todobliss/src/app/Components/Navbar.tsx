"use client"

import Link from "next/link";
import logo from "../../../public/logo-01.png";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800">
      <Link className="flex items-center gap-2 font-semibold" href="/">
        <Image src={logo} alt="TodoBliss" className="w-24 h-24" />
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:text-[#4ECDC4] transition-colors" href="/">
          Home
        </Link>
        <Link className="text-sm font-medium hover:text-[#4ECDC4] transition-colors" href="#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:text-[#4ECDC4] transition-colors" href="/about">
          About
        </Link>
      </nav>
      <div className="md:hidden ml-auto">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
            <div className="flex justify-between items-center">
              <Image src={logo} alt="TodoBliss" className="w-24 h-24" />
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-8">
              <Link className="text-sm font-medium text-white hover:text-[#4ECDC4] transition-colors" href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link className="text-sm font-medium text-white hover:text-[#4ECDC4] transition-colors" href="#features" onClick={() => setIsOpen(false)}>
                Features
              </Link>
              <Link className="text-sm font-medium text-white hover:text-[#4ECDC4] transition-colors" href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
