'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Header from '../../components//Header'

import ServicesGrid from '../../components/ServicesGrid'
import HopeSection from '../../components/HopeSection'

export default function Services() {
  return (
    <>
      <Header />

      {/* Hero Section */}
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            Growing innovation. Empowering people. Building a sustainable tomorrow.
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-700 leading-relaxed">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary font-display"
        >
          Nurturing Agriculture, Empowering Futures
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg"
        >
          At Premier Agric, we’re more than a service provider — we’re partners in
          purpose. Our work bridges innovation with compassion, ensuring that every
          farmer, cooperative, and agribusiness has the support to thrive in a changing
          world.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg"
        >
          From strategic agribusiness consulting to hands-on training and precision data
          services, our goal is to make agriculture more efficient, profitable, and
          sustainable — while keeping people and planet at the heart of everything we do.
        </motion.p>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      <HopeSection /> 
   
      
         </>
  )
}
