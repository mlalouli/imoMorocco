const values = [
  {
    title: "Curated inventory",
    text: "We present riads, apartments, and villas with enough detail to compare quickly and confidently.",
  },
  {
    title: "Local expertise",
    text: "The platform is shaped around the way buyers actually search in Marrakech, Casablanca, Rabat, and Tangier.",
  },
  {
    title: "Trust first",
    text: "Concise presentation, clear contact paths, and a calmer interface help reduce noise in the buying process.",
  },
];

const cities = [
  { name: "Marrakech", count: "320+ listings" },
  { name: "Casablanca", count: "540+ listings" },
  { name: "Rabat", count: "210+ listings" },
  { name: "Tangier", count: "180+ listings" },
];

export default function About() {
  return (
    <main className="bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_34%),linear-gradient(180deg,#f8fafc_0%,#ffffff_52%,#eef4f8_100%)] text-slate-950">
      <section className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">About ImmoAgence</p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              A calmer way to explore Moroccan real estate.
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-7 text-slate-600 sm:text-lg">
              ImmoAgence is built as a premium marketplace for discovering homes across Morocco. The experience focuses on clarity, visual balance, and trust so buyers can compare properties without friction.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "12k+", label: "active listings" },
                { value: "540", label: "verified agencies" },
                { value: "8 min", label: "average response" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur">
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">What we optimize for</p>
              <div className="mt-5 space-y-4">
                {values.map((value) => (
                  <div key={value.title} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <h2 className="text-lg font-semibold tracking-tight">{value.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:grid-cols-2">
              {cities.map((city) => (
                <div key={city.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-base font-semibold text-slate-950">{city.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{city.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}