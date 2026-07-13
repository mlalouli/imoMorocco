"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "buyer" | "seller";
type User = { name: string; email?: string; role: Role } | null;

type AuthContextType = {
  user: User;
  login: (payload: { name: string; email?: string; role: Role }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "immo_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const login = (payload: { name: string; email?: string; role: Role }) => {
    const u = { name: payload.name, email: payload.email, role: payload.role };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    // redirect to appropriate dashboard
    if (payload.role === "buyer") router.push("/buyer");
    else router.push("/seller");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
