"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export function SignInForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="w-full max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-block rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] p-[1px]">
          <div className="rounded-lg bg-gray-900 p-2">
            <svg
              className=" h-6 w-6 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Sign in to your account</h1>
        <p className="text-sm text-gray-400">
          Not a member?{" "}
          <Link href="" className="text-[#4ECDC4] hover:text-[#4ECDC4]/90 underline underline-offset-4">
            Start a 14 day free trial
          </Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            placeholder="Email address"
            required
            type="email"
            disabled={isLoading}
            className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="password"
            placeholder="Password"
            required
            type="password"
            disabled={isLoading}
            className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="border-gray-800 data-[state=checked]:bg-[#4ECDC4]" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[#4ECDC4] hover:text-[#4ECDC4]/90 underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>
        <Button className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
        </div> 
      </form>
    </div>
  )
}

