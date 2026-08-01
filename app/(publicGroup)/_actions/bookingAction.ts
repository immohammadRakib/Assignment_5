
"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { bookingSchema } from "./bookingSchema"; 

export const requestToRentAction = async (formData: any) => {
  const validatedFields = bookingSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { 
      success: false, 
      message: "Validation failed!", 
      errors: validatedFields.error.flatten().fieldErrors 
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return { success: false, message: "Unauthorized! Please login." };

  try {
    const payload = {
      propertyId: validatedFields.data.propertyId,
      startDate: new Date(validatedFields.data.startDate).toISOString(),
      endDate: new Date(validatedFields.data.endDate).toISOString(),
    };

    const res = await fetch(`https://assignment-4-vnjw.onrender.com/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/tenant/requests");
    }

    return result;
  } catch (error) {
    return { success: false, message: "Server connection failed!" };
  }
};
