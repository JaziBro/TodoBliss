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

export default function SignInForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const params = new URLSearchParams()
      params.append("username", username)
      params.append("password", password)

      const response = await api.post("/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      localStorage.setItem("token", response.data.access_token)
      router.push("/todos")
    } catch (error) {
      console.error("Login failed:", error)
      toast("Login Failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <Authlogo />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-white">
              Username
            </label>
            <div className="mt-2">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                required
                disabled={isLoading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-gray-900/50 border-gray-800 text-white px-3 py-1.5 text-base placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-semibold text-[#4ECDC4] hover:text-[#4ECDC4]/90 underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
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

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center rounded-md bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link href="/register" className="font-semibold text-[#4ECDC4] hover:text-[#4ECDC4]/90">
            Start a 14 day free trial
          </Link>
        </p>
      </div>
    </div>
  )
}

