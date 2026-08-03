"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { loginSchema, registerSchema } from "./authSchema";

export const loginAction = async (
  redirectTo: string,
  prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed!",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const payload = { email, password };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });

      const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

      return {
        success: true,
        accessToken: result.data.accessToken,
        role: decodedToken.role,
        redirectTo: redirectTo,
      };
    }

    return {
      success: false,
      message: result.message || "Login failed!",
    };
  } catch (error) {
    console.error("Login Server Action Error:", error);
    return {
      success: false,
      message: "Something went wrong during login!",
    };
  }
};

export const registerAction = async (
  redirectTo: string,
  prevState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validatedFields = registerSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed!",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role } = validatedFields.data;

  if ((role as string) === "ADMIN") {
    return {
      success: false,
      message: "You cannot register as an ADMIN from here!",
    };
  }

  const payload = { name, email, password, role };

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (result.success) {
      return { success: true, message: "Registration successful!" };
    } else {
      return {
        success: false,
        message: result.message || "Registration failed on backend!",
      };
    }
  } catch (error) {
    console.error("Registration Server Action Error:", error);
    return {
      success: false,
      message: "Something went wrong during registration!",
    };
  }
};
