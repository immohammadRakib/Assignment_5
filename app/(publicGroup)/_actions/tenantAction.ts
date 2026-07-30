"use server";

import { cookies } from "next/headers";

// 🚀 সুরক্ষিত পেমেন্ট ইনিশিয়েটর সার্ভার অ্যাকশন (HttpOnly Cookie Friendly)
export async function createPaymentSessionAction(rentalId: string) {
  try {
    const cookieStore = await cookies();
    // 🎯 সার্ভার সাইড থেকে HttpOnly কুকি অনায়াসে রিড করা হচ্ছে
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return { success: false, message: "Authentication required! Please login again." };
    }

    const baseUrl = process.env.BACKEND_API_URL;
    const sanitizedBaseUrl = baseUrl?.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const targetUrl = `${sanitizedBaseUrl}/api/payments/create`;

    console.log("🛰️ Tenant Server Action Hitting Gateway:", targetUrl);

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ bookingId: rentalId }) // কার্ল ডকস অনুযায়ী পারফেক্ট বডি
    });

    if (!res.ok) throw new Error("Payment session generation failed on gateway.");
    return await res.json();
  } catch (error) {
    console.error("Payment Server Action Error:", error);
    return { success: false, message: "Internal server connection failure." };
  }
}
