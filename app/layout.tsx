import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { cookies } from "next/headers"; 
import jwt from "jsonwebtoken"; 
import { Navbar } from "@/components/shared/navbar"; 
import { Footer } from "@/components/shared/footer"; 
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  let userData = { 
    success: false, 
    data: null, 
    message: "" 
  };

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

  
return (
  <html 
    lang="en" 
    className={cn("h-full antialiased", "font-sans", inter.variable)} 
    suppressHydrationWarning={true} 
  >
<body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Toaster position="top-right" richColors />

      <Navbar user={userData as any} /> 

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
      </ThemeProvider>
    </body>
  </html>
);


}

