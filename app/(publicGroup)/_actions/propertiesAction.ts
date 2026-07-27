/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

/**
 * ১. পাবলিক ইউজারদের জন্য সব প্রপার্টি লিস্ট নিয়ে আসার অ্যাকশন (Get All Public Properties)
 * এটি হোমপেজে প্রপার্টি গ্রিড দেখানোর জন্য ব্যবহার করা হবে।
 * সার্চ কুয়েরি বা ফিল্টারিং সাপোর্ট করার জন্য প্যারামিটার যুক্ত করা হয়েছে।
 */
export const getAllProperties = async (searchParams?: { 
  search?: string; 
  category?: string; 
  city?: string;
}) => {
  try {
    // ১. সার্চ এবং ফিল্টার প্যারামিটার অনুযায়ী ডাইনামিক ইউআরএল তৈরি
    let url = `${process.env.BACKEND_API_URL}/api/properties`;
    const queryParts: string[] = [];

    if (searchParams?.search) queryParts.push(`search=${encodeURIComponent(searchParams.search)}`);
    if (searchParams?.category) queryParts.push(`category=${encodeURIComponent(searchParams.category)}`);
    if (searchParams?.city) queryParts.push(`city=${encodeURIComponent(searchParams.city)}`);

    if (queryParts.length > 0) {
      url += `?${queryParts.join("&")}`;
    }

    // ২. পাবলিক ডাটা দ্রুত দেখানোর জন্য নেক্সট ক্যাশিং ব্যবহার
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // ১ ঘন্টা ডাটা ক্যাশে থাকবে এবং অন-ডিমান্ড রেভ্যালিডেশনের জন্য ট্যাগ ব্যাকআপ রাখা হলো
      next: {
        revalidate: 60 * 60, 
        tags: ["public-properties"],
      },
    });

    // ৩. রেসপন্স চেক
    if (!res.ok) {
      throw new Error(`Failed to fetch properties, Status: ${res.status}`);
    }

    const result = await res.ok ? await res.json() : null;
    return result;
  } catch (error) {
    console.error("Get All Properties Error:", error);
    return {
      success: false,
      message: "Could not load properties from backend. Showing dummy data instead.",
      data: [],
    };
  }
};

/**
 * ২. একটি নির্দিষ্ট প্রপার্টির ডিটেইলস নিয়ে আসার অ্যাকশন (Get Property Details by ID)
 * এটি ডাইনামিক ডিটেইল পেজে (`/properties/[id]`) ব্যবহার করা হবে।
 */
export const getPropertyDetails = async (propertyId: string) => {
  try {
    if (!propertyId) {
      return { success: false, message: "Property ID is required!" };
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${propertyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 * 5, // প্রপার্টি ডিটেইল ৫ মিনিট ক্যাশ থাকবে
        tags: [`property-${propertyId}`],
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(`Get Property Details Error for ID ${propertyId}:`, error);
    return {
      success: false,
      message: "Failed to fetch property details.",
      data: null,
    };
  }
};

/**
 * ৩. প্ল্যাটফর্মের সব ক্যাটাগরি নিয়ে আসার অ্যাকশন (Get All Property Categories)
 * এটি হোমপেজে Airbnb স্টাইলের ক্যাটাগরি বার (যেমন: Beachfront, Icons, Rooms) তৈরি করতে লাগবে।
 */
export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 24, // ক্যাটাগরি সাধারণত পরিবর্তন হয় না, তাই ২৪ ঘন্টা ক্যাশ থাকবে
        tags: ["property-categories"],
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return {
      success: false,
      message: "Failed to load categories.",
      data: [],
    };
  }
};
