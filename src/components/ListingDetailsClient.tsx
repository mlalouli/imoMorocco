"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ListingDetailsClient({ id }: { id: string }) {
  // undefined = loading, null = not found, object = listing
  const [item, setItem] = useState<any | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resolvedCoords, setResolvedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const router = useRouter();
  const params = useParams<{ id?: string | string[] }>();
  const routeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const listingId = String(routeId || id || "");

  useEffect(() => {
    try {
      console.debug("ListingDetailsClient: looking for id", listingId);
      const raw = localStorage.getItem("immo_seller_listings") || "[]";
      const parsed = JSON.parse(raw);
      console.debug("ListingDetailsClient: stored listings count", Array.isArray(parsed) ? parsed.length : 0, parsed);
      let found: any | undefined = undefined;
      if (Array.isArray(parsed)) {
        found = parsed.find((p: any) => {
          // try flexible matching: string match, numeric match, or deep equality
          try {
            if (String(p.id) === listingId) return true;
            if (typeof p.id === "number" && Number(listingId) === p.id) return true;
            if (typeof p.id === "string" && Number(p.id) === Number(listingId)) return true;
          } catch (e) {
            // ignore
          }
          return false;
        });
      }
      if (found) {
        console.debug("ListingDetailsClient: found listing", found);
        setItem(found);
        return;
      }
    } catch (e) {
      console.error("ListingDetailsClient: error reading localStorage", e);
    }

    // fallback: try sample properties
    const samples = [
      { id: "sample-1", title: "Riad Traditionnel à Marrakech", location: "Marrakech, Médina", price: "2 500 000 MAD", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", description: "Magnifique riad rénové..." },
      { id: "sample-2", title: "Appartement Moderne avec Vue Mer", location: "Casablanca, Corniche", price: "1 800 000 MAD", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80", description: "Appartement lumineux..." },
      { id: "sample-3", title: "Villa de Luxe avec Jardin", location: "Rabat, Souissi", price: "6 500 000 MAD", image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80", description: "Superbe villa contemporaine..." },
    ];
    const matchedSample = samples.find((s) => String(s.id) === listingId);
    if (matchedSample) {
      setItem(matchedSample);
      return;
    }

    const s = samples.find((sample) => String(sample.id) === String(id));
    if (s) {
      setItem(s);
      return;
    }

    // not found
    setItem(null);
  }, [id, listingId]);

  useEffect(() => {
    let cancelled = false;

    async function resolveLocation() {
      if (!item) {
        setResolvedCoords(null);
        return;
      }

      if (item.latLng?.lat && item.latLng?.lng) {
        setResolvedCoords({ lat: item.latLng.lat, lng: item.latLng.lng });
        return;
      }

      const query = item.locationText || item.location;
      if (!query) {
        setResolvedCoords(null);
        return;
      }

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`, {
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          setResolvedCoords(null);
          return;
        }

        const results: Array<{ lat: string; lon: string }> = await response.json();
        if (!cancelled && results[0]) {
          setResolvedCoords({ lat: Number(results[0].lat), lng: Number(results[0].lon) });
          return;
        }
      } catch (error) {
        console.warn("Failed to resolve listing location", error);
      }

      if (!cancelled) {
        setResolvedCoords(null);
      }
    }

    resolveLocation();

    return () => {
      cancelled = true;
    };
  }, [item]);

  useEffect(() => {
    if (!resolvedCoords || !mapRef.current) return;

    let active = true;
    const existingLink = document.querySelector('link[data-leaflet="listing-details"]') as HTMLLinkElement | null;

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.dataset.leaflet = "listing-details";
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector('script[data-leaflet="listing-details"]') as HTMLScriptElement | null;

    const initMap = () => {
      if (!active || !mapRef.current) return;

      // @ts-ignore
      const L = window.L;
      if (!L) return;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([resolvedCoords.lat, resolvedCoords.lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstanceRef.current);
      } else {
        mapInstanceRef.current.setView([resolvedCoords.lat, resolvedCoords.lng], 13);
      }

      if (markerRef.current) {
        markerRef.current.setLatLng([resolvedCoords.lat, resolvedCoords.lng]);
      } else {
        markerRef.current = L.marker([resolvedCoords.lat, resolvedCoords.lng]).addTo(mapInstanceRef.current);
      }
    };

    if (existingScript) {
      if ((window as any).L) {
        initMap();
      } else {
        existingScript.addEventListener("load", initMap, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.dataset.leaflet = "listing-details";
      script.onload = initMap;
      document.body.appendChild(script);
    }

    return () => {
      active = false;
    };
  }, [resolvedCoords]);

  if (item === undefined) return (
    <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  );

  if (item === null) {
    // show helpful debug info so the user can see what is stored locally
    let stored: any[] = [];
    try {
      stored = JSON.parse(localStorage.getItem("immo_seller_listings") || "[]");
    } catch (e) {
      // ignore
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-xl font-semibold mb-2">Annonce introuvable</div>
        <div className="text-sm text-zinc-600 mb-4">L'annonce demandée est introuvable localement. Assurez-vous qu'elle a bien été publiée depuis votre espace vendeur.</div>
        <div className="w-full max-w-3xl bg-zinc-50 dark:bg-zinc-900 p-4 rounded">
          <div className="font-medium mb-2">Debug: contenus locaux ({stored.length})</div>
          {stored.length === 0 ? (
            <div className="text-sm text-zinc-500">Aucune annonce locale trouvée.</div>
          ) : (
            <ul className="text-sm text-zinc-700 space-y-2 max-h-40 overflow-auto">
              {stored.slice(0, 20).map((s: any, i: number) => (
                <li key={i} className="flex justify-between">
                  <span>{String(s.id)} — {s.title || s.locationText || s.location || '(no title)'}</span>
                  <span className="text-zinc-500">{typeof s.id}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  const mainImage = selectedImage || (item.images && item.images.length > 0 ? item.images[0] : item.image) || "https://via.placeholder.com/800x450";
  const addressLabel = item.locationText || item.location || "Address not provided";

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: item.title, text: item.description?.slice(0, 140), url: window.location.href });
      } catch (e) {
        /* ignore */
      }
    } else {
      // fallback: copy URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("URL copiée dans le presse-papier");
      } catch (e) {
        console.warn("Échec de la copie du lien", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <button onClick={() => router.back()} className="mb-2 text-sm text-blue-600">← Retour</button>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{item.title}</h1>
            <div className="text-zinc-600">{addressLabel}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-extrabold text-blue-600">{item.price}</div>
            <div className="mt-2 flex gap-2 justify-end">
              {item.phone && (
                <a href={`tel:${item.phone}`} className="px-3 py-2 bg-green-600 text-white rounded">Contact: {item.phone}</a>
              )}
              <button onClick={onShare} className="px-3 py-2 border rounded">Partager</button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded overflow-hidden">
              <img src={mainImage} className="w-full h-80 md:h-96 object-cover rounded" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(item.images && item.images.length > 0 ? item.images : [item.image]).map((src: string, i: number) => (
                <button key={i} onClick={() => setSelectedImage(src)} className={`overflow-hidden rounded ${mainImage === src ? 'ring-2 ring-blue-500' : ''}`}>
                  <img src={src} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded">
              <h3 className="font-semibold">Détails</h3>
              <ul className="text-sm text-zinc-700 mt-2 space-y-1">
                {item.bedrooms && <li>Chambres: {item.bedrooms}</li>}
                {item.bathrooms && <li>Salles de bain: {item.bathrooms}</li>}
                {item.suites && <li>Suites parentales: {item.suites}</li>}
                {item.balconies && <li>Balcons: {item.balconies}</li>}
                {resolvedCoords && <li>Position: {resolvedCoords.lat.toFixed(5)}, {resolvedCoords.lng.toFixed(5)}</li>}
                {item.createdAt && <li>Publié: {new Date(item.createdAt).toLocaleString()}</li>}
              </ul>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded">
              <h3 className="font-semibold">Adresse</h3>
              <div className="text-sm text-zinc-700 mt-2">{addressLabel}</div>
              <div className="mt-3 overflow-hidden rounded border border-zinc-200 dark:border-zinc-700">
                {resolvedCoords ? (
                  <div ref={mapRef} className="h-64 w-full" />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-800">
                    Map unavailable for this listing.
                  </div>
                )}
              </div>
            </div>

            {item.seller && (
              <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded">
                <h3 className="font-semibold">Vendeur</h3>
                <div className="text-sm text-zinc-700">{item.seller.name || item.seller.email}</div>
                {item.seller.email && <div className="text-sm text-zinc-700">{item.seller.email}</div>}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-zinc-700">
          {String(item.description).split(/\n\n|\r\n\r\n|\n/).map((p: string, i: number) => (
            <p key={i} className="mb-3">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
