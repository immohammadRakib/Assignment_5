"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers"; // 🎯 কুকি রিড করার জন্য এটি যোগ করা হয়েছে

const BASE_URL = "https://assignment-4-vnjw.onrender.com";

// 🔐 হেল্পার ফাংশন: ব্রাউজার থেকে কুকি টোকেন তুলে হেডার তৈরি করবে
async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // আপনার কুকির নাম

  // 🎯 টার্মিনালে চেক করার জন্য এই লাইনটি যোগ করুন
  console.log("---- SERVER ACTION TOKEN CHECK ----", token);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}


// 🏷️ ০. গেট অল ক্যাটাগরিজ
export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error("Categories could not be retrieved");
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    return [];
  }
}

// 🏠 ১. গেট অল প্রপার্টিজ (My Listings)
// export async function getLandlordProperties() {
//   try {
//     const authHeaders = await getAuthHeaders(); // 🎯 টোকেনসহ হেডার নেওয়া হলো
//     const res = await fetch(`${BASE_URL}/landlord/properties`, {
//       method: "GET",
//       headers: authHeaders,
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch properties");
//     return await res.json();
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// }


export const getMyProperties = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    // 🎯 ফিক্স: cache চেইঞ্জ করে no-store করা হলো যাতে নতুন লিস্টিং সাথে সাথে ভিউতে আসে
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      headers: {
        Cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store", // 🚀 ২৪ ঘণ্টার ওল্ড ক্যাশ মেমোরি ধ্বংস করে দেওয়া হলো
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Get My Properties Error:", error);
    return { success: false, message: "Failed to fetch properties!" };
  }
};


// ➕ ২. ক্রিয়েট নিউ প্রপার্টি (Create Listing)
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
    // 🎯 ১. নেক্সট জেএস-এর নেটিভ কুকি ইঞ্জিন থেকে লাইভ এক্সেস টোকেন রিড
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    console.log("---- SERVER ACTION NESTED COOKIE CHECK ----", accessToken);

    if (!accessToken) {
      return { success: false, message: "User not logged in! accessToken missing in cookies." };
    }
    
    // 🎯 ২. সরাসরি ব্রাউজারের নেটিভ হেডার্স ফরমেটে ব্যাকএন্ড হিট
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
      method: "POST",
      headers: {
        // এক্সপ্রেস ব্যাকএন্ডের কুকি-পার্সার যাতে এক চান্সেই ধরে ফেলে
        "Cookie": `accessToken=${accessToken}`,
        // ব্যাকএন্ড যদি পাসপোর্ট বিয়ারার খোঁজে, তার জন্য ফলব্যাক
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    const result = await res.json();
    console.log("🔥 Direct Gateway Response Object:", result);

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

// 📝 ৩. আপডেট প্রপার্টি (Edit Listing)
export async function updateProperty(id: string, formData: any) {
  try {
    const authHeaders = await getAuthHeaders(); // 🎯 টোকেনসহ হেডার নেওয়া হলো
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "PUT",
      headers: authHeaders,
      body: JSON.stringify(formData),
    });
    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Update failed" };
  }
}

// ❌ ৪. ডিলিট প্রপার্টি


export async function deleteProperty(id: string, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // 👈 ফ্রন্টএন্ড থেকে আসা টোকেন
      },
    });

    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
}

// }

// 🔄 ৫. টগল অ্যাভেলেবিলিটি (PATCH)
// 🎯 ফিক্সড ও ১০০% ডাটাবেজ সিঙ্কড প্যাচ রিকোয়েস্ট:
// export const toggleAvailability = async (id: string, currentStatus: boolean) => {
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value || null;

//     // ব্যাকএন্ডে পাঠানোর জন্য অপোজিট বুুলিয়ান ভ্যালু নির্ধারণ (True থাকলে False, False থাকলে True)
//     const nextStatus = !currentStatus;

//     const res = await fetch(`https://onrender.com{id}`, {
//       method: "PATCH",
//       headers: {
//         Cookie: `accessToken=${accessToken}`,
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       // 🚀 মোস্ট ইম্পর্ট্যান্ট ফিক্স: তোমার কার্ল রিকোয়েস্ট অনুযায়ী ব্যাকএন্ড বডিতে ট্রু/ফলস ডাটা পাস করা হলো
//       body: JSON.stringify({ isAvailable: nextStatus }),
//       cache: "no-store"
//     });

//     if (!res.ok) throw new Error("Toggle status update failed on server");
//     const result = await res.json();

//     // মেইন পাবলিক পেজ ও ইনভেন্টরির ওল্ড ক্যাশ মেমোরি ফ্ল্যাশ
//     revalidatePath("/properties",); 
//     revalidateTag("my-properties", { expire: 0 });

//     return result;
//   } catch (error) {
//     console.error("Toggle Availability Error:", error);
//     return { success: false, message: "Toggle failed" };
//   }
// };


// app/(publicGroup)/_actions/propertiesAction.ts (অথবা যেখানে এই ফাংশনটি আছে)
// export async function toggleAvailability(id: string, currentStatus: boolean, token: string) {
//   try {
//     // ⚡ কারেন্ট বুুলিয়ান স্ট্যাটাসকে উল্টে দেওয়া হলো (true থাকলে false, false থাকলে true)
//     const newStatus = !currentStatus;

//     const res = await fetch(`${BASE_URL}/api/landlord/properties/isAvailable/${id}`, {
      
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`, // 🔐 ল্যান্ডলর্ড ভ্যালিডেশন টোকেন
//       },
//       body: JSON.stringify({ isAvailable: newStatus }), // 📦 ব্যাকএন্ডে নতুন স্ট্যাটাস পাঠানো হলো
//     });

//     console.log("👉 Target URL Fired :", `${BASE_URL}/api/landlord/properties/isAvailable/${id}`);
//     console.log("👉 Request Method   :", "PATCH");
//     console.log("👉 HTTP Status Code :", res.status); // এটি ৪MD (404) দেখাবে যদি রুট না পায়
//     console.log("👉 HTTP Status Text :", res.statusText);

//     const result = await res.json();
//       console.log("👉 Ingestion Success Result:", result);
//     return result;
//   } catch (error) {
//     return { success: false, message: "Toggle synchronization failed." };
//   }
// }


export async function toggleAvailability(id: string, currentStatus: boolean) {
  // 🔑 ১. তোর সেইম rentnest_token কী (Key) দিয়ে টোকেন রিড করা হলো
  const token = typeof window !== 'undefined' ? localStorage.getItem('rentnest_token') : null;
  const newStatus = !currentStatus;

  try {
    // 📡 তোর এডমিন এপিআই এর মতো হুবহু 'credentials' এবং হেডার ট্রিক ব্যবহার করে ফেচ
    const res = await fetch(`https://onrender.com{id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { 'Authorization': token } : {}) // 🎯 [তোর কোডের সুপার ট্রিক]
      },
      // তুই যদি তোর ড্যাশবোর্ডে সেশন কুকি ব্যবহার করিস, তবে এই লাইনটি প্রটেক্ট করবে:
      // credentials: 'include', 
      body: JSON.stringify({ isAvailable: newStatus }), 
    });

    if (res.ok) {
      const result = await res.json();
      return { success: true, data: result };
    } else {
      return { success: false, message: "Server validation error. Route or fields mismatch." };
    }

  } catch (error) {
    console.error(error);
    return { success: false, message: "Network connection failed!" };
  }
}









// 📥 ৬. গেট ইনকামিং রেন্টাল রিকোয়েস্ট
// 📥 ১. গেট ইনকামিং রেন্টাল রিকোয়েস্ট (Real API Docs Mapped)
export async function getIncomingRequests() {
  try {
    // কুকি স্টোর থেকে সরাসরি লাইভ এক্সেস টোকেন রিড
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      console.error("Auth Error: Access Token missing in cookies context for requests.");
      return { success: false, data: [] };
    }

    // 🎯 রিয়াল কার্ল কম্যান্ড অনুযায়ী নিখুঁত এন্ডপয়েন্ট কানেকশন
    const res = await fetch("https://assignment-4-vnjw.onrender.com/api/rentals/landlord/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `accessToken=${accessToken}`,
        "Authorization": `Bearer ${accessToken}` // সিকিউর গেটওয়ে ফলব্যাক
      },
      cache: "no-store", // লাইভ বুকিং ট্র্যাকিংয়ের জন্য ক্যাশ ডিরেক্ট অফ
    });

    if (!res.ok) throw new Error("Failed to fetch incoming requests from server gateway");
    const result = await res.json();
    
    console.log("🔥 Landlord Incoming Requests Live API Output:", result);
    return result;
  } catch (error) {
    console.error("Get Incoming Requests Error:", error);
    return { success: false, data: [] };
  }
}


// 🔒 ৭. রিকোয়েস্ট স্ট্যাটাস আপডেট (CONFIRMED/REJECTED)

// 🔒 রিকোয়েস্ট স্ট্যাটাস আপডেট (Real API Docs Mapped with correct Interpolation)
export async function updateRequestStatus(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!id || id === "undefined") {
      return { success: false, message: "Validation Error: Request ID is undefined!" };
    }

    // 🎯 ফিক্স: `${id}` এর আগে ডলার ($) সাইন এবং সঠিক বেস ইউআরএল কনক্যাটিনেশন নিশ্চিত করা হলো
    const targetUrl = `https://assignment-4-vnjw.onrender.com/api/rentals/landlord/requests/${id}`;
    console.log("🚀 Hitting Real PATCH Status Gateway URL:", targetUrl);

    const res = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ status }), // কার্ল ডকস অনুযায়ী বডিতে স্ট্যাটাস পাস
    });

    if (!res.ok) throw new Error("Status update failed on server gateway");
    const result = await res.json();

    revalidatePath("/dashboard/landlord/requests");
    revalidatePath("/dashboard/tenant/requests");

    return result;
  } catch (error) {
    console.error("Status update error in action:", error);
    return { success: false, message: "Status update failed" };
  }
}

