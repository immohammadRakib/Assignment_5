"use server"

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
      },
      next: { revalidate: 60, tags: ["my-profile"] } 
    });

    const result = await res.json(); 
    return result;
  } catch (error) {
    console.error("Fetch error in getMe:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
