"use server"

import { cookies } from "next/headers"

export const logout = async () => {
  const cookieStore = await cookies();
  
  // ১. কুকি থেকে টোকেনগুলো ডিলিট করা
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return { success: true };
}
