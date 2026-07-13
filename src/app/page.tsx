export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 to-white dark:from-zinc-900 dark:to-black font-sans">
      <header className="w-full max-w-4xl flex justify-between items-center py-8 px-6">
        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">ImmoAgence</div>
        <nav className="flex gap-6 text-lg">
          <a href="/listings" className="hover:text-blue-500 dark:hover:text-blue-300">Properties</a>
          <a href="/about" className="hover:text-blue-500 dark:hover:text-blue-300">About</a>
          <a href="/contact" className="hover:text-blue-500 dark:hover:text-blue-300">Contact</a>
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-800 dark:text-blue-200 mb-6">Find Your Dream Home</h1>
        <p className="text-lg md:text-2xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl">
          Welcome to ImmoAgence, your trusted partner for buying, selling, and renting properties. Discover the best real estate deals tailored to your needs.
        </p>
        <a href="/listings" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition">Browse Properties</a>
      </main>
      <footer className="w-full py-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">
        &copy; {new Date().getFullYear()} ImmoAgence. All rights reserved.
      </footer>
    </div>
  );
}
