"use server";

import { cookies } from "next/headers";

export async function createPaymentSessionAction(rentalId: string) {
  try {
    const cookieStore = await cookies();
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
      body: JSON.stringify({ bookingId: rentalId }) 
    });

    if (!res.ok) throw new Error("Payment session generation failed on gateway.");
    return await res.json();
  } catch (error) {
    console.error("Payment Server Action Error:", error);
    return { success: false, message: "Internal server connection failure." };
  }
}



export async function createReviewAction(payload: {
  propertyId: string;
  bookingId: string;
  rating: number;
  comment: string;
}) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return { success: false, message: "Authentication required! Please login again." };
    }

    const baseUrl = process.env.BACKEND_API_URL;
    const sanitizedBaseUrl = baseUrl?.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const targetUrl = `${sanitizedBaseUrl}/api/reviews/create`;

    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Cookie": `accessToken=${accessToken}`
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Review Action Error:", error);
    return { success: false, message: "Server connection failed!" };
  }
}



export async function deleteReviewAction(reviewId: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const baseUrl = process.env.BACKEND_API_URL;

    const res = await fetch(`${baseUrl}/api/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Delete operation failed." };
  }
}
