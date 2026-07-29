"use server"

import { cookies } from "next/headers";
import { bookingSchema } from "./bookingSchema";

export const requestToRentAction = async (formData: any) => {
  // ১. সার্ভার-সাইড ভ্যালিডেশন (উল্টাপাল্টা ডেটা এখানে এসে আটকে যাবে)
  const validatedFields = bookingSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid data provided!",
      errors: validatedFields.error.flatten().fieldErrors, // সুনির্দিষ্ট ভুলের লিস্ট পাঠাবে
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, message: "Unauthorized! Please login." };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(validatedFields.data) // শুধুমাত্র ভ্যালিড ডেটা পাঠানো হচ্ছে
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Server connection failed!" };
  }
};
