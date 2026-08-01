"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Bell, Shield, Mail, Eye } from "lucide-react";
import { toast } from "sonner";

export default function TenantSettingsClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [emailNotify, setEmailNotify] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSaveSettings = () => {
    toast.success("Preferences updated successfully inside server instance!");
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-2xl select-none">
      <Card className="border border-neutral-100 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl shadow-neutral-100/30 dark:shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            {theme === "dark" ? (
              <Moon className="text-rose-500 w-4 h-4" />
            ) : (
              <Sun className="text-rose-500 w-4 h-4" />
            )}
            Interface Appearance
          </CardTitle>
          <CardDescription className="text-xs">
            Customize how RentNest marketplace looks on your desktop.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setTheme("light")}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${
              theme === "light"
                ? "border-rose-500 bg-rose-50/20 text-rose-600 font-bold"
                : "border-neutral-100 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900 text-gray-500"
            }`}
          >
            <Sun size={20} />
            <span className="text-xs uppercase font-bold tracking-wider">
              Light Theme
            </span>
          </div>

          <div
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${
              theme === "dark"
                ? "border-rose-500 bg-rose-950/20 text-rose-400 font-bold"
                : "border-neutral-100 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900 text-gray-500"
            }`}
          >
            <Moon size={20} />
            <span className="text-xs uppercase font-bold tracking-wider">
              Dark Theme
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-neutral-100 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl shadow-neutral-100/30 dark:shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Bell className="text-rose-500 w-4 h-4" /> Marketplace Notifications
          </CardTitle>
          <CardDescription className="text-xs">
            Control the security and updates dispatch frequency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 font-semibold text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between p-3 bg-neutral-50/50 dark:bg-neutral-800/40 border border-neutral-100/80 dark:border-neutral-800 rounded-2xl">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-neutral-400" />
              <div>
                <p className="text-gray-900 dark:text-gray-200">Email Alerts</p>
                <p className="text-[10px] text-neutral-400 font-normal">
                  Notify me when the host approves my booking request.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailNotify}
              onChange={(e) => setEmailNotify(e.target.checked)}
              className="accent-rose-500 h-4 w-4 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-neutral-50/50 dark:bg-neutral-800/40 border border-neutral-100/80 dark:border-neutral-800 rounded-2xl">
            <div className="flex items-start gap-3">
              <Eye className="w-4 h-4 mt-0.5 text-neutral-400" />
              <div>
                <p className="text-gray-900 dark:text-gray-200">
                  Promotional Emails
                </p>
                <p className="text-[10px] text-neutral-400 font-normal">
                  Receive updates on price drops and bachelor discounts.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="accent-rose-500 h-4 w-4 rounded cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-neutral-100 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl shadow-neutral-100/30 dark:shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-black flex items-center gap-2">
            <Shield className="text-rose-500 w-4 h-4" /> Account Safety
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-neutral-50/50 dark:bg-neutral-800/40 border border-neutral-100/80 dark:border-neutral-800 rounded-2xl text-xs font-semibold">
            <div>
              <p className="text-gray-900 dark:text-gray-200">
                Enforce Two-Factor Validation (2FA)
              </p>
              <p className="text-[10px] text-neutral-400 font-normal">
                Secure your sessions with advanced cryptographic auth hashes.
              </p>
            </div>
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="accent-rose-500 h-4 w-4 rounded cursor-pointer"
            />
          </div>

          <Button
            onClick={handleSaveSettings}
            className="w-full h-11 bg-gray-900 hover:bg-black dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-bold rounded-xl mt-2 cursor-pointer transition active:scale-[0.98]"
          >
            Save All Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
