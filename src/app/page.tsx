import Image from "next/image";

const featuredListings = [
  {
    city: "Marrakech",
    title: "Restored riad in the Medina",
    price: "2.45M MAD",
    tag: "Riad",
    beds: 4,
    baths: 3,
    area: "248 m²",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Casablanca",
    title: "Sea-view apartment in Anfa",
    price: "1.86M MAD",
    tag: "Apartment",
    beds: 3,
    baths: 2,
    area: "131 m²",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Rabat",
    title: "Minimal villa in Souissi",
    price: "6.9M MAD",
    tag: "Villa",
    beds: 5,
    baths: 4,
    area: "410 m²",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
];

const marketStats = [
  { label: "Active listings", value: "12.4k" },
  { label: "Average response", value: "8 min" },
  { label: "Verified agencies", value: "540" },
];

const filters = ["Marrakech", "Casablanca", "Rabat", "Tangier", "Villa", "Riad", "New builds"];

function DesktopMockup() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.16)]">
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="h-3 w-3 rounded-full bg-slate-300" />
        </div>
        <div className="ml-3 flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500">
          Search properties in Morocco
        </div>
      </div>

      <div className="grid gap-5 bg-slate-50 p-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Live search</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Find a home that fits the way Morocco actually lives.</h3>
            </div>
            <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">Premium</div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">City</p>
              <p className="mt-2 text-sm font-medium text-slate-950">Marrakech</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Type</p>
              <p className="mt-2 text-sm font-medium text-slate-950">Riad + villa</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Budget</p>
              <p className="mt-2 text-sm font-medium text-slate-950">Up to 3M MAD</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <span
                key={filter}
                className={`rounded-full px-3 py-1.5 text-sm transition ${index === 0 ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {featuredListings.map((listing) => (
              <article key={listing.title} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                <Image src={listing.image} alt={listing.title} width={1200} height={800} className="h-36 w-full object-cover" unoptimized />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{listing.tag}</span>
                    <span className="text-sm font-semibold text-slate-950">{listing.price}</span>
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-slate-950">{listing.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">{listing.city}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-500">
                    <span>{listing.beds} beds</span>
                    <span>{listing.baths} baths</span>
                    <span>{listing.area}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Market pulse</p>
            <div className="mt-4 space-y-4">
              {marketStats.map((stat) => (
                <div key={stat.label} className="flex items-end justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-slate-300">{stat.label}</span>
                  <span className="text-2xl font-semibold tracking-tight">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Saved searches</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">Private shortlist</p>
              </div>
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700">12 matches</div>
            </div>
            <div className="mt-4 space-y-3">
              {["Riads in Marrakech", "Apartments near the Corniche", "Family villas in Rabat"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                  <span className="text-sm text-slate-700">{item}</span>
                  <span className="text-xs font-medium text-slate-500">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto w-full max-w-97.5 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
      <div className="h-7 bg-slate-950" />
      <div className="border-b border-slate-200 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Search</p>
        <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Marrakech, riads, under 3M MAD
        </div>
      </div>

      <div className="space-y-4 bg-[#f8fafc] px-4 py-4">
        <div className="rounded-[26px] bg-slate-950 p-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Featured today</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Riad collections tuned for mobile browsing.</h3>
        </div>

        {featuredListings.slice(0, 2).map((listing) => (
          <article key={listing.title} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
            <Image src={listing.image} alt={listing.title} width={1200} height={800} className="h-44 w-full object-cover" unoptimized />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{listing.city}</p>
                  <h4 className="mt-1 text-base font-semibold text-slate-950">{listing.title}</h4>
                </div>
                <span className="text-sm font-semibold text-slate-950">{listing.price}</span>
              </div>
              <div className="mt-3 flex gap-2 text-xs text-slate-500">
                <span>{listing.beds} beds</span>
                <span>•</span>
                <span>{listing.baths} baths</span>
                <span>•</span>
                <span>{listing.area}</span>
              </div>
            </div>
          </article>
        ))}

        <div className="grid grid-cols-2 gap-3">
          {filters.slice(0, 4).map((filter, index) => (
            <div
              key={filter}
              className={`rounded-2xl px-3 py-3 text-center text-sm font-medium ${index === 1 ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_55%,#eef4f8_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-160 bg-[linear-gradient(135deg,rgba(15,23,42,0.04),transparent_40%)]" />

      <section className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Morocco real estate platform</p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Search homes with a calmer, more premium lens.
            </h1>
            <p className="mt-5 max-w-[58ch] text-base leading-7 text-slate-600 sm:text-lg">
              A modern marketplace for riads, apartments, and villas across Morocco, designed for fast searching, clear comparison, and trusted discovery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-px hover:bg-slate-800 active:translate-y-px">
                Explore listings
              </button>
              <button className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-px hover:border-slate-400 hover:text-slate-950 active:translate-y-px">
                View marketplace
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {marketStats.map((stat) => (
                <div key={stat.label} className="rounded-[22px] border border-slate-200 bg-white/85 p-4 backdrop-blur">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-full bg-sky-300/30 blur-3xl lg:block" />
            <div className="absolute right-0 top-0 hidden h-36 w-36 rounded-full bg-slate-400/20 blur-3xl lg:block" />
            <div className="space-y-5 lg:space-y-6">
              <DesktopMockup />
              <div className="grid items-start gap-5 lg:absolute lg:-bottom-16 lg:-left-8 lg:max-w-107.5 lg:gap-0">
                <div className="rounded-[26px] border border-slate-200 bg-white/90 p-4 shadow-[0_22px_55px_rgba(15,23,42,0.12)] backdrop-blur lg:hidden">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Mobile preview</p>
                  <div className="mt-3">
                    <MobileMockup />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <MobileMockup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Filters</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Refine by city, property type, and budget without losing momentum.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              The interface favors quick decisions: strong photo hierarchy, compact filters, and enough room for comparison on both desktop and mobile.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_22px_60px_rgba(15,23,42,0.08)] sm:p-5">
            <div className="grid gap-3 md:grid-cols-[1.1fr_0.8fr_0.8fr_auto]">
              <label className="grid gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Location</span>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Marrakech, Casablanca...</div>
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Type</span>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">Villa / riad</div>
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Budget</span>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">1M - 5M MAD</div>
              </label>
              <button className="mt-auto rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-px hover:bg-slate-800 active:translate-y-px">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Featured homes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A curated selection with strong visual hierarchy.</h2>
          </div>
          <p className="hidden max-w-sm text-sm leading-6 text-slate-600 lg:block">
            Cards are intentionally roomy so image, price, and key property facts are easy to scan without looking like a generic template.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (
            <article key={listing.title} className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
              <div className="relative">
                <Image src={listing.image} alt={listing.title} width={1200} height={800} className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]" unoptimized />
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                  {listing.city}
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                  {listing.tag}
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950">{listing.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{listing.area} • {listing.beds} beds • {listing.baths} baths</p>
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-slate-950">{listing.price}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500">
                  <span>Concierge verified</span>
                  <span className="text-slate-900">View details</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}