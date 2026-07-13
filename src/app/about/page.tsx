export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4 py-16">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-200 mb-4">About ImmoAgence</h1>
      <p className="max-w-2xl text-lg text-zinc-700 dark:text-zinc-300 mb-6 text-center">
        ImmoAgence is a leading real estate agency dedicated to helping you find your perfect property. With years of experience and a passion for service, we connect buyers, sellers, and renters with the best opportunities in the market.
      </p>
      <ul className="list-disc text-zinc-600 dark:text-zinc-400 text-left max-w-xl">
        <li>Expert agents with local knowledge</li>
        <li>Wide range of properties</li>
        <li>Personalized service</li>
        <li>Trusted by hundreds of clients</li>
      </ul>
    </div>
  );
}
