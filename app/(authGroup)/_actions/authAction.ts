// "use server"

// import jwt, { JwtPayload } from "jsonwebtoken"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"


// type LoginState = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     accessToken: string;
//     refreshToken: string;
//   }
// }


// export const loginAction = async (redirectTo: string, prevState: any, formData: FormData) => {
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const payload = { email, password }

//   try {
//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     const result = await res.json();

//     if (result.success) {
//       const cookieStore = await cookies()
      
//       cookieStore.set("accessToken", result.data.accessToken, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 24,
//         sameSite: "lax",
//       });
      
//       cookieStore.set("refreshToken", result.data.refreshToken, {
//         httpOnly: true,
//         maxAge: 60 * 60 * 24 * 7,
//         sameSite: "lax",
//       });

//       const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

      
//       if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
//         redirect(redirectTo)
//       }

      
//       if (decodedToken.role === "TENANT") {
//         redirect("/dashboard");
//       } else if (decodedToken.role === "ADMIN") {
//         redirect("/admin-dashboard");
//       } else if (decodedToken.role === "LANDLORD") {
//         redirect("/landlord-dashboard");
//       }
//     }

//     return result;

//   } catch (error) {
//     if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
//       throw error;
//     }
//     return {
//       success: false,
//       message: "Something went wrong during login!"
//     };
//   }
// }



// export const registerAction = async (redirectTo: string, prevState: any, formData: FormData) => {
//   const name = formData.get("name");
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const role = formData.get("role");

//   if (!role) {
//     return { success: false, message: "Please select a user role!" };
//   }

//   if (role === "ADMIN") {
//     return { success: false, message: "You cannot register as an ADMIN from here!" };
//   }

//   const payload = { name, email, password, role };
//   let isSuccess = false; 

//   try {
//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     const result = await res.json();
    
//     if (result.success) {
//       isSuccess = true;
//     } else {
//       return { success: false, message: result.message || "Registration failed on backend!" };
//     }
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     return { success: false, message: "Something went wrong during registration!" };
//   }

//   if (isSuccess) {
//     redirect("/login");
//   }
// }




"use server"

import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginSchema, registerSchema } from "./authSchema" // 🛠️ পরিবর্তন ১: রুটের schemas থেকে ইমপোর্ট করা হলো

export const loginAction = async (redirectTo: string, prevState: any, formData: FormData) => {
  // 🛠️ পরিবর্তন ২: FormData থেকে প্লেইন অবজেক্ট তৈরি
  const rawData = Object.fromEntries(formData);
  
  // 🛠️ পরিবর্তন ৩: Zod স্কিমা দিয়ে সার্ভার সাইড ভ্যালিডেশন
  const validatedFields = loginSchema.safeParse(rawData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed!",
      errors: validatedFields.error.flatten().fieldErrors, // ফিল্ড-ভিত্তিক এরর ফ্রন্টএন্ডে পাঠানোর জন্য
    };
  }

  // ভ্যালিডেটেড ডেটা বের করে নেওয়া হলো
  const { email, password } = validatedFields.data;
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

      if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
        redirect(redirectTo)
      }

      if (decodedToken.role === "TENANT") {
        redirect("/tenant-dashboard");
      } else if (decodedToken.role === "ADMIN") {
        redirect("/admin-dashboard");
      } else if (decodedToken.role === "LANDLORD") {
        redirect("/landlord-dashboard");
      }
    }
    
    return result;
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    // 🛠️ পরিবর্তন ৪: ব্যাকএন্ড থেকে আসা নির্দিষ্ট এরর মেসেজ পাস করা
    return { success: false, message: "Something went wrong during login!" };
  }
}

export const registerAction = async (redirectTo: string, prevState: any, formData: FormData) => {
  // 🛠️ পরিবর্তন ৫: FormData থেকে প্লেইন অবজেক্ট তৈরি
  const rawData = Object.fromEntries(formData);
  
  // 🛠️ পরিবর্তন ৬: Zod স্কিমা দিয়ে সার্ভার সাইড ভ্যালিডেশন
  const validatedFields = registerSchema.safeParse(rawData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed!",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // ভ্যালিডেটেড ডেটা বের করে নেওয়া হলো
  const { name, email, password, role } = validatedFields.data;

  if ((role as string) === "ADMIN") {
    return { success: false, message: "You cannot register as an ADMIN from here!" };
  }

  const payload = { name, email, password, role };
  let isSuccess = false;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    const result = await res.json();

    if (result.success) {
      isSuccess = true;
    } else {
      return { success: false, message: result.message || "Registration failed on backend!" };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return { success: false, message: "Something went wrong during registration!" };
  }

  if (isSuccess) {
    redirect("/login");
  }
}

