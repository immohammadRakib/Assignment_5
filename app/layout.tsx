import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import { Navbar } from "@/components/shared/navbar"; 
import { Footer } from "@/components/shared/footer"; 
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ১. কুকি থেকে টোকেন নেওয়া
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // ২. ডিফল্ট ইউজার ডাটা অবজেক্ট
  let userData = { 
    success: false, 
    data: null, 
    message: "" 
  };

  // ৩. টোকেন থাকলে ডিকোড করে ডাটা রেডি করা
  if (token) {
    try {
      const decoded = jwt.decode(token) as any;
      if (decoded) {
        userData = {
          success: true,
          message: "User fetched successfully",
          data: {
            profile: {
              name: decoded.name || decoded.email.split("@")[0], 
              email: decoded.email,
              role: decoded.role, 
            }
          } as any
        };
      }
    } catch (error) {
      console.error("Layout token decoding failed:", error);
    }
  }

  // return (
  //   <html lang="en" className={cn("h-full antialiased", "font-sans", inter.variable)} >
  //     <body className="min-h-full flex flex-col">
  //       <Toaster position="top-right" richColors />
        
  //       {/* ডাইনামিক নেভবার */}
  //       <Navbar user={userData as any} /> 
        
  //       {/* 🛠️ ফিক্স: এখানে শুধু একবারই children থাকবে এবং flex-1 কন্টেন্টকে নিচে ঠেলে দেবে */}
  //       <main className="flex-1 flex flex-col">
  //         {children}
  //       </main>
        
  //       {/* ফুটার */}
  //       <Footer />
  //     </body>
  //   </html>
  // );


  // 🛠️ app/layout.tsx এর রিটার্ন স্টেটমেন্ট এভাবে আপডেট করো:
return (
  <html 
    lang="en" 
    className={cn("h-full antialiased", "font-sans", inter.variable)} 
    suppressHydrationWarning={true} // 🎯 এই ম্যাজিক লাইনটি যোগ করো
  >
    <body className="min-h-full flex flex-col">
      <Toaster position="top-right" richColors />
      
      {/* ডাইনামিক নেভবার */}
      <Navbar user={userData as any} /> 
      
      {/* মেইন কন্টেন্ট */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      {/* ফুটার */}
      <Footer />
    </body>
  </html>
);


}

