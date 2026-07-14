"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SellerAddPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<any>(null);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [locationText, setLocationText] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [suites, setSuites] = useState("");
  const [balconies, setBalconies] = useState("");
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([]);

  // Load Leaflet CSS and JS from CDN and initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const Lcss = document.createElement("link");
    Lcss.rel = "stylesheet";
    Lcss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(Lcss);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      const map = L.map(mapRef.current).setView([31.6295, -7.9811], 6); // Centered on Morocco

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      map.on("click", function (e: any) {
        const { lat, lng } = e.latlng;
        setLatLng({ lat, lng });
        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng);
        } else {
          markerRef.current = L.marker(e.latlng).addTo(map);
        }
      });

      // try to set current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const p = [pos.coords.latitude, pos.coords.longitude];
            map.setView(p, 12);
          },
          () => {
            /* ignore */
          }
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      // remove script and css if needed
      document.head.removeChild(Lcss);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const arr: Array<{ file: File; url: string }> = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      arr.push({ file, url });
    }
    setImages((prev) => [...prev, ...arr]);
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((p) => p.url !== url));
  }

  const { user } = useAuth();
  const router = useRouter();

  async function saveListing(e: React.FormEvent) {
    e.preventDefault();

    // helper: file -> base64
    function toBase64(file: File) {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    }

    // convert files to data URLs so they persist across navigation/reloads
    const imagesBase64: string[] = await Promise.all(
      images.map(async (i) => {
        try {
          if (i.file) return await toBase64(i.file);
          return i.url;
        } catch (e) {
          console.warn("Failed to convert image to base64", e);
          return i.url;
        }
      })
    );

    const listing = {
      id: Date.now(),
      title,
      price,
      locationText,
      description,
      latLng,
      images: imagesBase64,
      phone,
      bedrooms,
      bathrooms,
      suites,
      balconies,
      seller: user ? { name: user.name, email: user.email, role: user.role } : null,
      createdAt: new Date().toISOString(),
    };
    const STORAGE = "immo_seller_listings";
    const existing = JSON.parse(localStorage.getItem(STORAGE) || "[]");
    existing.unshift(listing);
    localStorage.setItem(STORAGE, JSON.stringify(existing));
    // redirect to the new listing details so the user sees it immediately
    router.push(`/listings/${listing.id}`);
    // clear form
    setTitle("");
    setPrice("");
    setLocationText("");
    setDescription("");
    setImages([]);
    setLatLng(null);
  }

  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef4f8_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Seller listing form</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Publish a listing with clearer details.</h1>
              <p className="max-w-[62ch] text-base leading-7 text-slate-600 sm:text-lg">
                Add the essentials first: title, price, location, photos, and map position. The rest can be refined before sharing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Step 1 / 2
            </div>
          </div>

          <form onSubmit={saveListing} className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <section className="grid gap-2">
                <label className="text-sm font-medium text-slate-900">Listing title *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Example: Renovated riad in Marrakech"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </section>

              <section className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">Price</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Example: 1 200 000 MAD"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">District / address</label>
                  <input
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                    placeholder="Example: Médina, Marrakech"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">Seller phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+2126xxxxxxxx"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">Bedrooms</label>
                  <input
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="3"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">Bathrooms</label>
                  <input
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    placeholder="2"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">Suites</label>
                  <input
                    value={suites}
                    onChange={(e) => setSuites(e.target.value)}
                    placeholder="1"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-900">Balconies</label>
                  <input
                    value={balconies}
                    onChange={(e) => setBalconies(e.target.value)}
                    placeholder="2"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </section>

              <section className="grid gap-2">
                <label className="text-sm font-medium text-slate-900">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Describe the property, the layout, the light, the views, and the key selling points."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </section>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setPrice("");
                    setLocationText("");
                    setDescription("");
                    setImages([]);
                    setLatLng(null);
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Clear form
                </button>
                <button type="submit" className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Publish listing
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Photos</label>
                  <p className="text-sm leading-6 text-slate-500">Upload multiple images. The first one becomes the cover photo.</p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <input type="file" accept="image/*" multiple onChange={onImageChange} aria-label="Ajouter des photos" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {images.length === 0 ? <div className="text-sm text-slate-500">No photos added yet.</div> : null}
                  {images.map((img) => (
                    <div key={img.url} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <img src={img.url} className="h-32 w-full object-cover" alt="aperçu" />
                      <button
                        type="button"
                        onClick={() => removeImage(img.url)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/85 text-sm text-white transition hover:bg-slate-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Map position</label>
                  <p className="text-sm leading-6 text-slate-500">Click the map to set the exact location. Geolocation can center you automatically.</p>
                </div>
                <div id="map" ref={mapRef} className="mt-4 h-72 w-full overflow-hidden rounded-2xl border border-slate-200" />
                <div className="mt-3 text-sm text-slate-600">
                  Selected: {latLng ? `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}` : "No location selected"}
                </div>
              </section>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
