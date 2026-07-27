"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { registerAction } from "../_actions/authAction" // আমরা এখন এটি তৈরি করব

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? ""
  
  // registerAction এর সাথে বাইন্ড করা হয়েছে
  const [state, action, pending] = useActionState(registerAction.bind(null, redirectTo), false)

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <h2 className="text-xl font-bold text-center">Create Account</h2>
        <Input name="name" type="text" placeholder="Enter Your Full Name" required />
        <Input name="email" type="email" placeholder="Enter Your Email" required />
        <Input name="password" type="password" placeholder="Enter Your Password" required />
        <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600">
          { pending ? "Registering..." : "Register" }
        </Button>
      </Card>
    </form>
  )
}

export default RegisterForm;
