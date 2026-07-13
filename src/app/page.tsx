import Link from "next/link";

const featuredHomes = [
  {
    title: "Riad lumineux",
    city: "Marrakech Medina",
    price: "2 500 000 MAD",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Appartement ocean",
    city: "Casablanca Corniche",
    price: "1 800 000 MAD",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Villa avec jardin",
    city: "Rabat Souissi",
    price: "6 500 000 MAD",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80",
  },
];

const highlights = [
  { value: "120+", label: "biens verifies" },
  { value: "8", label: "villes couvertes" },
  { value: "24h", label: "reponse moyenne" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] text-zinc-950">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(10, 20, 22, 0.86), rgba(10, 20, 22, 0.42)), url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="mx-auto grid min-h-[660px] max-w-6xl items-end gap-10 px-4 pb-10 pt-24 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:pb-16">
          <div className="max-w-3xl text-white">
            <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Immobilier au Maroc, simple et selectif
            </p>
            <h1 className="text-5xl font-black leading-[1.02] md:text-7xl">
              Trouvez une adresse qui change votre quotidien.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              Explorez des appartements, villas et riads choisis pour leur
              emplacement, leur potentiel et leur qualite de vie.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 text-base font-bold text-white shadow-xl shadow-emerald-950/20 transition hover:bg-emerald-400"
              >
                Voir les annonces
              </Link>
              <Link
                href="/seller/add"
                className="inline-flex items-center justify-center rounded-md border border-white/35 bg-white/10 px-6 py-3 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Ajouter un bien
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/20 bg-white/92 p-4 shadow-2xl backdrop-blur md:p-5">
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                  Ville
                </label>
                <div className="mt-2 rounded-md border border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-900">
                  Casablanca
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                  Type
                </label>
                <div className="mt-2 rounded-md border border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-900">
                  Villa, riad, appartement
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                  Budget
                </label>
                <div className="mt-2 rounded-md border border-zinc-200 bg-white px-4 py-3 font-semibold text-zinc-900">
                  A partir de 900 000 MAD
                </div>
              </div>
            </div>
            <Link
              href="/listings"
              className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-zinc-950 px-5 py-3 font-bold text-white transition hover:bg-zinc-800"
            >
              Lancer la recherche
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 md:grid-cols-3 md:px-6">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="border-l-4 border-emerald-500 bg-white px-6 py-5 shadow-sm"
          >
            <div className="text-3xl font-black text-zinc-950">
              {item.value}
            </div>
            <div className="mt-1 text-sm font-medium text-zinc-600">
              {item.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-rose-700">
              Selection du moment
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">
              Des biens avec du caractere
            </h2>
          </div>
          <Link
            href="/listings"
            className="font-bold text-emerald-700 transition hover:text-emerald-600"
          >
            Tout parcourir
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredHomes.map((home) => (
            <Link
              key={home.title}
              href="/listings"
              className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
                <div
                  aria-label={home.title}
                  role="img"
                  className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${home.image})` }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">{home.title}</h3>
                    <p className="mt-1 text-sm font-medium text-zinc-600">
                      {home.city}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    New
                  </span>
                </div>
                <p className="mt-5 text-lg font-black text-emerald-700">
                  {home.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 px-4 py-14 text-white md:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">
              Acheteurs et vendeurs
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">
              Une experience plus fluide des deux cotes.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/buyer"
              className="rounded-lg border border-white/10 bg-white/8 p-6 transition hover:bg-white/14"
            >
              <h3 className="text-xl font-black">Je cherche</h3>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Suivez vos favoris et avancez vite vers les biens qui matchent
                votre projet.
              </p>
            </Link>
            <Link
              href="/seller"
              className="rounded-lg border border-white/10 bg-white/8 p-6 transition hover:bg-white/14"
            >
              <h3 className="text-xl font-black">Je vends</h3>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Publiez votre annonce avec une presentation claire et des
                contacts directs.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
