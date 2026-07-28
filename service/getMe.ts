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
        // 🎯 ব্যাকএন্ডের জন্য স্ট্যান্ডার্ড বিয়ারার টোকেন ফরম্যাট:
        "Authorization": `Bearer ${accessToken}`, 
      },
      // ডাটা চেঞ্জ হতে পারে (যেমন প্রোফাইল আপডেট), তাই ক্যাশ টাইম কমিয়ে দেওয়া ভালো
      next: { revalidate: 60, tags: ["my-profile"] } 
    });

    // 🛠️ ফিক্স: এখানে অবশ্যই await দিতে হবে
    const result = await res.json(); 
    return result;
  } catch (error) {
    console.error("Fetch error in getMe:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
