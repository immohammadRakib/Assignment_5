import { Navbar } from "@/components/shared/navbar"; 
import { SidebarProvider } from "@/components/ui/sidebar"; 
import { getMe } from "@/service/getMe"; 
import DashboardSidebar from "./_components/dashboardSidebar"; 

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // সার্ভার সাইড থেকে লগইন করা ইউজারের লাইভ ডাটা আনা হচ্ছে
  const user = await getMe(); 

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/30">
      <SidebarProvider>
        <div className="flex flex-1 w-full">
          
          {/* ১. সম্পূর্ণ ডাইনামিক সাইডবার মডিউল */}
          <DashboardSidebar user={user} /> 
          
          {/* ২. ডানপাশের মেইন ওয়ার্কস্পেস কন্টেন্ট */}
          <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
          
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
