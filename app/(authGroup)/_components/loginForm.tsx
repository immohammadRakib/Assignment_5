"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, Sparkles } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await loginAction(redirectTo, prevState, formData);
    },
    { success: false, message: null } as any,
  );

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

  const onSubmit = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success("Login successful! Welcome back.");
      const token = (state as any).accessToken;
      if (token) {
        localStorage.setItem("rentnest_token", token);
      }
      const userRole = (state as any).role;
      const targetRedirect = (state as any).redirectTo;

      setTimeout(() => {
        if (targetRedirect) {
          router.push(targetRedirect);
        } else if (userRole === "TENANT") {
          router.push("/dashboard/tenant");
        } else if (userRole === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (userRole === "LANDLORD") {
          router.push("/dashboard/landlord");
        } else {
          router.push("/");
        }
      }, 1000);
    } else if (typeof state.message === "string") {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md p-5 select-none">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-8 space-y-6 shadow-xl border border-neutral-100 rounded-2xl bg-white dark:bg-card dark:border-border dark:shadow-black/40 transition-colors duration-300">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400">
                <Sparkles className="w-3 h-3" /> Secure Access
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Log in to manage your RentNest account
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 pl-1 uppercase tracking-wider dark:text-slate-400">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-gray-400 dark:text-slate-500 z-10" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-800 focus-visible:ring-rose-500/20 focus-visible:border-rose-500 outline-none transition-all ${
                    errors.email
                      ? "border-rose-500 focus-visible:ring-rose-500/20"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium pl-1 mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 pl-1 uppercase tracking-wider dark:text-slate-400">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-gray-400 dark:text-slate-500 z-10" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-800 focus-visible:ring-rose-500/20 focus-visible:border-rose-500 outline-none transition-all ${
                    errors.password
                      ? "border-rose-500 focus-visible:ring-rose-500/20"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer dark:text-slate-500 dark:hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 font-medium pl-1 mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed dark:bg-rose-600 dark:hover:bg-rose-700"
          >
            {isPending ? (
              <div className="flex items-center gap-2 justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Log In"
            )}
          </Button>

          <div className="text-center pt-4 border-t border-neutral-100 dark:border-slate-800/60">
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              New to RentNest?{" "}
              <Link
                href="/auth/register"
                className="text-rose-500 font-bold hover:underline dark:text-rose-400"
              >
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
