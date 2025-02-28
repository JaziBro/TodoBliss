import Link from "next/link"
import { ListTodo } from "lucide-react"
import logo from "../../../public/logo-01.png"
import Image from "next/image"

function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-800">
      <Link className="flex items-center gap-2 font-semibold" href="/">
        <Image src={logo} alt="TodoBliss" className="w-24 h-24"/>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
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
    </header>
  )
}

export default Navbar
