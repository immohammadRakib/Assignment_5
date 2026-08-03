// import { cn } from "@/lib/utils";
// import { Inter } from "next/font/google";
// import { Toaster } from "sonner";
// import { cookies } from "next/headers"; 
// import jwt from "jsonwebtoken"; 
// import { Navbar } from "@/components/shared/navbar"; 
// import { Footer } from "@/components/shared/footer"; 
// import { ThemeProvider } from "@/components/providers/theme-provider";
// import TanstackProvider from "@/components/providers/transtackProvider";
// import "./globals.css";

// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;

//   let userData = { 
//     success: false, 
//     data: null, 
//     message: "" 
//   };

//   if (token) {
//     try {
//       const decoded = jwt.decode(token) as any;
//       if (decoded) {
//         userData = {
//           success: true,
//           message: "User fetched successfully",
//           data: {
//             profile: {
//               name: decoded.name || decoded.email.split("@")[0], 
//               email: decoded.email,
//               role: decoded.role, 
//             }
//           } as any
//         };
//       }
//     } catch (error) {
//       console.error("Layout token decoding failed:", error);
//     }
//   }

  
// return (
//   <html 
//     lang="en" 
//     className={cn("h-full antialiased", "font-sans", inter.variable)} 
//     // suppressHydrationWarning={true} 
//     suppressHydrationWarning
//   >
// <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
//      <TanstackProvider>
//       <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
//       <Toaster position="top-right" richColors />

//       <Navbar user={userData as any} /> 

//       <main className="flex-1 flex flex-col">
//         {children}
//       </main>

//       <Footer />
//       </ThemeProvider>
//       </TanstackProvider>
//     </body>
//   </html>
// );


// }




import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🎯 ১. পেমেন্ট সাকসেস/ফেইল/ক্যান্সেল রাউটগুলোকে টার্গেট করা হচ্ছে
  const isPaymentRoute = 
    pathname.startsWith('/dashboard/tenant/payments/success') ||
    pathname.startsWith('/dashboard/tenant/payments/fail') ||
    pathname.startsWith('/dashboard/tenant/payments/cancel');

  // 🔥 ম্যাজিক এখানে: পেমেন্ট রাউট হলে মিডলওয়্যারের সব পাহারা এবং রোল চেকিং স্কিপ করে সরাসরি পেজ ওপেন হবে
  if (isPaymentRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isLandlordRoute = pathname.startsWith('/dashboard/landlord');
  const isTenantRoute = pathname.startsWith('/dashboard/tenant');
  const isGlobalSettingsRoute = pathname.startsWith('/dashboard/settings');

  const isProtectedRoute = isAdminRoute || isLandlordRoute || isTenantRoute || isGlobalSettingsRoute;
  const authRoutes = ['/auth/login', '/auth/register', '/login', '/register'];

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL(`/auth/login?redirectTo=${pathname}`, request.url));
  }

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

      if (authRoutes.some(route => pathname.startsWith(route))) {
        if (role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
        if (role === 'LANDLORD') return NextResponse.redirect(new URL('/dashboard/landlord', request.url));
        return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
      }

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

// 🎯 ফিক্স: ম্যাচার থেকে নেগেটিভ রেগুলার এক্সপ্রেশন সরিয়ে Next.js এর স্ট্যান্ডার্ড ম্যাচার দেওয়া হয়েছে, যা বিল্ড ক্র্যাশ করবে না
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/login',
    '/register'
  ],
};
