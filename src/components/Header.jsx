'use client'
import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()

  // Listen for scroll
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
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  // Determine if header should be transparent or always green
  const transparentPages = ['/', '/about', '/services']
  const isTransparentPage = transparentPages.includes(pathname)

  const showGreenBackground =
    !isTransparentPage || scrollY > 50 // always green except on transparent pages

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showGreenBackground
          ? 'bg-[#688E3C]/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/images/Logo.png"
              alt="Premier Agric Logo"
              className="h-14 w-auto object-contain"
              width={176}
              height={56}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-[#FDE335]'
                    : showGreenBackground
                    ? 'text-white hover:text-[#FDE335]'
                    : 'text-white hover:text-[#FDE335]'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/contact"
              className={`px-4 py-2 border rounded-md font-medium transition-colors duration-300 ${
                showGreenBackground
                  ? 'border-white text-white hover:bg-white hover:text-[#688E3C]'
                  : 'border-white text-white hover:bg-white hover:text-[#688E3C]'
              }`}
            >
              Get in Touch
            </a>
            <a
              href="tel:+27-73-561-3851"
              className={`px-4 py-2 rounded-md flex items-center font-medium transition-colors duration-300 ${
                showGreenBackground
                  ? 'bg-[#FDE335] text-[#090B05] hover:bg-yellow-400'
                  : 'bg-[#FDE335] text-[#090B05] hover:bg-yellow-400'
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
                  showGreenBackground ? 'text-white' : 'text-white'
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  showGreenBackground ? 'text-white' : 'text-white'
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`lg:hidden backdrop-blur-lg border-t transition-colors duration-300 ${
            showGreenBackground
              ? 'bg-[#688E3C]/95 border-[#577d31]'
              : 'bg-black/60 border-transparent'
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-lg font-medium transition-all ${
                  isActive(item.href)
                    ? 'text-[#FDE335]'
                    : 'text-white hover:text-[#FDE335]'
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Buttons inside mobile menu */}
            <div className="pt-4 space-y-3">
              <a
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center border border-white text-white rounded-md px-4 py-2 font-medium hover:bg-white hover:text-[#688E3C] transition-all"
              >
                Get in Touch
              </a>
              <a
                href="tel:+27-73-561-3851"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center rounded-md px-4 py-2 font-medium bg-[#FDE335] text-[#090B05] hover:bg-yellow-400 transition-all"
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
