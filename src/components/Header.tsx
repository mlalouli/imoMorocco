"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
            I
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-950">ImmoAgence</div>
            <div className="text-xs text-slate-500">Morocco real estate</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Link href="/listings" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">Annonces</Link>
          <Link href="/about" className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">About</Link>
          {!user ? (
            <Link href="/login" className="rounded-full bg-slate-950 px-4 py-2 text-white transition hover:-translate-y-px hover:bg-slate-800">
              Se connecter
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 md:inline-flex">
                {user.name} ({user.role})
              </span>
              {user.role === "buyer" ? (
                <Link href="/buyer" className="rounded-full border border-slate-200 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-100">
                  Dashboard
                </Link>
              ) : (
                <Link href="/seller" className="rounded-full border border-slate-200 px-3 py-2 transition hover:border-slate-300 hover:bg-slate-100">
                  Vendre
                </Link>
              )}
              <button onClick={() => logout()} className="rounded-full px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950">
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
