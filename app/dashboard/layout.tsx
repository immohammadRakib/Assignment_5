import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import DashboardSidebar from "./_components/dashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/30">
      <SidebarProvider>
        <div className="flex flex-1 w-full">
          <DashboardSidebar user={user} />

          <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 overflow-y-auto dark:bg-slate-900">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
