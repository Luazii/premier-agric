'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import ServicesGrid from '../../components/ServicesGrid'
import HopeSection from '../../components/HopeSection'

export default function Services() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/service-1.jpg"
          alt="Premier Agric Services"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold font-display"
          >
            Empowering Farmers with Real Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            Every service we offer helps farmers work smarter, earn more, and farm sustainably.
          </motion.p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-700 leading-relaxed">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary font-display"
        >
          Developing Agriculture, Nurturing Futures
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg"
        >
          Farmers today face increasing costs, unpredictable weather, and shifting markets.  
          That’s why we design solutions that make your work easier, more efficient, and more profitable — 
          without compromising sustainability.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg"
        >
          Whether it’s through actionable insights, tailored training, or strategic guidance,  
          our goal is simple: to help you grow your yield, reduce waste, and strengthen your legacy in agriculture.
        </motion.p>
      </section>

      {/* SERVICES GRID */}
      <ServicesGrid />

      {/* CTA / Hope Section */}
      <HopeSection />
    </>
  )
}
