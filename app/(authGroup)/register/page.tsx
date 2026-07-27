"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authAction"; // আপনার অ্যাকশন ফাইলের সঠিক পাথ দিন
import Link from "next/link";
import { Lock, Mail, User, ShieldCheck } from "lucide-react";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  
  // আপনার সার্ভার অ্যাকশন অনুযায়ী বাইন্ড করা হয়েছে
  const [state, action, pending] = useActionState(registerAction.bind(null, redirectTo), false);

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "Registration failed");
    }
  }, [state]);

  return (
    <div className="w-full max-w-md mx-auto p-5">
      <form action={action} className="space-y-5">
        <Card className="p-8 space-y-6 shadow-xl border border-neutral-100 rounded-2xl bg-white/80 backdrop-blur-md">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
            <p className="text-sm text-muted-foreground">
              Join us today! It only takes a minute
            </p>
          </div>

          <div className="space-y-4">
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 pl-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-11 border-neutral-200 focus-visible:ring-rose-500 rounded-lg transition"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 pl-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11 border-neutral-200 focus-visible:ring-rose-500 rounded-lg transition"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 pl-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 border-neutral-200 focus-visible:ring-rose-500 rounded-lg transition"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
  <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 pl-1">
    Register As
  </label>
  <select 
    name="role" 
    required
    className="flex h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition text-gray-700"
  >
    <option value="" disabled>Select your account type</option>
    <option value="TENANT">TENANT (Buyer)</option>
    <option value="LANDLORD">LANDLORD (Seller)</option>
  </select>
</div>

          {/* Terms & Conditions Notice */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground pl-1">
            <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <p>
              By signing up, you agree to our{" "}
              <span className="text-gray-900 font-medium underline cursor-pointer">Terms</span> and{" "}
              <span className="text-gray-900 font-medium underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>

          {/* Submit Button (Airbnb Style Rose Gradient) */}
          <Button
            type="submit"
            disabled={pending}
            className="w-full h-11 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {pending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* Bottom Footer Link */}
          <div className="text-center pt-2 border-t border-neutral-100">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-rose-500 font-semibold hover:underline transition"
              >
                Log in
              </Link>
            </p>
          </div>

        </Card>
      </form>
    </div>
  );
};

export default RegisterForm;
