"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition, useState } from "react"; // 🛠️ useState যোগ করা হয়েছে
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react"; // 🛠️ Eye এবং EyeOff আইকন যোগ করা হয়েছে
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../_actions/authSchema";
import { loginAction } from "../_actions/authAction";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false); // 🛠️ পাসওয়ার্ড অন/অফের জন্য স্টেট

  // সার্ভার অ্যাকশন স্টেট হ্যান্ডলিং
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await loginAction(redirectTo, prevState, formData);
    },
    { success: false, message: null }
  );

  // 🎯 React Hook Form + Zod Setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    startTransition(() => {
      formAction(formData);
    });
  };

  // সার্ভার রেসপন্স অনুযায়ী টোস্ট বা রিডাইরেক্ট
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Login successful! Welcome back.");
    } else if (typeof state.message === "string") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-8 space-y-6 shadow-xl border border-neutral-100 rounded-2xl bg-white">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">Log in to manage your RentNest account</p>
          </div>

          <div className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input {...register("email")} type="email" placeholder="you@example.com" className={`pl-10 h-11 transition ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : "border-neutral-200"}`} />
              </div>
              {/* 🎯 Zod Inline Error Feedback */}
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium pl-1 mt-1 animate-in fade-in">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password (🛠️ চোখ অন/অফ সিস্টেমসহ) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input 
                  {...register("password")} 
                  type={showPassword ? "text" : "password"} // 🛠️ স্টেট অনুযায়ী টাইপ চেঞ্জ
                  placeholder="••••••••" 
                  className={`pl-10 pr-10 h-11 transition ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : "border-neutral-200"}`} 
                />
                
                {/* 🛠️ আইকন বাটন */}
                <button
                  type="button" // এটি অবশ্যই 'button' টাইপ হতে হবে, নয়তো ফর্ম সাবমিট হয়ে যাবে
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 font-medium pl-1 mt-1 animate-in fade-in">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" >
            {isPending ? (
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Log In"
            )}
          </Button>

          <div className="text-center pt-2 border-t border-neutral-100">
            <p className="text-sm text-muted-foreground">
              New to RentNest?{" "}
              <Link href="/register" className="text-rose-500 font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default LoginForm;
