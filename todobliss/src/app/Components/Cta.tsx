import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CTA() {
  return (
    <section className="w-full h-screen py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFE66D]/10" />
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-[#4ECDC4] to-[#FFE66D] text-transparent bg-clip-text">
            Start organizing today
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
            Join thousands of users who trust TaskFlow to manage their daily tasks.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit" className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white">
              Sign Up
            </Button>
          </form>
          <p className="text-xs text-gray-500">Free forever. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}

