/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


export const getAllProperties = async (searchParams?: { 
  search?: string; 
  category?: string; 
  city?: string;
  page?: string;
}) => {
  try {
    let url = `${process.env.BACKEND_API_URL}/api/properties`;
    const queryParts: string[] = [];

    if (searchParams?.search) {
      queryParts.push(`search=${encodeURIComponent(searchParams.search)}`);
      queryParts.push(`searchTerm=${encodeURIComponent(searchParams.search)}`);
      queryParts.push(`query=${encodeURIComponent(searchParams.search)}`);
    }
    
    if (searchParams?.category) queryParts.push(`category=${encodeURIComponent(searchParams.category)}`);
    if (searchParams?.city) queryParts.push(`city=${encodeURIComponent(searchParams.city)}`);
    if (searchParams?.page) queryParts.push(`page=${searchParams.page}`);

    if (queryParts.length > 0) {
      url += `?${queryParts.join("&")}`;
    }

    console.log("Request URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(`Backend returned non-200 status: ${res.status} for search query.`);
      return { 
        success: true, 
        data: [] 
      }; 
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Get All Properties Catch Error:", error);
    return {
      success: true,
      data: [],
    };
  }
};



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
      cache: "no-store", 
    });

    return await res.json();
  } catch (error) {
    console.error(`Get Property Details Error for ID ${propertyId}:`, error);
    return {
      success: false,
      message: "Failed to fetch property details.",
      data: null,
    };
  }
};




export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["property-categories"],
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return {
      success: false,
      message: "Failed to load categories.",
      data: [],
    };
  }
};
