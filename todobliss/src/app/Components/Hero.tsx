import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFE66D]/10" />
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] text-transparent bg-clip-text">
                Stay organized with TaskFlow
              </h1>
              <p className="max-w-[600px] text-gray-400 md:text-xl">
                The simple, intuitive todo app that helps you manage tasks, boost productivity, and achieve your goals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <TaskPreview />
        </div>
      </div>
    </section>
  )
}

function TaskPreview() {
  return (
    <div className="mx-auto w-full max-w-[400px] aspect-square rounded-xl bg-gray-900/50 backdrop-blur-sm p-8 border border-gray-800">
      <div className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg bg-gray-800/50 p-4">
          <CheckCircle className="h-6 w-6 text-[#4ECDC4]" />
          <div className="line-through text-gray-400">Complete project proposal</div>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-gray-800/50 p-4">
          <div className="h-6 w-6 rounded-full border-2 border-[#FF6B6B]" />
          <div>Review team updates</div>
        </div>
        <div className="flex items-center gap-4 rounded-lg bg-gray-800/50 p-4">
          <div className="h-6 w-6 rounded-full border-2 border-[#FFE66D]" />
          <div>Plan weekly meeting</div>
        </div>
      </div>
    </div>
  )
}

export default Hero


