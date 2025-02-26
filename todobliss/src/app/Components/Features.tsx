import type React from "react"
import { Zap, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant updates and real-time syncing across all your devices",
    color: "#FF6B6B",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Your data is encrypted and safely stored in the cloud",
    color: "#4ECDC4",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Built-in time tracking to help you stay productive",
    color: "#FFE66D",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
              Features you'll love
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl">
              Everything you need to stay organized and productive
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  color: string
}

function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full`}
        style={{ backgroundColor: `${color}10` }}
      >
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

