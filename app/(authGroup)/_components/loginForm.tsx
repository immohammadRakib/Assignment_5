"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { loginAction } from "../_actions/authAction"
import Link from "next/link"

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? ""
  const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), false)

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      {/* Inputs */}
      <div className="space-y-3">
        <Input 
          name="email" 
          type="email" 
          placeholder="Enter Your Email" 
          className="h-11 focus-visible:ring-rose-500 rounded-lg"
          required 
        />
        <Input 
          name="password" 
          type="password" 
          placeholder="Enter Your Password" 
          className="h-11 focus-visible:ring-rose-500 rounded-lg"
          required 
        />
      </div>

      {/* Airbnb Style Login Button */}
      <Button 
        type="submit" 
        disabled={pending}
        className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-70"
      >
        {pending ? "Submitting..." : "Login"}
      </Button>

      {/* Navigation to Register Page */}
      <div className="text-center text-xs text-muted-foreground pt-2 border-t border-neutral-100">
        Don't have an account?{" "}
        <Link 
          href="/register" 
          className="text-rose-500 font-semibold hover:underline transition"
        >
          Sign up
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
