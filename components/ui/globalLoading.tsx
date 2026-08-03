"use client";

import React from "react";
import { Rocket } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md dark:bg-background/90 dark:backdrop-blur-lg transition-colors duration-300">
      <div className="relative flex flex-col items-center">
        <div className="mb-6 relative animate-bounce">
          <Rocket
            size={64}
            className="text-rose-500 transform -rotate-45 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] dark:text-rose-400 dark:drop-shadow-[0_0_25px_rgba(244,63,94,0.7)]"
          />

          <div className="absolute -bottom-3 -left-2 flex gap-1.5">
            <span className="h-3 w-3 bg-rose-500 rounded-full animate-ping opacity-75 dark:bg-rose-400"></span>
            <span className="h-2 w-2 bg-orange-400 rounded-full animate-ping delay-150 opacity-75"></span>
            <span className="h-1.5 w-1.5 bg-yellow-300 rounded-full animate-ping delay-300 opacity-75"></span>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter animate-pulse dark:text-slate-100">
            RENT NEST
          </h2>

          <div className="animate-typing mx-auto overflow-hidden">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] whitespace-nowrap dark:text-slate-400">
              Launching Experience...
            </p>
          </div>
        </div>

        <div className="w-64 h-1 bg-gray-100 rounded-full mt-10 overflow-hidden dark:bg-slate-800">
          <div className="h-full bg-rose-500 w-full animate-loading-bar origin-left dark:bg-rose-400"></div>
        </div>
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-100/30 rounded-full blur-[120px] dark:bg-rose-950/20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-100/30 rounded-full blur-[120px] dark:bg-rose-950/20"></div>
    </div>
  );
};

export default GlobalLoading;
