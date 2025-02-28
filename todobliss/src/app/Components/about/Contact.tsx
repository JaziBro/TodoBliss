import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/10 via-[#4ECDC4]/10 to-[#FFE66D]/10" />
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">
                Get in Touch
              </h2>
              <p className="text-gray-400 md:text-xl">Have questions? We&apos;d love to hear from you.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-[#FF6B6B]" />
                <p className="text-gray-400">123 Innovation Street, Tech City, TC 12345</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-[#4ECDC4]" />
                <p className="text-gray-400">hello@todobliss.com</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-[#FFE66D]" />
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-800/50 p-8">
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Input
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input
                  className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  className="min-h-[150px] bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="Your message"
                />
              </div>
              <Button className="w-full bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

