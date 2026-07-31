'use client';

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Laptop, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Light Mode', icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'dark', name: 'Dark Mode', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-900/20' },
    { id: 'system', name: 'System', icon: Laptop, color: 'text-slate-500', bg: 'bg-slate-100' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">App Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Personalize your RentNest experience and interface colors.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-xs font-black uppercase tracking-widest text-rose-500">Appearance</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 group ${
                theme === t.id 
                ? 'border-rose-500 bg-rose-50/30 dark:bg-rose-500/5' 
                : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
              }`}
            >
              <div className={`p-3 rounded-xl ${t.bg} ${t.color}`}>
                <t.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.name}</span>
              
              {theme === t.id && (
                <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-rose-500 fill-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
