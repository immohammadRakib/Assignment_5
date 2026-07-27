/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// প্রপার্টি অ্যাকশনের জন্য টাইপ ডিফাইন করা হলো
type PropertyState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

/**
 * ১. নতুন প্রপার্টি তৈরি করার অ্যাকশন (Create Property)
 */
export const createProperty = async (prevState: any, formData: FormData) => {
  // ফর্ম ডেটা থেকে মানগুলো নেওয়া হচ্ছে
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const city = formData.get("city") as string;
  const pricePerDay = Number(formData.get("pricePerDay"));
  const categoryId = formData.get("categoryId") as string;

  // ছবিগুলোর ইনপুট স্ট্রিং বা মাল্টিপল হতে পারে, কমা দিয়ে স্প্লিট করে অ্যারে করা হলো
  const imagesInput = formData.get("images") as string;
  const images = imagesInput ? imagesInput.split(",").map((img) => img.trim()) : ["https://unsplash.com"];

  // তোমার cURL রিকোয়েস্ট অনুযায়ী পেলোড তৈরি
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
    // অ্যাক্সেস টোকেন চেক করা হচ্ছে
    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    // ব্যাকএন্ড এপিআই কল (cURL অনুযায়ী পাথ সেট করা হয়েছে)
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    // ক্যাশ ক্লিয়ার করার জন্য রেভ্যালিডেট ট্যাগ ট্রিগার
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

/**
 * ২. প্রপার্টি আপডেট করার অ্যাকশন (Update Property)
 */
export const updateProperty = async (propertyId: string, prevState: any, formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const pricePerDay = Number(formData.get("pricePerDay"));
  const location = formData.get("location") as string;
  const isAvailable = formData.get("isAvailable") === "true" || formData.get("isAvailable") === "on";

  const imagesInput = formData.get("images") as string;
  const images = imagesInput ? imagesInput.split(",").map((img) => img.trim()) : [];

  // তোমার ২য় cURL (PUT) রিকোয়েস্ট অনুযায়ী পেলোড তৈরি
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

    // cURL অনুযায়ী PUT রিকোয়েস্ট পাঠানো হচ্ছে নির্দিষ্ট propertyId-তে
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

/**
 * ৩. ল্যান্ডলর্ড নিজের প্রপার্টিগুলোর লিস্ট আনার অ্যাকশন (Get My Properties)
 */
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
        revalidate: 60 * 60 * 24, // ১ দিন ক্যাশ থাকবে
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
