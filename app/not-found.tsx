"use client";

import React from "react";
import Link from "next/link";
import { Home, Compass, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-b from-white to-neutral-50/50 dark:from-slate-900 dark:to-background transition-colors duration-300">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-rose-100 rounded-full scale-150 blur-xl opacity-50 animate-pulse dark:bg-rose-950/40" />
        <div className="relative p-5 bg-white border border-neutral-100 rounded-full shadow-md text-rose-500 animate-bounce dark:bg-slate-800 dark:border-slate-700/60 dark:text-rose-400">
          <Compass
            className="w-14 h-14 stroke-[1.5] animate-spin"
            style={{ animationDuration: "10s" }}
          />
        </div>
        <AlertCircle className="w-5 h-5 text-rose-400 absolute -bottom-1 -right-1 bg-white rounded-full shadow-sm dark:bg-slate-800 dark:text-rose-500" />
      </div>
      <div className="space-y-3 max-w-md">
        <h1 className="text-7xl font-extrabold tracking-tighter text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-400 dark:to-pink-500">
          404
        </h1>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
          Page Not Found
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed dark:text-slate-400">
          The property, rental unit, or dashboard resource you are looking for
          has been moved, renamed, or doesn't exist.
        </p>
      </div>
      <div className="mt-8">
        <Link href="/">
          <button className="h-11 px-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer dark:from-rose-600 dark:to-pink-700 dark:hover:from-rose-700 dark:hover:to-pink-800">
            <Home className="w-4 h-4" /> Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
