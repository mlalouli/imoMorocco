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
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Publier une annonce</h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Complétez le formulaire ci-dessous. Les champs marqués d'une * sont obligatoires.</p>
              </div>
              <div className="text-sm text-zinc-500">Étape 1 / 2</div>
            </div>

            <form onSubmit={saveListing} className="grid grid-cols-1 gap-6">
              <section className="grid gap-3">
                <label className="text-sm font-medium">Titre de l'annonce *</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ex: Riad rénové à Marrakech" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent" />
              </section>

              <section className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Prix</label>
                  <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex: 1 200 000 MAD" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium">Adresse / Quartier</label>
                  <input value={locationText} onChange={(e) => setLocationText(e.target.value)} placeholder="Ex: Médina, Marrakech" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
              </section>

              <section className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Téléphone du vendeur</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex: +2126xxxxxxxx" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium">Chambres</label>
                  <input value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="Ex: 3" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium">Salles de bain</label>
                  <input value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Ex: 2" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Suites parentales</label>
                  <input value={suites} onChange={(e) => setSuites(e.target.value)} placeholder="Ex: 1" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium">Balcons</label>
                  <input value={balconies} onChange={(e) => setBalconies(e.target.value)} placeholder="Ex: 2" className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
                </div>
              </section>

              <section>
                <label className="text-sm font-medium">Description *</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Décrivez le bien, les points forts, la surface, etc." className="p-3 rounded border border-zinc-200 dark:border-zinc-700 bg-transparent w-full" />
              </section>

              <section>
                <label className="text-sm font-medium">Photos</label>
                <div className="mt-2 flex items-center gap-3">
                  <input type="file" accept="image/*" multiple onChange={onImageChange} aria-label="Ajouter des photos" />
                  <div className="text-sm text-zinc-500">(Vous pouvez ajouter plusieurs images. Aperçu ci-dessous.)</div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {images.length === 0 && <div className="text-zinc-500">Aucune photo ajoutée</div>}
                  {images.map((img) => (
                    <div key={img.url} className="relative">
                      <img src={img.url} className="w-full h-28 object-cover rounded" alt="aperçu" />
                      <button type="button" onClick={() => removeImage(img.url)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs">×</button>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <label className="text-sm font-medium">Emplacement sur la carte</label>
                <div className="mt-2 text-sm text-zinc-500 mb-2">Cliquez sur la carte pour définir l'emplacement exact du bien (ou utilisez la géolocalisation).</div>
                <div id="map" ref={mapRef} className="w-full h-72 rounded border border-zinc-200 dark:border-zinc-700" />
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Sélection: {latLng ? `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}` : "Aucun emplacement sélectionné"}</div>
              </section>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => { setTitle(""); setPrice(""); setLocationText(""); setDescription(""); setImages([]); setLatLng(null); }} className="px-4 py-2 rounded border border-zinc-200 dark:border-zinc-700">Effacer</button>
                <button type="submit" className="px-6 py-2 rounded bg-blue-600 text-white">Publier l'annonce</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
