"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = "https://assignment-4-vnjw.onrender.com";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("---- SERVER ACTION TOKEN CHECK ----", token);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Categories could not be retrieved");
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    return [];
  }
}

export const getMyProperties = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Get My Properties Error:", error);
    return { success: false, message: "Failed to fetch properties!" };
  }
};

export const createProperty = async (prevState: any, formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const city = formData.get("city") as string;
  const pricePerDay = Number(formData.get("pricePerDay"));
  const categoryId = formData.get("categoryId") as string;
  const imagesInput = formData.get("images") as string;
  const images = imagesInput
    ? imagesInput.split(",").map((img) => img.trim())
    : ["https://unsplash.com"];

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
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    console.log("---- SERVER ACTION NESTED COOKIE CHECK ----", accessToken);

    if (!accessToken) {
      return {
        success: false,
        message: "User not logged in! accessToken missing in cookies.",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();
    console.log("🔥 Direct Gateway Response Object:", result);

    if (result.success) {
      revalidateTag("my-properties", { expire: 0 });
      revalidateTag("public-properties", { expire: 0 });
    }
    return result;
  } catch (error) {
    console.error("Create Property Error:", error);
    return {
      success: false,
      message: "Something went wrong while creating property!",
    };
  }
};

export async function updateProperty(id: string, formData: any) {
  try {
    const authHeaders = await getAuthHeaders();
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

export async function deleteProperty(id: string, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/landlord/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/dashboard/landlord/my-properties");
    return await res.json();
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
}

export async function toggleAvailability(id: string, currentStatus: boolean) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("rentnest_token")
      : null;
  const newStatus = !currentStatus;

  try {
    const res = await fetch(
      `https://assignment-4-vnjw.onrender.com/api/landlord/properties/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ isAvailable: newStatus }),
      },
    );

    if (res.ok) {
      const result = await res.json();
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: "Server validation error. Route or fields mismatch.",
      };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Network connection failed!" };
  }
}

export async function getIncomingRequests() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
      console.error(
        "Auth Error: Access Token missing in cookies context for requests.",
      );
      return { success: false, data: [] };
    }
    const res = await fetch(
      "https://assignment-4-vnjw.onrender.com/api/rentals/landlord/requests",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok)
      throw new Error("Failed to fetch incoming requests from server gateway");
    const result = await res.json();

    console.log("🔥 Landlord Incoming Requests Live API Output:", result);
    return result;
  } catch (error) {
    console.error("Get Incoming Requests Error:", error);
    return { success: false, data: [] };
  }
}

export async function updateRequestStatus(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!id || id === "undefined") {
      return {
        success: false,
        message: "Validation Error: Request ID is undefined!",
      };
    }

    const targetUrl = `https://assignment-4-vnjw.onrender.com/api/rentals/landlord/requests/${id}`;
    console.log("🚀 Hitting Real PATCH Status Gateway URL:", targetUrl);

    const res = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
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
