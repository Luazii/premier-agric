'use client'

import { motion } from 'framer-motion'
import { Map, Briefcase, GraduationCap, RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const approaches = [
    {
      icon: <Map className="h-6 w-6 text-[var(--gold)]" />,
      title: 'Precision Mapping & Data Insights',
      description: 'See your operation clearly. Identify crop stress, irrigation inefficiencies, and yield potential before they affect results — using drone mapping, satellite data, and spatial analytics.',
    },
    {
      icon: <Briefcase className="h-6 w-6 text-[var(--gold)]" />,
      title: 'Business Model Design & Enterprise Development',
      description: 'Move from vision to profitability. We help you design scalable, viable business models that align people, processes, and performance for long-term success.',
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-[var(--gold)]" />,
      title: 'Hands-On Training & Capacity Building',
      description: 'Equip your teams — from farmers and youth to field staff — with practical skills that boost confidence, efficiency, and output. Our programs bridge knowledge gaps with real-world experience.',
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-[var(--gold)]" />,
      title: 'End-to-End Support',
      description: 'From concept and design through monitoring, evaluation, and scaling — we walk with you every step of the way. Because transformation doesn’t end at strategy; it thrives through partnership.',
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <main className="overflow-x-hidden bg-[var(--surface)] pt-32">
      {/* Hero Section */}
      <section className="mx-auto mb-32 max-w-7xl px-6 pt-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="z-10 md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-6"
            >
              Empowering Farmers. Elevating Communities.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="section-title text-[var(--forest)] font-display"
            >
              Every field holds potential.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 max-w-2xl text-xl leading-8 text-[var(--ink-muted)]"
            >
              We help farmers unlock their potential through innovation, data, and partnerships that drive measurable growth.
            </motion.p>
          </div>
          <div className="relative h-[450px] md:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0 translate-x-4 translate-y-4 bg-[var(--forest)]/10"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src="/images/portfolio-2.jpg"
                alt="About Premier Agric"
                fill
                className="object-cover border border-[var(--line)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="relative mb-32 bg-[var(--surface-soft)] px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow">Our Purpose</p>
            <h2 className="font-display text-4xl text-[var(--forest)] mt-4">Why We Exist</h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg leading-8 text-[var(--ink-muted)]">
            <p>
              Every agricultural project — from smallholder co-ops to corporate social investment portfolios — deserves more than generic solutions. You work hard to create livelihoods, build resilience, and deliver tangible outcomes, but fragmented systems, outdated training, and poor data visibility often hold back real progress.
            </p>
            <p className="border-l-2 border-[var(--gold)] pl-6 italic font-display text-xl text-[var(--forest)]">
              We exist to close that gap — delivering support that scales with you, data that strengthens your decisions, and training that transforms how you work. Our mission is to make agriculture more connected, sustainable, and profitable — for the farmer and the community at large.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mx-auto mb-32 max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="relative h-[500px] md:col-span-5 order-last md:order-first">
            <div className="absolute inset-0 -translate-x-4 -translate-y-4 bg-[var(--clay)]/10" />
            <Image
              src="/images/troops.jpeg"
              alt="Premier Agric Team"
              fill
              className="object-cover border border-[var(--line)]"
            />
            <div className="absolute bottom-6 left-6 bg-[var(--forest)] px-6 py-3 border border-white/10 shadow-lg">
              <span className="eyebrow text-[var(--gold)] text-xs tracking-wider">Empowered farmer focus</span>
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow">The Journey</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--forest)] mt-4 mb-6">
              Our Story: Growing with Purpose
            </h2>
            <div className="space-y-6 text-lg leading-8 text-[var(--ink-muted)]">
              <p>
                Premier Agric was founded in 2020 with one belief — that agricultural transformation begins with people. We’ve worked alongside emerging farmers, cooperatives, and agripreneurs to turn challenges into scalable, sustainable solutions.
              </p>
              <p>
                Through precision agriculture, mentorship, and hands-on implementation, we help our partners not just grow crops, but grow capacity and confidence. Our impact is seen in farms that now run efficiently, youth that find meaningful work, and communities that are becoming self-sufficient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-[var(--forest)] text-[var(--surface-soft)] py-24 md:py-32 mb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-20 max-w-3xl">
            <p className="eyebrow text-[var(--gold)]">Methodology</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-4">
              Our Approach: Practical Innovation with Measurable Impact
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {approaches.map((approach, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6 inline-block rounded-full bg-white/5 p-3">
                    {approach.icon}
                  </div>
                  <h3 className="font-display text-2xl text-white mb-4">{approach.title}</h3>
                  <p className="text-white/70 leading-relaxed">{approach.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Foundation & Sponsor Focus Section */}
      <section className="mx-auto mb-32 max-w-7xl px-6 md:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--surface-soft)] to-[var(--surface)] border border-[var(--line)] p-8 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(168,94,59,0.08),transparent_60%)]" />
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow text-[var(--clay)]">Measurable Rural Impact</p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest)] mt-4 mb-6">
              Are You a Foundation or Sponsor Seeking Measurable Rural Impact?
            </h2>
            <p className="text-lg leading-8 text-[var(--ink-muted)] mb-8">
              We help partners deliver credible outcomes — youth employment, food security, climate resilience, and sustainable livelihoods backed by real data.
            </p>
            <Link
              href="/contact?subject=Impact Programme"
              className="editorial-link inline-flex items-center gap-2 bg-[var(--clay)] px-8 py-4 text-[var(--surface)] hover:bg-[var(--clay)]/90 hover:scale-[1.02] transition-all"
            >
              Let’s discuss an impact programme <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="bg-[var(--surface-soft)] px-6 py-24 text-center md:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Build Together</p>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--forest)] mt-4 mb-6">
            Let’s Build the Future of Agriculture — Together
          </h2>
          <p className="text-lg leading-8 text-[var(--ink-muted)] mb-10">
            Whether you’re exploring precision farming, training programs, or enterprise development, Premier Agric is ready to help you turn your agricultural goals into measurable results.
          </p>
          <Link
            href="/contact"
            className="editorial-link inline-flex items-center gap-2 bg-[var(--forest)] px-8 py-4 text-[var(--surface)] hover:brightness-110"
          >
            Request a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
