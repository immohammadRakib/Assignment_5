"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateProfileAction = async (formData: {
  phone: string;
  address: string;
  profileImage: string;
  bio: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Session expired. Please login." };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/my-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );

    const result = await res.json();

    if (res.ok || result?.success) {
      revalidatePath("/dashboard/tenant", "layout");
      return { success: true, message: "Profile updated successfully!" };
    }

    return {
      success: false,
      message: result?.message || "Failed to update profile.",
    };
  } catch (error) {
    console.error("Profile update action error:", error);
    return { success: false, message: "Internal Server Connection Error." };
  }
};
