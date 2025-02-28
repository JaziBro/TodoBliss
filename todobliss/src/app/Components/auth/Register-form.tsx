"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Authlogo } from "./Authlogo"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/app/api/api"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function SignUpForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // const response = await api.post("/register", {
      //   username: fullName,
      //   email,
      //   password,
      // })

      toast("Registration Successful")
      router.push("/login")
    } catch (error) {
      console.error("Registration failed:", error)
      toast( "Registration Failed. Please try agein")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <Authlogo />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegister} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="fullname" className="block text-sm/6 font-medium text-white">
                Full Name
              </label>
              <div className="mt-2">
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={isLoading}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-md bg-gray-900/50 border-gray-800 text-white px-3 py-1.5 text-base placeholder:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-gray-900/50 border-gray-800 text-white px-3 py-1.5 text-base placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="very-secret-password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-900/50 border-gray-800 text-white px-3 py-1.5 text-base placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center rounded-md bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#4ECDC4] hover:text-[#4ECDC4]/90 underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

