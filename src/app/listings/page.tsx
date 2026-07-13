"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const sampleProperties = [
  {
    id: "sample-1",
    title: "Riad Traditionnel à Marrakech",
    location: "Marrakech, Médina",
    price: "2 500 000 MAD",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Magnifique riad rénové avec patio, 4 chambres, terrasse panoramique et piscine. Idéal pour maison d’hôtes ou résidence familiale.",
  },
  {
    id: "sample-2",
    title: "Appartement Moderne avec Vue Mer",
    location: "Casablanca, Corniche",
    price: "1 800 000 MAD",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Appartement lumineux de 3 pièces, balcon vue sur l’océan, cuisine équipée, résidence sécurisée avec parking.",
  },
  {
    id: "sample-3",
    title: "Villa de Luxe avec Jardin",
    location: "Rabat, Souissi",
    price: "6 500 000 MAD",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
    description: "Superbe villa contemporaine, 5 chambres, grand jardin arboré, piscine privée, finitions haut de gamme.",
  },
];

export default function Listings() {
  const [sellerListings, setSellerListings] = useState<any[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("immo_seller_listings") || "[]";
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setSellerListings(parsed);
    } catch (e) {
      console.error("Failed to read seller listings", e);
    }
  }, []);

  const combined = [...sellerListings.map((s) => ({
    id: s.id || `seller-${Math.random()}`,
    title: s.title || "Annonce",
    location: s.locationText || s.location || "-",
    price: s.price || "-",
    image: (s.images && s.images[0]) || "https://via.placeholder.com/600x400",
    description: s.description || "",
    seller: s.seller || null,
  })), ...sampleProperties];

  return (
    <div className="min-h-screen bg-white dark:bg-black px-4 py-16">
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-200">Annonces Immobilières</h1>
        <div className="text-sm text-zinc-600">Annonces locales: {sellerListings.length}</div>
      </div>
  <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {combined.map((property) => (
          <Link key={property.id} href={`/listings/${property.id}`} className="hover:shadow-lg transition">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden flex flex-col">
              <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">{property.title}</h2>
                  {('seller' in property && property.seller) && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Annonce réelle</span>}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-1">{property.location}</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold mb-2">{property.price}</p>
                <p className="text-zinc-700 dark:text-zinc-300 flex-1">{property.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
