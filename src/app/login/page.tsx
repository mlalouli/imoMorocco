"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Please enter a name");
    login({ name, email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-black">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Se connecter / S'inscrire</h2>
        <input className="w-full p-3 mb-3 rounded" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full p-3 mb-3 rounded" placeholder="Email (optionnel)" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="flex gap-4 mb-4">
          <label className={`p-2 rounded border ${role === "buyer" ? "bg-blue-600 text-white" : "bg-transparent"}`}>
            <input type="radio" name="role" value="buyer" checked={role === "buyer"} onChange={() => setRole("buyer")} /> Buyer
          </label>
          <label className={`p-2 rounded border ${role === "seller" ? "bg-blue-600 text-white" : "bg-transparent"}`}>
            <input type="radio" name="role" value="seller" checked={role === "seller"} onChange={() => setRole("seller")} /> Seller
          </label>
        </div>
        <button className="w-full bg-blue-600 text-white p-3 rounded">Continue</button>
      </form>
    </div>
  );
}
