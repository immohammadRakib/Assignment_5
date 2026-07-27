"use server"

import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  }
}

// অল-ইন-ওয়ান লগইন অ্যাকশন (USER, AUTHOR, ADMIN সবার জন্য)
export const loginAction = async (redirectTo: string, prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = { email, password }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
      const cookieStore = await cookies()
      
      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });

      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

      // যদি মিডলওয়্যার বা অন্য কোনো পেজ থেকে রিডাইরেক্ট ইউআরএল আসে
      if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
        redirect(redirectTo)
      }

      // রোল অনুযায়ী ড্যাশবোর্ডে পাঠানো (এখানেই অ্যাডমিন তার ড্যাশবোর্ডে চলে যাবে)
      if (decodedToken.role === "TENANT") {
        redirect("/dashboard");
      } else if (decodedToken.role === "ADMIN") {
        redirect("/admin-dashboard");
      } else if (decodedToken.role === "LANDLORD") {
        redirect("/landlord-dashboard");
      }
    }

    return result;

  } catch (error) {
    // Next.js-এর redirect() ইন্টারনালি একটা এরর থ্রো করে। 
    // ট্রাই-ক্যাচের ভেতর সেই রিডাইরেক্ট এরর আটকালে রিডাইরেক্ট কাজ করে না। 
    // তাই এই চেকটি দেওয়া বাধ্যতামূলক।
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message: "Something went wrong during login!"
    };
  }
}



export const registerAction = async (redirectTo: string, prevState: any, formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  if (!role) {
    return { success: false, message: "Please select a user role!" };
  }

  if (role === "ADMIN") {
    return { success: false, message: "You cannot register as an ADMIN from here!" };
  }

  const payload = { name, email, password, role };
  let isSuccess = false; // রিডাইরেক্ট ট্র্যাকিংয়ের জন্য ফ্ল্যাগ নিলাম

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    
    if (result.success) {
      isSuccess = true; // সফল হলে ফ্ল্যাগ ট্রু হবে
    } else {
      return { success: false, message: result.message || "Registration failed on backend!" };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "Something went wrong during registration!" };
  }

  // 🎯 ট্রাই-ক্যাচের বাইরে একদম নিচে রিডাইরেক্ট করতে হবে (লগইন অ্যাকশনের মতো)
  if (isSuccess) {
    redirect("/login");
  }
}



