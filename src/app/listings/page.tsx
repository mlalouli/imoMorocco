"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const sampleProperties = [
  {
    id: "sample-1",
    title: "Riad Traditionnel à Marrakech",
    location: "Marrakech, Médina",
    price: "2 500 000 MAD",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Magnifique riad rénové avec patio, 4 chambres, terrasse panoramique et piscine. Idéal pour maison d’hôtes ou résidence familiale.",
    seller: null,
  },
  {
    id: "sample-2",
    title: "Appartement Moderne avec Vue Mer",
    location: "Casablanca, Corniche",
    price: "1 800 000 MAD",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Appartement lumineux de 3 pièces, balcon vue sur l’océan, cuisine équipée, résidence sécurisée avec parking.",
    seller: null,
  },
  {
    id: "sample-3",
    title: "Villa de Luxe avec Jardin",
    location: "Rabat, Souissi",
    price: "6 500 000 MAD",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
    description: "Superbe villa contemporaine, 5 chambres, grand jardin arboré, piscine privée, finitions haut de gamme.",
    seller: null,
  },
];

const listingFilters = ["All", "Marrakech", "Casablanca", "Rabat", "Villa", "Riad", "Apartment"];

type SellerListing = {
  id?: string | number;
  title?: string;
  locationText?: string;
  location?: string;
  price?: string;
  images?: string[];
  description?: string;
  seller?: unknown;
};

type DisplayListing = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  description: string;
  seller: unknown;
};

export default function Listings() {
  const [sellerListings, setSellerListings] = useState<SellerListing[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem("immo_seller_listings") || "[]";
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSellerListings(parsed as SellerListing[]);
        }
      } catch (error) {
        console.error("Failed to read seller listings", error);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const combined: DisplayListing[] = [
    ...sellerListings.map((listing, index) => ({
      id: String(listing.id ?? `seller-${index}`),
      title: listing.title || "Annonce",
      location: listing.locationText || listing.location || "-",
      price: listing.price || "-",
      image:
        listing.images?.[0] ||
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      description: listing.description || "",
      seller: listing.seller || null,
    })),
    ...sampleProperties,
  ];

  return (
    <main className="bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#ffffff_52%,#eef4f8_100%)] text-slate-950">
      <section className="mx-auto w-full max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Annonces</p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Browse Moroccan homes with clearer filters.
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-7 text-slate-600 sm:text-lg">
              Search curated riads, apartments, and villas with a more premium reading experience. Local seller listings appear alongside sample inventory so the page always feels populated.
            </p>
          </div>

          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:grid-cols-3">
            {[
              { value: String(combined.length), label: "properties" },
              { value: String(sellerListings.length), label: "local listings" },
              { value: "24h", label: "fresh updates" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="flex flex-wrap gap-2">
            {listingFilters.map((filter, index) => (
              <button
                key={filter}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${index === 0 ? "bg-slate-950 text-white" : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-950"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {combined.map((property) => (
            <Link key={property.id} href={`/listings/${property.id}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
              <div className="relative">
                <Image src={property.image} alt={property.title} width={1200} height={800} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]" unoptimized />
                {Boolean('seller' in property && property.seller) && (
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
                    Annonce réelle
                  </span>
                )}
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950">{property.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">{property.location}</p>
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-slate-950">{property.price}</span>
                </div>
                <p className="text-sm leading-6 text-slate-600">{property.description}</p>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500">
                  <span>View property</span>
                  <span className="text-slate-900">Open details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
