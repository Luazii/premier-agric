'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LogosMarquee() {
  const baseLogos = [
    { src: '/images/partners/ADA-LOGO-.png', url: 'https://ada-kzn.co.za/' },
    { src: '/images/partners/Agriseta.png', url: 'https://www.agriseta.co.za/' },
    { src: '/images/partners/Logo Everpix transparent.png', url: 'https://africanoilsbyeverpix.co.za/' },
    { src: '/images/partners/Ngcebo consulting Logo.jpg', url: 'https://ngceboconsulting.co.za/' },
    { src: '/images/partners/badger logo.png', url: 'https://badgeranalytics.co.za/' },
    { src: '/images/partners/coretech_logo.png', url: 'https://coretech.co.za/' },
    { src: '/images/partners/dept of agric.jpg', url: 'https://www.nda.gov.za/' },
    { src: '/images/partners/fpnmsetalogo.jpeg', url: 'https://www.fpmseta.org.za/' },
    { src: '/images/partners/grainhills_logo_01.png', url: 'https://grainhills.co.za/' },
    { src: '/images/partners/irish tech challenge.jpg', url: 'https://tshimologong.joburg/incubation-acceleration/irish-tech-challenge/' },
    { src: '/images/partners/llamalogo.png', url: 'https://about.fb.com/news/2025/06/accelerating-open-source-innovation-across-sub-saharan-africa-introducing-the-llama-impact-accelerator-program/' },
    { src: '/images/partners/seda-transparent.png', url: 'https://www.dsbd.gov.za/small-enterprise-development-agency-seda' },
    { src: '/images/partners/tholowethu logo.png', url: '#' },
    { src: '/images/partners/web_0002_Mlab-Grey.jpg', url: 'https://mlab.co.za/' }
  ]
  // Duplicate array multiple times to ensure enough width for a seamless infinite scroll
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos]

  return (
    <section className="border-y border-[var(--line)] bg-white py-20 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center px-6 md:px-8 mb-10 md:mb-14">
        <p className="eyebrow text-[var(--ink-muted)]">Trusted by industry leaders</p>
      </div>
      <div className="relative flex w-full">
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
        >
          {logos.map((logo, i) => (
            <Link
              href={logo.url}
              target={logo.url !== '#' ? '_blank' : undefined}
              rel={logo.url !== '#' ? 'noopener noreferrer' : undefined}
              key={`${logo.src}-${i}`}
              className="px-8 md:px-16 shrink-0 flex items-center justify-center min-w-[120px] transition-transform hover:scale-105"
            >
              <Image
                src={encodeURI(logo.src)}
                alt="Partner Logo"
                width={160}
                height={64}
                className="h-12 md:h-16 w-auto object-contain mix-blend-multiply"
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
