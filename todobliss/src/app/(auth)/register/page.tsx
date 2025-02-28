import SignUpForm  from "@/app/Components/auth/Register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[100dvh]">
      <div className="flex-1 flex items-center justify-center p-8 bg-[#1A1A1A]">
        <SignUpForm />
      </div>
    </div>
  )
}

