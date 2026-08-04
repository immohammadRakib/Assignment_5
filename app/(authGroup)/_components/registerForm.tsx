// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useActionState, useEffect, useTransition, useState } from "react";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { registerSchema } from "../_actions/authSchema";
// import { registerAction } from "../_actions/authAction";

// const RegisterForm = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectTo = searchParams.get("redirectTo") ?? "";

//   const [isPending, startTransition] = useTransition();
//   const [showPassword, setShowPassword] = useState(false);

//   const [state, formAction] = useActionState(
//     async (prevState: any, formData: FormData) => {
//       return await registerAction(redirectTo, prevState, formData);
//     },
//     { success: false, message: null },
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       role: "" as any,
//     },
//   });

//   const onSubmit = (data: any) => {
//     const formData = new FormData();
//     Object.keys(data).forEach((key) => formData.append(key, data[key]));
//     startTransition(() => {
//       formAction(formData);
//     });
//   };

//   useEffect(() => {
//     if (!state) return;
//     if (state.success) {
//       toast.success("Account created! Please log in.");
//       router.push("/login");
//     } else if (typeof state.message === "string") {
//       toast.error(state.message);
//     }
//   }, [state, router]);

//   return (
//     <div className="w-full max-w-md p-5">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         <Card className="p-8 space-y-6 shadow-xl border border-neutral-100 rounded-2xl bg-white">
//           <div className="text-center space-y-2">
//             <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//               Sign Up
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Start your journey with RentNest
//             </p>
//           </div>

//           <div className="space-y-4">
//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
//                 Name
//               </label>
//               <div className="relative flex items-center">
//                 <User className="absolute left-3 w-4 h-4 text-gray-400" />
//                 <Input
//                   {...register("name")}
//                   placeholder="Your Name"
//                   className={`pl-10 h-11 ${errors.name ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
//                 />
//               </div>
//               {errors.name && (
//                 <p className="text-xs text-rose-500 font-medium pl-1">
//                   {errors.name.message as string}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
//                 Email
//               </label>
//               <div className="relative flex items-center">
//                 <Mail className="absolute left-3 w-4 h-4 text-gray-400" />
//                 <Input
//                   {...register("email")}
//                   type="email"
//                   placeholder="email@example.com"
//                   className={`pl-10 h-11 ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-xs text-rose-500 font-medium pl-1">
//                   {errors.email.message as string}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
//                 Password
//               </label>
//               <div className="relative flex items-center">
//                 <Lock className="absolute left-3 w-4 h-4 text-gray-400" />
//                 <Input
//                   {...register("password")}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`pl-10 pr-10 h-11 ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-xs text-rose-500 font-medium pl-1">
//                   {errors.password.message as string}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-600 pl-1 uppercase">
//                 Role
//               </label>
//               <select
//                 {...register("role")}
//                 className={`flex h-11 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none ${errors.role ? "border-rose-500" : "border-neutral-200"}`}
//               >
//                 <option value="">Select Role</option>
//                 <option value="TENANT">TENANT</option>
//                 <option value="LANDLORD">LANDLORD</option>
//               </select>
//               {errors.role && (
//                 <p className="text-xs text-rose-500 font-medium pl-1">
//                   {errors.role.message as string}
//                 </p>
//               )}
//             </div>
//           </div>

//           <Button
//             type="submit"
//             disabled={isPending}
//             className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-md cursor-pointer disabled:opacity-70"
//           >
//             {isPending ? "Creating Account..." : "Register Now"}
//           </Button>

//           <div className="text-center pt-2 border-t border-neutral-100">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link
//                 href="/auth/login"
//                 className="text-rose-500 font-semibold hover:underline"
//               >
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </Card>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Eye, EyeOff, Sparkles } from "lucide-react";
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
    <div className="w-full max-w-md p-5 select-none">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Card className="p-8 space-y-6 shadow-xl border border-neutral-100 rounded-2xl bg-white dark:bg-card dark:border-border dark:shadow-black/40 transition-colors duration-300">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400">
                <Sparkles className="w-3 h-3" /> Identity Mesh
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-slate-100">
              Sign Up
            </h2>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Start your journey with RentNest
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 pl-1 uppercase dark:text-slate-400">
                Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-gray-400 dark:text-slate-500 z-10" />
                <Input
                  {...register("name")}
                  placeholder="Your Name"
                  className={`pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-800 focus-visible:ring-rose-500/20 focus-visible:border-rose-500 outline-none transition-all ${
                    errors.name
                      ? "border-rose-500 focus-visible:ring-rose-500/20"
                      : ""
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 pl-1 uppercase dark:text-slate-400">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-gray-400 dark:text-slate-500 z-10" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="email@example.com"
                  className={`pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-800 focus-visible:ring-rose-500/20 focus-visible:border-rose-500 outline-none transition-all ${
                    errors.email
                      ? "border-rose-500 focus-visible:ring-rose-500/20"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 pl-1 uppercase dark:text-slate-400">
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
                <p className="text-xs text-rose-500 font-medium pl-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 pl-1 uppercase dark:text-slate-400">
                Role
              </label>
              <select
                {...register("role")}
                className={`flex h-11 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all bg-slate-50/50 dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-800 ${
                  errors.role
                    ? "border-rose-500"
                    : "border-neutral-200 dark:border-slate-800"
                }`}
              >
                <option value="" className="dark:bg-slate-900">
                  Select Role
                </option>
                <option value="TENANT" className="dark:bg-slate-900">
                  TENANT
                </option>
                <option value="LANDLORD" className="dark:bg-slate-900">
                  LANDLORD
                </option>
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
            className="w-full h-11 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-lg shadow-md cursor-pointer disabled:opacity-70 dark:bg-rose-600 dark:hover:bg-rose-700"
          >
            {isPending ? "Creating Account..." : "Register Now"}
          </Button>
          <div className="text-center pt-4 border-t border-neutral-100 dark:border-slate-800/60">
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-rose-500 font-bold hover:underline dark:text-rose-400"
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
