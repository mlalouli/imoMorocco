"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
      <div className="text-2xl font-bold text-blue-700">ImmoAgence</div>
      <nav className="flex items-center gap-4">
        <Link href="/listings" className="hover:text-blue-500">Annonces</Link>
        <Link href="/about" className="hover:text-blue-500">About</Link>
        {!user ? (
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-700">{user.name} ({user.role})</span>
            {user.role === "buyer" ? (
              <Link href="/buyer" className="text-blue-600">Dashboard</Link>
            ) : (
              <Link href="/seller" className="text-blue-600">Vendre</Link>
            )}
            <button onClick={() => logout()} className="text-sm text-red-600">Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}
