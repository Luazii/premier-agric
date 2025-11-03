'use client'
import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' }
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? 'bg-[#688E3C]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
<a href="/" className="flex items-center">
  <img
    src="/images/logo.png"
    alt="Premier Agric Logo"
    className="h-14 w-auto object-contain" // Changed h-10 to h-12
    width={176}                             // Changed 140 to 168
    height={56}                              // Changed 40 to 48
  />
</a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#FDE335]'
                    : scrollY > 50
                      ? 'text-white hover:text-[#FDE335]'
                      : 'text-white hover:text-[#688E3C]'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/contact"
              className={`px-4 py-2 border rounded-md font-medium transition-colors duration-300 ${
                scrollY > 50
                  ? 'border-white text-white hover:bg-white hover:text-[#688E3C]'
                  : 'border-[#688E3C] text-[#688E3C] hover:bg-[#688E3C] hover:text-white'
              }`}
            >
              Get in Touch
            </a>
            <a
              href="tel:+27-73-561-3851"
              className={`px-4 py-2 rounded-md flex items-center font-medium transition-colors duration-300 ${
                scrollY > 50
                  ? 'bg-[#FDE335] text-[#090B05] hover:bg-yellow-400'
                  : 'bg-[#688E3C] text-white hover:bg-[#577d31]'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" /> Call Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  // Logic change: Icon is always white when menu is open
                  isMenuOpen || scrollY > 50 ? 'text-white' : 'text-[#090B05]'
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  scrollY > 50 ? 'text-white' : 'text-[#090B05]'
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden backdrop-blur-lg border-t transition-colors duration-300 ${
            // --- CHANGE 1 ---
            // Removed conditional. Mobile menu background is now ALWAYS green.
            'bg-[#688E3C]/95 border-[#577d31]'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block text-lg font-medium transition-colors ${
                  // --- CHANGE 2 ---
                  // Simplified text color. It's now ALWAYS light.
                  isActive(item.href)
                    ? 'text-[#FDE335]'
                    : 'text-white hover:text-[#FDE335]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="/contact"
                className={`block text-center border rounded-md px-4 py-2 font-medium transition-colors duration-300 ${
                  // --- CHANGE 3 ---
                  // Simplified button color. It's now ALWAYS the light version.
                  'border-white text-white hover:bg-white hover:text-[#688E3C]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Get in Touch
              </a>
              <a
                href="tel:+27-73-561-3851"
                className={`block text-center rounded-md px-4 py-2 font-medium transition-colors duration-300 ${
                  // --- CHANGE 4 ---
                  // Simplified button color. It's now ALWAYS the yellow version.
                  'bg-[#FDE335] text-[#090B05] hover:bg-yellow-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2 inline" /> Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}