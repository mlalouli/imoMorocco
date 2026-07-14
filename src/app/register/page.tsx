"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name to create an account.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email to create an account.");
      return;
    }

    setError("");
    login({ name, email, role });
  };

  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef4f8_100%)] text-slate-950">
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-7xl gap-10 px-4 py-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-8">
        <section className="flex items-center justify-center order-2 lg:order-1">
          <form
            onSubmit={onSubmit}
            className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)] sm:p-8"
          >
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Account</p>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Create your account</h1>
              <p className="text-sm leading-6 text-slate-600">
                Enter your details, choose the workspace you want to open, and continue into your dashboard.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="register-name" className="text-sm font-medium text-slate-900">
                  Name
                </label>
                <input
                  id="register-name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="register-email" className="text-sm font-medium text-slate-900">
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-900">Workspace</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`rounded-2xl border px-4 py-3 text-left transition active:translate-y-px ${role === "buyer" ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}
                  >
                    <span className="block text-sm font-semibold">Buyer</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">Browse listings and save favorites.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("seller")}
                    className={`rounded-2xl border px-4 py-3 text-left transition active:translate-y-px ${role === "seller" ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}
                  >
                    <span className="block text-sm font-semibold">Seller</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">Publish properties and review activity.</span>
                  </button>
                </div>
              </div>

              {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

              <button className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:translate-y-px">
                Create account
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-800">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </section>

        <section className="flex flex-col justify-between rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8 lg:p-10 order-1 lg:order-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              New account
            </div>

            <div className="max-w-xl space-y-5">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Register once, then move faster everywhere.
              </h2>
              <p className="max-w-[60ch] text-base leading-7 text-slate-600 sm:text-lg">
                Create a buyer or seller profile to save preferences, post listings, and keep your workspace ready on every visit.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "Fast", label: "one minute setup" },
                { value: "Private", label: "stored locally" },
                { value: "Ready", label: "for buyer or seller" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xl font-semibold tracking-tight text-slate-950">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-950">Buyer profile</p>
              <p className="mt-1">Shortlist listings, browse faster, and return anytime.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-medium text-slate-950">Seller profile</p>
              <p className="mt-1">Publish properties and manage your inventory from one place.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
