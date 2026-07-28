import { NextResponse } from 'next/server'; 
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

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
      const decoded: any = jwtDecode(accessToken);
      const role = decoded?.role;

      // লগইন থাকা অবস্থায় লগইন/রেজিস্ট্রেশন পেজে যেতে চাইলে ড্যাশবোর্ডে পাঠিয়ে দাও
      if (authRoutes.includes(pathname)) {
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        if (role === 'LANDLORD') return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // ৩. রোল ভিত্তিক এক্সেস কন্ট্রোল (RBAC) - এটিই তোমার মেইন সমাধান
      if (pathname.startsWith('/admin-dashboard') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url)); // অ্যাডমিন না হলে হোমপেজে ফেরত
      }

      if (pathname.startsWith('/landlord-dashboard') && role !== 'LANDLORD') {
        return NextResponse.redirect(new URL('/', request.url)); // ল্যান্ডলর্ড না হলে হোমপেজে ফেরত
      }

      if (pathname.startsWith('/dashboard') && role !== 'TENANT') {
        // যদি সে ল্যান্ডলর্ড হয় এবং ভুল করে টেন্যান্ট ড্যাশবোর্ডে ঢুকে যায়
        if (role === 'LANDLORD') return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin-dashboard', request.url));
      }

    } catch (error) {
      // টোকেন ইনভ্যালিড হলে কুকি ডিলিট করে লগইনে পাঠিয়ে দাও
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }

  return NextResponse.next();
}

// ৪. কোন কোন লিংকে এই পাহারা চলবে (Matcher)
export const config = {
  matcher: ['/dashboard/:path*', '/landlord-dashboard/:path*', '/admin-dashboard/:path*', '/login', '/register'],
};
