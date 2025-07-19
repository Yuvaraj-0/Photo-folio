import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <header
      className="min-h-screen w-screen bg-cover bg-center relative flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/heropic.jpg')" }}
      aria-label="Hero section with background image and call to action"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg tracking-tight animate-fade-in">
          Capturing Timeless Moments
        </h1>
        <nav aria-label="Primary">
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              to="/login"
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 font-semibold text-lg"
              aria-label="Book a photography session"
            >
              Private Album
            </Link>
            <Link
              to="/portfolio"
              className="bg-white text-black px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-lg border border-gray-300"
              aria-label="View photography portfolio"
            >
              View Portfolio
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
