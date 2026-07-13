export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4 py-16">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-200 mb-4">Contact Us</h1>
      <p className="max-w-2xl text-lg text-zinc-700 dark:text-zinc-300 mb-8 text-center">
        Have questions or want to schedule a visit? Fill out the form below or reach out to us directly.
      </p>
      <form className="w-full max-w-md bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg shadow-md flex flex-col gap-4">
        <input className="p-3 rounded border border-zinc-300 dark:border-zinc-700" type="text" placeholder="Your Name" required />
        <input className="p-3 rounded border border-zinc-300 dark:border-zinc-700" type="email" placeholder="Your Email" required />
        <textarea className="p-3 rounded border border-zinc-300 dark:border-zinc-700" placeholder="Your Message" rows={4} required />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition">Send Message</button>
      </form>
    </div>
  );
}
