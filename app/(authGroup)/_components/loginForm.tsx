// "use client"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useSearchParams } from "next/navigation"
// import { useActionState, useEffect } from "react"
// import { toast } from "sonner"
// import { loginAction } from "../_actions/authAction"
// import Link from "next/link"

// const LoginForm = () => {
//   const searchParams = useSearchParams();
//   const redirectTo = searchParams.get("redirectTo") ?? ""
//   const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), false)

//   useEffect(() => {
//     if (!state) return;
//     if (!state.success) {
//       toast.error(state.message || "Login failed");
//     }
//   }, [state]);

//   return (
//     <form action={action} className="space-y-4">
//       <div className="space-y-3">
//         <Input 
//           name="email" 
//           type="email" 
//           placeholder="Enter Your Email" 
//           className="h-11 focus-visible:ring-rose-500 rounded-lg"
//           required 
//         />
//         <Input 
//           name="password" 
//           type="password" 
//           placeholder="Enter Your Password" 
//           className="h-11 focus-visible:ring-rose-500 rounded-lg"
//           required 
//         />
//       </div>


//       <Button 
//         type="submit" 
//         disabled={pending}
//         className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-70"
//       >
//         {pending ? "Submitting..." : "Login"}
//       </Button>

//       <div className="text-center text-xs text-muted-foreground pt-2 border-t border-neutral-100">
//         Don't have an account?{" "}
//         <Link 
//           href="/register" 
//           className="text-roase-500 font-semibold hover:underline transition"
//         >
//           Sign up
//         </Link>
//       </div>
//     </form>
//   )
// }

// export default LoginForm





"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../_actions/authSchema"; // 🎯 Zod Schema পাথ নিশ্চিত করো
import { loginAction } from "../_actions/authAction"; // 🎯 Auth Action পাথ নিশ্চিত করো

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const [isPending, startTransition] = useTransition();

  // সার্ভার অ্যাকশন স্টেট হ্যান্ডলিং
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await loginAction(redirectTo, prevState, formData);
    },
    { success: false, message: null }
  );

  // 🎯 React Hook Form + Zod Setup (Requirement 4)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      // রিডাইরেক্ট লজিক সার্ভার অ্যাকশনে অলরেডি আছে, তাও সেফটি হিসেবে এখানেও রাখা যায়
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
                <Input 
                  {...register("email")} 
                  type="email"
                  placeholder="you@example.com" 
                  className={`pl-10 h-11 transition ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : "border-neutral-200"}`} 
                />
              </div>
              {/* 🎯 Zod Inline Error Feedback (Requirement 2) */}
              {errors.email && (
                <p className="text-[px] text-rose-500 font-medium pl-1 animate-in fade-in">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input 
                  {...register("password")} 
                  type="password"
                  placeholder="••••••••" 
                  className={`pl-10 h-11 transition ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : "border-neutral-200"}`} 
                />
              </div>
              {errors.password && (
                <p className="text-[px] text-rose-500 font-medium pl-1 animate-in fade-in">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isPending} 
            className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-md transition-all active:scale- cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
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


