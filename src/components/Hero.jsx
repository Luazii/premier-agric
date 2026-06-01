'use client'

import { motion } from 'framer-motion'
import { ArrowRight, PhoneCall } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden bg-[var(--surface-deep)] text-[var(--surface-soft)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,27,14,0.8)] via-[rgba(6,27,14,0.62)] to-[rgba(6,27,14,0.88)]" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 pb-24 pt-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6 text-[var(--gold)]">Cultivating strategic excellence</p>
          <h1 className="max-w-4xl text-[clamp(3.6rem,10vw,7rem)] leading-[0.9] text-[var(--surface)]">
            Grow Smarter.
            <br />
            Farm Better.
            <br />
            Earn More.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/88 md:text-xl">
            Are rising input costs, unpredictable yields, or climate pressure making farming harder each season? We help farmers and partners turn uncertainty into measurable growth.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="editorial-link inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-8 py-4 font-semibold text-[var(--surface-deep)]"
            >
              Answer 3 quick questions
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/services"
              className="editorial-link inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 px-8 py-4 text-white"
            >
              <PhoneCall className="h-4 w-4" />
              Explore solutions
            </a>
          </div>
        </motion.div>


      </div>
    </section>
  )
}
