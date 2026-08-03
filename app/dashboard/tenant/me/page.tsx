import { getMe } from "@/service/getMe";
import ProfileViewClient from "../../_components/profileViewClient";
import { User, ShieldCheck } from "lucide-react";

export default async function TenantProfilePage() {
  const user = await getMe();
  const profileData = user?.data?.profile || user?.data || {};
  const userEmail = user?.data?.email || user?.email || "";

  return (
    <div className="max-w-3xl mx-auto p-2 space-y-6 select-none dark:bg-background transition-colors duration-300">
      <div className="border-b border-neutral-100 pb-4 dark:border-slate-800">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2 dark:text-slate-100">
          <User className="w-6 h-6 text-rose-500 dark:text-rose-400" />
          My Profile
        </h1>
        <p className="text-xs text-neutral-400 font-medium mt-0.5 dark:text-slate-400">
          Review your tenant identity records or dispatch secure updates to the
          database mesh.
        </p>
      </div>
      <ProfileViewClient profileData={profileData} userEmail={userEmail} />

      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-semibold justify-center pt-2 dark:text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
        <span>
          Secured cryptographic identity matrix verified by RentNest security
          layer [⚠]
        </span>
      </div>
    </div>
  );
}
