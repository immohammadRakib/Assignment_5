// app/(authGroup)/_components/registerform.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation"; 
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authAction";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const redirectTo = searchParams.get("redirectTo") ?? "";
  
  const [state, action, pending] = useActionState(
    registerAction.bind(null, redirectTo),
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful!");
      // 🎯 যদি সার্ভার অ্যাকশন থেকে রিডাইরেক্ট না করো, তবে এটি সচল থাকবে
      router.push("/login"); 
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-center">Create Account</h2>
        
        <Input name="name" type="text" placeholder="Enter Your Full Name" required />
        <Input name="email" type="email" placeholder="Enter Your Email" required />
        <Input name="password" type="password" placeholder="Enter Your Password" required />
        
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Register As</label>
          {/* 🎯 এখানে defaultValue="" যোগ করা হয়েছে এবং option থেকে selected বাদ দেওয়া হয়েছে */}
          <select 
            name="role" 
            defaultValue=""
            required 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-700"
          >
            <option value="" disabled>Select Account Type</option>
            <option value="TENANT">TENANT (Buyer)</option>
            <option value="LANDLORD">LANDLORD (Seller)</option>
          </select>
        </div>

        <Button type="submit" disabled={pending} className="w-full bg-rose-500 hover:bg-rose-600">
          {pending ? "Registering..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
