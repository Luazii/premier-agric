'use client'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp
} from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ]

  const social = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/premieragric', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/premier_agric', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com/company/premier-agric', label: 'LinkedIn' }
  ]

  return (
    <footer className="bg-[#090B05] text-white pt-16 relative">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <img
            src="/images/logo.png"
            alt="Premier Agric Logo"
            className="h-10 w-auto mb-6"
          />
          <p className="text-gray-300 text-sm leading-relaxed">
            Premier Agric delivers sustainable agricultural solutions, drone mapping, and
            empowerment initiatives that help farmers grow smarter and stronger across Africa.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <a href="tel:+27-73-561-3851" className="flex items-center hover:text-[#FDE335]">
              <Phone className="w-4 h-4 mr-2 text-[#FDE335]" /> +27 73 561 3851
            </a>
            <a href="mailto:info@premieragric.co.za" className="flex items-center hover:text-[#FDE335]">
              <Mail className="w-4 h-4 mr-2 text-[#FDE335]" /> info@premieragric.co.za
            </a>
            <div className="flex items-start text-sm">
              <MapPin className="w-4 h-4 mr-2 text-[#FDE335] mt-0.5" />
              <p>Durban, KwaZulu-Natal, South Africa</p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            {social.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-[#688E3C] transition-all duration-200"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-[#FDE335]">Quick Links</h4>
          <nav className="space-y-2 text-sm">
            {quickLinks.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="block text-gray-300 hover:text-[#FDE335]"
              >
                {l.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h4 className="font-semibold mb-4 text-[#FDE335]">Stay Connected</h4>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe for agricultural insights, technology updates, and empowering stories from
            across the continent.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#FDE335] text-[#090B05] px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {year} Premier Agric. All rights reserved.</p>
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 hover:text-[#FDE335] transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
