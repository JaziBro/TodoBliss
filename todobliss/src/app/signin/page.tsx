import { SignInForm } from "@/app/Components/Sign-in-form"
import Image from "next/image"

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh]">
      <div className="flex-1 flex items-center justify-center p-8 bg-[#1A1A1A]">
        <SignInForm />
      </div>
      <div className="hidden lg:block flex-1 relative bg-gray-900">
        {/* Fallback content in case image fails to load */}
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#FF6B6B]/5 via-[#4ECDC4]/5 to-[#FFE66D]/5">
          <div className="p-8 text-center space-y-4">
            <div className="w-full max-w-md aspect-video rounded-lg bg-gray-800/50 backdrop-blur-sm" />
            <div className="w-32 h-8 rounded bg-gray-800/50 backdrop-blur-sm mx-auto" />
          </div>
        </div>
        {/* Main image with gradient overlay */}
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Modern workspace with laptop and accessories"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/20 via-[#4ECDC4]/20 to-[#FFE66D]/20 backdrop-blur-sm" />
      </div>
    </div>
  )
}

