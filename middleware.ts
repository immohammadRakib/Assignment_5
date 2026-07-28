import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ১. প্রটেক্টেড রাউটগুলোর লিস্ট (এখানে টোকেন ছাড়া ঢোকা নিষেধ)
const protectedRoutes = ['/dashboard', '/landlord-dashboard', '/admin-dashboard'];

// ২. অথেনটিকেশন রাউট (লগইন করা থাকলে এখানে আসা নিষেধ)
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // লগইন না করে ড্যাশবোর্ডে ঢুকতে চাইলে লগইনে পাঠিয়ে দাও
  if (!accessToken && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(`/login?redirectTo=${pathname}`, request.url));
  }

  if (accessToken) {
    try {
      // 🛠️ Edge Runtime ফ্রেন্ডলি নেটিভ টোকেন ডিকোড (jwt-decode ক্র্যাশ হওয়া থেকে বাঁচাবে)
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

      // লগইন থাকা অবস্থায় লগইন/রেজিস্ট্রেশন পেজে যেতে চাইলে ড্যাশবোর্ডে পাঠিয়ে দাও
      if (authRoutes.includes(pathname)) {
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        if (role === 'LANDLORD') return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // 🛠️ ৩. রোল ভিত্তিক এক্সেস কন্ট্রোল (RBAC) - /unauthorized পেজে রিডাইরেক্ট ফ্লো
      
      // অ্যাডমিন না হলে রেস্ট্রিক্টেড পেজে ফেরত
      if (pathname.startsWith('/admin-dashboard') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url)); 
      }

      // ল্যান্ডলর্ড না হলে রেস্ট্রিক্টেড পেজে ফেরত
      if (pathname.startsWith('/landlord-dashboard') && role !== 'LANDLORD') {
        return NextResponse.redirect(new URL('/unauthorized', request.url)); 
      }

      // টেন্যান্ট না হলে রেস্ট্রিক্টেড পেজে ফেরত (যেমন ADMIN বা LANDLORD ঢুকতে চাইলে)
      if (pathname.startsWith('/dashboard') && role !== 'TENANT') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }

    } catch (error) {
      console.error("Middleware Auth Error:", error);
      // টোকেন ইনভ্যালিড বা করাপ্টেড হলে কুকি ডিলিট করে লগইনে পাঠিয়ে দাও
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }

  return NextResponse.next();
}

// ৪. কোন কোন লিংকে এই পাহারা চলবে (Matcher)
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/landlord-dashboard/:path*', 
    '/admin-dashboard/:path*', 
    '/login', 
    '/register'
  ],
};
