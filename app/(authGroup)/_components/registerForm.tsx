"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerSchema } from "../_actions/authSchema";
import { registerAction } from "../_actions/authAction";

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await registerAction(redirectTo, prevState, formData);
    },
    { success: false, message: null },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "" as any,
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
      toast.success("Account created! Please log in.");
      router.push("/login");
    } else if (typeof state.message === "string") {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-8 space-y-6 shadow-xl border border-neutral-100 rounded-2xl bg-white">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Sign Up
            </h2>
            <p className="text-sm text-muted-foreground">
              Start your journey with RentNest
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
                Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input
                  {...register("name")}
                  placeholder="Your Name"
                  className={`pl-10 h-11 ${errors.name ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="email@example.com"
                  className={`pl-10 h-11 ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-gray-400" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 h-11 ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
                Role
              </label>
              <select
                {...register("role")}
                className={`flex h-11 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none ${errors.role ? "border-rose-500" : "border-neutral-200"}`}
              >
                <option value="">Select Role</option>
                <option value="TENANT">TENANT</option>
                <option value="LANDLORD">LANDLORD</option>
              </select>
              {errors.role && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.role.message as string}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-md cursor-pointer disabled:opacity-70"
          >
            {isPending ? "Creating Account..." : "Register Now"}
          </Button>

          <div className="text-center pt-2 border-t border-neutral-100">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-rose-500 font-semibold hover:underline"
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
