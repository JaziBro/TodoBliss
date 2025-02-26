import { AboutHero } from "@/app/Components/about/Hero"
import { ValuesSection } from "@/app/Components/about/Values"
import { StatsSection } from "@/app/Components/about/Stats"
import { ContactSection } from "@/app/Components/about/Contact"

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <ValuesSection />
      <StatsSection />
      <ContactSection />
    </div> 
  )
}

