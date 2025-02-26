const stats = [
    { number: "2M+", label: "Active Users" },
    { number: "50M+", label: "Tasks Completed" },
    { number: "180+", label: "Countries" },
    { number: "99.9%", label: "Uptime" },
  ]
  
  export function StatsSection() {
    return (
      <section className="w-full py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFE66D]/10" />
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-2 p-8 rounded-xl bg-gray-800/30 backdrop-blur-sm"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  