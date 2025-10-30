import Image from 'next/image';
import Header from './Header';

export default function Hero() {
  return (
    <div className="relative h-[62vh] min-h-[420px] w-full">
      <Image src="/images/hero.jpg" alt="hero" fill className="object-cover" priority/>
      <div className="absolute inset-0 bg-black/35"></div>

      <div className="absolute inset-0 flex flex-col">
        <Header />
        <div className="max-w-6xl mx-auto px-6 flex-1 flex items-end">
          <div className="mb-12 p-8 rounded-2xl max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white hero-title leading-tight">PREMIER AGRIC</h1>
            <p className="mt-4 text-white/90 max-w-xl">Sustainable agriculture | Drone & remote sensing | Data as a Service — helping farmers make better decisions.</p>
            <div className="mt-6 flex gap-3">
              <a href="/services" className="inline-block px-4 py-2 rounded-md bg-bright text-black font-semibold shadow">Our Services</a>
              <a href="/portfolio" className="inline-block px-4 py-2 rounded-md border border-white/25 text-white">See Work</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
