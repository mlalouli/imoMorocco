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
    <div className="min-h-screen px-4 py-16 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200">Mon espace vendeur</h1>
          <Link href="/seller/add" className="bg-blue-600 text-white px-4 py-2 rounded">Publier une annonce</Link>
        </div>

        {listings.length === 0 ? (
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded">
            <h2 className="font-semibold mb-2">Aucune annonce pour l'instant</h2>
            <p className="text-zinc-600 mb-4">Publiez une annonce détaillée avec photos et emplacement sur la carte pour commencer.</p>
            <Link href="/seller/add" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Commencer</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {listings.map((l) => (
              <div key={l.id} className="border rounded p-4 bg-white dark:bg-zinc-900 shadow-sm">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 rounded overflow-hidden flex items-center justify-center">
                      <img src={(l.images && l.images[0]) || "https://via.placeholder.com/600x400"} alt={l.title} className="w-full h-full object-cover" />
                    </div>
                    {l.images && l.images.length > 1 && (
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {l.images.map((src, idx) => (
                          <a key={idx} href={src} target="_blank" rel="noreferrer" className="block">
                            <img src={src} alt={`thumb-${idx}`} className="w-full h-16 object-cover rounded" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 flex flex-col">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-lg">{l.title}</h2>
                      <div className="text-blue-600 font-bold">{l.price}</div>
                    </div>
                    <div className="text-sm text-zinc-600">{l.locationText}</div>
                    <p className="mt-3 text-zinc-700 dark:text-zinc-300">{l.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <a href={`https://www.google.com/maps/search/?api=1&query=${l.latLng?.lat || ""},${l.latLng?.lng || ""}`} target="_blank" rel="noreferrer" className="px-3 py-1 bg-zinc-100 rounded">Voir sur la carte</a>
                      <button onClick={() => remove(l.id)} className="px-3 py-1 bg-red-600 text-white rounded">Supprimer</button>
                      {l.seller && (
                        <div className="ml-auto text-sm text-zinc-600">Publié par: <span className="font-medium text-zinc-800 dark:text-zinc-200">{l.seller.name || l.seller.email}</span></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
