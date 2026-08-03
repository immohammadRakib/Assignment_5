import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🎯 ১. [ম্যাজিক ফিক্স]: পেমেন্ট রাউটগুলোকে মিডলওয়্যারের একদম শুরুতে লক করা হলো
  // টোকেন থাকুক আর না থাকুক, পেমেন্ট রাউট ম্যাচ করলেই সে ডিরেক্ট পেজ ওপেন করবে, কোনো রোল চেক হবে না!
  const isPaymentRoute = 
    pathname.startsWith('/dashboard/tenant/payments/success') || 
    pathname.startsWith('/dashboard/tenant/payments/fail') || 
    pathname.startsWith('/dashboard/tenant/payments/cancel');

  if (isPaymentRoute) {
    return NextResponse.next();
  }

  // 🔑 ২. বাকি রাউট ও রোল সেটিংস কনফিগারেশন
  const accessToken = request.cookies.get('accessToken')?.value;
  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isLandlordRoute = pathname.startsWith('/dashboard/landlord');
  const isTenantRoute = pathname.startsWith('/dashboard/tenant');
  const isGlobalSettingsRoute = pathname.startsWith('/dashboard/settings');
  const isProtectedRoute = isAdminRoute || isLandlordRoute || isTenantRoute || isGlobalSettingsRoute;
  
  const authRoutes = ['/auth/login', '/auth/register', '/login', '/register'];

  // টোকেন না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট
  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL(`/auth/login?redirectTo=${pathname}`, request.url));
  }

  // ৩. টোকেন থাকলে রোল ডিকোডিং এবং এক্সেস ভ্যালিডেশন লেয়ার
  if (accessToken) {
    try {
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decoded = JSON.parse(jsonPayload);
      const role = decoded?.role;

      // লগইন/রেজিস্ট্রেশন পেজে থাকলে ড্যাশবোর্ডে রিডাইরেক্ট ট্রিক
      if (authRoutes.some(route => pathname.startsWith(route))) {
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        if (role === 'LANDLORD') return NextResponse.redirect(new URL('/dashboard/landlord', request.url));
        return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
      }

      // 🛡️ রোল ভিত্তিক কড়া নিরাপত্তা প্রহরী (পেমেন্ট রাউট অলরেডি ওপরে বাইপাসড)
      if (isAdminRoute && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      if (isLandlordRoute && role !== 'LANDLORD') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      if (isTenantRoute && role !== 'TENANT') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      
    } catch (error) {
      console.error("Middleware Sync Error:", error);
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }

  return NextResponse.next();
}

// 🎯 নেক্সট জেএস-এর স্ট্যান্ডার্ড ম্যাচার কনফিগারেশন যা বিল্ড ক্র্যাশ করবে না
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/login',
    '/register'
  ],
};
