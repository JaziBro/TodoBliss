import Link from "next/link"
import { ListTodo } from "lucide-react"
import { SITE } from "@/lib/constants"

function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
      <Link className="flex items-center gap-2 font-semibold" href="/">
        <ListTodo className="h-6 w-6 text-[#FF6B6B]" />
        <span className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">{SITE.name}</span>
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
