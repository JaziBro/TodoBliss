export function AboutHero() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFE66D]/10" />
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] text-transparent bg-clip-text">
              Making Productivity Fun
            </h1>
            <p className="text-gray-400 md:text-xl max-w-[700px]">
              TaskFlow started with a simple idea: productivity tools should be enjoyable to use. We're on a mission to
              make task management delightful while keeping it powerful and efficient.
            </p>
          </div>
        </div>
      </section>
    )
}
  
  