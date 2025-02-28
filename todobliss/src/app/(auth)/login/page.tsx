import SignInForm from "@/app/Components/auth/Sign-in-form"

export default function SignInPage() {
  return (
    <div className="flex min-h-[100dvh]">
      <div className="flex-1 flex items-center justify-center p-8 bg-[#1A1A1A]">
        <SignInForm />
      </div>
    </div>
  )
}

