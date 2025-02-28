import { Sparkles, Heart, Zap, Users } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "Delightful Experience",
    description: "We believe productivity tools should bring joy to your daily workflow.",
    color: "#FF6B6B",
  },
  {
    icon: Heart,
    title: "User-Centered",
    description: "Every feature we build starts with our users' needs and feedback.",
    color: "#4ECDC4",
  },
  {
    icon: Zap,
    title: "Continuous Innovation",
    description: "We're always exploring new ways to make task management better.",
    color: "#FFE66D",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our community shapes the future of TodoBliss through active collaboration.",
    color: "#FF6B6B",
  },
]

export function ValuesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
            Our Values
          </h2>
          <p className="text-gray-400 md:text-xl max-w-[700px]">The principles that guide everything we do</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-gray-800/50">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: `${value.color}10` }}
              >
                <value.icon className="h-8 w-8" style={{ color: value.color }} />
              </div>
              <h3 className="text-xl font-bold">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

