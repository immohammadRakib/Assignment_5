import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPaymentRoute =
    pathname.startsWith("/dashboard/tenant/payments/success") ||
    pathname.startsWith("/dashboard/tenant/payments/fail") ||
    pathname.startsWith("/dashboard/tenant/payments/cancel");

  if (isPaymentRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const isAdminRoute = pathname.startsWith("/dashboard/admin");
  const isLandlordRoute = pathname.startsWith("/dashboard/landlord");
  const isTenantRoute = pathname.startsWith("/dashboard/tenant");
  const isGlobalSettingsRoute = pathname.startsWith("/dashboard/settings");
  const isProtectedRoute =
    isAdminRoute || isLandlordRoute || isTenantRoute || isGlobalSettingsRoute;

  const authRoutes = ["/auth/login", "/auth/register", "/login", "/register"];

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/auth/login?redirectTo=${pathname}`, request.url),
    );
  }

  if (accessToken) {
    try {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );

      const decoded = JSON.parse(jsonPayload);
      const role = decoded?.role;

      if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (role === "ADMIN")
          return NextResponse.redirect(
            new URL("/dashboard/admin", request.url),
          );
        if (role === "LANDLORD")
          return NextResponse.redirect(
            new URL("/dashboard/landlord", request.url),
          );
        return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
      }

      if (isAdminRoute && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
      if (isLandlordRoute && role !== "LANDLORD") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
      if (isTenantRoute && role !== "TENANT") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      console.error("Middleware Sync Error:", error);
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/login", "/register"],
};
