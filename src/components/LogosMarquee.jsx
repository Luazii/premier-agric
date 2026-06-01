'use client'

import { motion } from 'framer-motion'

export default function LogosMarquee() {
  const baseLogos = [
    '/images/partners/ADA-LOGO-.png',
    '/images/partners/Agriseta.png',
    '/images/partners/Logo Everpix transparent.png',
    '/images/partners/Ngcebo consulting Logo.jpg',
    '/images/partners/badger logo.png',
    '/images/partners/coretech_logo.png',
    '/images/partners/dept of agric.jpg',
    '/images/partners/fpnmsetalogo.jpeg',
    '/images/partners/grainhills_logo_01.png',
    '/images/partners/irish tech challenge.jpg',
    '/images/partners/llamalogo.png',
    '/images/partners/seda-transparent.png',
    '/images/partners/tholowethu logo.png',
    '/images/partners/web_0002_Mlab-Grey.jpg'
  ]
  // Duplicate array multiple times to ensure enough width for a seamless infinite scroll
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos]

  return (
    <section className="border-y border-[var(--line)] bg-[var(--surface-soft)] py-20 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center px-6 md:px-8 mb-10 md:mb-14">
        <p className="eyebrow text-[var(--ink-muted)]">Trusted by industry leaders</p>
      </div>
      <div className="relative flex w-full opacity-70 grayscale">
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
        >
          {logos.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="px-8 md:px-16 shrink-0 flex items-center justify-center min-w-[120px]"
            >
              <img
                src={encodeURI(logo)}
                alt="Partner Logo"
                className="h-12 md:h-16 w-auto object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
