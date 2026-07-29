import TenantSettingsClient from "../_components/settingsClient";
import { Settings } from "lucide-react";

export default function TenantSettingsPage() {
  return (
    <div className="space-y-6 p-2">
      
      {/* হেডার */}
      <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-rose-500" /> Account Settings
        </h1>
        <p className="text-xs text-neutral-400 font-medium mt-0.5">
          Modify your security options, configuration presets, and switch dark theme modes.
        </p>
      </div>

      {/* লাইভ সেটিংস মডিউল */}
      <TenantSettingsClient />

    </div>
  );
}
