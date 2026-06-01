'use client'

import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp,
} from 'lucide-react'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ]

  const social = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com/premieragric', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com/premier_agric', label: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com/company/premier-agric', label: 'LinkedIn' },
  ]

  return (
    <footer className="section-frame relative overflow-hidden bg-[var(--surface-deep)] pt-16 text-[var(--surface-soft)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-12 md:grid-cols-[1.3fr_0.8fr_1fr] md:px-8">
        <div>
          <img
            src="/images/Logo.png"
            alt="Premier Agric Logo"
            className="mb-6 h-10 w-auto"
          />
          <p className="max-w-md text-sm leading-7 text-[rgba(255,255,255,0.68)]">
            Premier Agric delivers sustainable agricultural solutions, drone mapping, and empowerment initiatives that help farmers grow smarter and stronger across Africa.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <a href="tel:+27-73-561-3851" className="flex items-center hover:text-[var(--gold)]">
              <Phone className="mr-2 h-4 w-4 text-[var(--gold)]" /> +27 73 561 3851
            </a>
            <a href="mailto:info@premieragric.co.za" className="flex items-center hover:text-[var(--gold)]">
              <Mail className="mr-2 h-4 w-4 text-[var(--gold)]" /> info@premieragric.co.za
            </a>
            <div className="flex items-start text-sm">
              <MapPin className="mr-2 mt-0.5 h-4 w-4 text-[var(--gold)]" />
              <p>Durban, KwaZulu-Natal, South Africa</p>
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            {social.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4 text-[var(--gold)]">Quick Links</p>
          <nav className="space-y-3">
            {quickLinks.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="block text-[rgba(255,255,255,0.76)] hover:text-[var(--gold)]"
              >
                {l.name}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="eyebrow mb-4 text-[var(--gold)]">Stay Connected</p>
          <p className="mb-4 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
            Subscribe for agricultural insights, technology updates, and empowering stories from across the continent.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[var(--surface-soft)] placeholder:text-[rgba(246,241,230,0.45)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--gold)] px-4 py-3 font-semibold text-[var(--surface-deep)] hover:brightness-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-[rgba(246,241,230,0.48)] sm:flex-row md:px-8">
          <p>&copy; 2026 Premier Agric. All rights reserved.</p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 hover:text-[var(--gold)]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
