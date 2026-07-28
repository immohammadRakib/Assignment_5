/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


type PropertyState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};



export const createProperty = async (prevState: any, formData: FormData) => {

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const city = formData.get("city") as string;
  const pricePerDay = Number(formData.get("pricePerDay"));
  const categoryId = formData.get("categoryId") as string;

  const imagesInput = formData.get("images") as string;
  const images = imagesInput ? imagesInput.split(",").map((img) => img.trim()) : ["https://unsplash.com"];

  const payload = {
    title,
    description,
    location,
    city,
    pricePerDay,
    images,
    categoryId,
  };

  console.log("Creating Property Payload:", payload);

  try {
    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("my-properties", { expire: 0 });
        revalidateTag("public-properties", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.error("Create Property Error:", error);
    return { success: false, message: "Something went wrong while creating property!" };
  }
};



export const updateProperty = async (propertyId: string, prevState: any, formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const pricePerDay = Number(formData.get("pricePerDay"));
  const location = formData.get("location") as string;
  const isAvailable = formData.get("isAvailable") === "true" || formData.get("isAvailable") === "on";

  const imagesInput = formData.get("images") as string;
  const images = imagesInput ? imagesInput.split(",").map((img) => img.trim()) : [];

  
  const payload = {
    title,
    description,
    pricePerDay,
    isAvailable,
    location,
    images,
  };

  console.log(`Updating Property ID (${propertyId}) Payload:`, payload);

  try {
    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`, {
      method: "PUT",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("my-properties", { expire: 0 });
      revalidateTag("public-properties", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.error("Update Property Error:", error);
    return { success: false, message: "Something went wrong while updating property!" };
  }
};



export const getMyProperties = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, 
        tags: ["my-properties"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Get My Properties Error:", error);
    return { success: false, message: "Failed to fetch properties!" };
  }
};
