"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type Listing = {
  id: number | string;
  title: string;
  price?: string;
  locationText?: string;
  description?: string;
  images?: string[];
  latLng?: { lat: number; lng: number } | null;
  seller?: { name?: string; email?: string; role?: string } | null;
  createdAt?: string;
};

const STORAGE = "immo_seller_listings";

export default function SellerPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE) || "[]";
      setListings(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load listings", e);
      setListings([]);
    }
  }, []);

  function remove(id: number | string) {
    const next = listings.filter((l) => l.id !== id);
    setListings(next);
    localStorage.setItem(STORAGE, JSON.stringify(next));
  }

  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef4f8_100%)] text-slate-950">
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Seller workspace</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Manage your listings from one calm dashboard.</h1>
            <p className="max-w-[62ch] text-base leading-7 text-slate-600 sm:text-lg">
              Review published properties, keep track of your inventory, and create a new listing when you are ready.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!user ? (
              <>
                <Link href="/login" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  Sign in
                </Link>
                <Link href="/register" className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Create account
                </Link>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                Signed in as <span className="font-semibold text-slate-950">{user.name}</span>
              </div>
            )}
            <Link href="/seller/add" className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Publish listing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: String(listings.length), label: "published listings" },
            { value: String(listings.filter((item) => item.images && item.images.length > 0).length), label: "with photos" },
            { value: "Ready", label: "local storage sync" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {listings.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">No listings yet</h2>
              <p className="text-base leading-7 text-slate-600">
                Start with one strong property. Add photos, location details, and a clear description so buyers can open it right away.
              </p>
              <Link href="/seller/add" className="inline-flex rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Create your first listing
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {listings.map((listing) => (
              <article key={listing.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[260px] bg-slate-100">
                    <img
                      src={(listing.images && listing.images[0]) || "https://via.placeholder.com/1200x900?text=Listing"}
                      alt={listing.title}
                      className="h-full w-full object-cover"
                    />
                    {listing.images && listing.images.length > 1 ? (
                      <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                        {listing.images.length} photos
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col justify-between gap-6 p-6 sm:p-7">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{listing.title}</h2>
                          <p className="mt-1 text-sm text-slate-500">{listing.locationText || "Location not set"}</p>
                        </div>
                        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-lg font-semibold text-emerald-700">{listing.price || "-"}</div>
                      </div>

                      <p className="text-sm leading-6 text-slate-600">{listing.description || "No description provided yet."}</p>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                          <p className="font-medium text-slate-950">Location</p>
                          <p className="mt-1">{listing.locationText || "Not specified"}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                          <p className="font-medium text-slate-950">Coordinates</p>
                          <p className="mt-1">{listing.latLng ? `${listing.latLng.lat.toFixed(4)}, ${listing.latLng.lng.toFixed(4)}` : "Not selected"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${listing.latLng?.lat || ""},${listing.latLng?.lng || ""}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        View map
                      </a>
                      <button
                        onClick={() => remove(listing.id)}
                        className="rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
                      >
                        Delete
                      </button>
                      {listing.seller ? (
                        <div className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                          Published by <span className="font-semibold text-slate-950">{listing.seller.name || listing.seller.email}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
