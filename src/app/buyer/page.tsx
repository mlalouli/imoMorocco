"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function BuyerPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen px-4 py-16 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Bienvenue {user?.name}</h1>
        <p className="text-zinc-700 mb-6">Explorez les annonces et sauvegardez vos préférées.</p>
        <a href="/listings" className="bg-blue-600 text-white px-4 py-2 rounded">Voir les annonces</a>
      </div>
    </div>
  );
}
