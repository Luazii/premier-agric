'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()
  const { isSignedIn } = useUser()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === href
    return pathname.startsWith(href)
  }

  const isOverlayPage = pathname === '/'
  const isSolid = !isOverlayPage || scrollY > 36

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[60] transition-all duration-500 bg-transparent"
      >
        <div className="relative z-[70] mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:h-24 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/Logo.png"
              alt="Premier Agric Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                isMenuOpen ? 'h-8 md:h-10' : 'h-12 md:h-14'
              }`}
              width={176}
              height={56}
            />
            {isMenuOpen && (
              <span className="font-display text-xl font-semibold tracking-wide text-white transition-opacity duration-300">
                Premier Agric
              </span>
            )}
          </Link>

          <div className="flex items-center gap-4 relative z-[80]">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button
                  className={`editorial-link text-sm ${
                    isMenuOpen ? 'text-white' : isSolid ? 'text-[var(--forest)]' : 'text-white'
                  }`}
                  type="button"
                >
                  SIGN IN
                </button>
              </SignInButton>
            )}
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`editorial-link ${
                isMenuOpen ? 'text-white' : isSolid ? 'text-[var(--forest)]' : 'text-white'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              type="button"
            >
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] transition-all duration-500 ${
          isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[#061b0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,179,75,0.16),transparent_28%)]" />

        <div className="relative flex min-h-[100dvh] flex-col justify-center px-6 py-20 text-[var(--surface)] md:px-8 md:py-24">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-5 md:gap-8">
            {navigation.map((item, index) => {
              if (item.name === 'Contact') {
                return (
                  <div
                    key={item.name}
                    className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 md:gap-8"
                    style={{ transitionDelay: isMenuOpen ? `${index * 40}ms` : '0ms' }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-display text-[clamp(1.8rem,4.8vw,4rem)] leading-[0.92] transition duration-300 ${
                        isActive(item.href)
                          ? 'text-[var(--gold)]'
                          : 'text-white hover:text-[var(--gold)]'
                      }`}
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-row items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-white/50 font-sans tracking-wide">
                      <a href="tel:+27735613851" className="hover:text-[var(--gold)] transition duration-200">
                        +27 73 561 3851
                      </a>
                      <span className="text-white/20">|</span>
                      <a href="mailto:info@premieragric.co.za" className="hover:text-[var(--gold)] transition duration-200">
                        info@premieragric.co.za
                      </a>
                    </div>
                  </div>
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b border-white/10 pb-4 font-display text-[clamp(1.8rem,4.8vw,4rem)] leading-[0.92] transition duration-300 ${
                    isActive(item.href)
                      ? 'text-[var(--gold)]'
                      : 'text-white hover:text-[var(--gold)]'
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 40}ms` : '0ms' }}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
