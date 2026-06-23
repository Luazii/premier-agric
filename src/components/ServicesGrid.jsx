'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ServicesGrid() {
  const services = [
    {
      label: '01. Strategy',
      title: 'Agribusiness Consulting',
      text: 'Strong operations start with a strong model. We help you design clear, profitable business systems — which means you can secure buyers, reduce waste, and scale with confidence.',
      image: '/images/agriconsulting.JPG',
      dark: false,
    },
    {
      label: '02. Education',
      title: 'Training & Capacity Building',
      text: 'Transformation begins with people. We provide practical training in agricultural technique and business skills — which means your team gains the confidence to solve problems and drive daily productivity without constant supervision.',
      dark: true,
    },
    {
      label: '03. Validation',
      title: 'Sustainability & Impact Reporting',
      text: 'For partners who must prove value. We track real-world data on yields, jobs created, and climate resilience — which means you get credible, audit-ready reports that validate your investment and attract future funding.',
      image: '/images/Sustainability%20&%20Impact%20Reporting.jpg',
      bullets: ['Yield tracking & forecasting', 'Job creation & employment metrics', 'Climate resilience analysis'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-40">
      <div className="mb-20 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          Our expertise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-title mt-5 text-[var(--forest)] font-display"
        >
          Empowering Farmers with Real Results.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl text-xl leading-8 text-[var(--ink-muted)]"
        >
          Every service we offer helps farmers work smarter, earn more, and farm sustainably. We design solutions that make your work easier, more efficient, and more profitable.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-12"
      >
        {/* Service 1: Agribusiness Consulting */}
        <motion.article
          variants={itemVariants}
          className="group relative overflow-hidden border border-[var(--line)] md:col-span-8 glass hover:shadow-lg transition-all duration-300"
        >
          <div className="relative h-96 overflow-hidden">
            <Image
              src={services[0].image}
              alt={services[0].title}
              width={800}
              height={600}
              className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,27,14,0.92)] via-[rgba(6,27,14,0.4)] to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-8 text-[var(--surface)] md:p-10">
            <p className="eyebrow mb-3 border-t border-[rgba(230,179,75,0.3)] pt-3 text-[var(--gold)]">
              {services[0].label}
            </p>
            <h3 className="font-display text-4xl mb-2">{services[0].title}</h3>
            <p className="mt-4 max-w-xl leading-7 text-white/80">{services[0].text}</p>
            <a
              href="/contact"
              className="editorial-link mt-6 inline-flex items-center gap-2 border-b border-[var(--gold)] pb-1 text-[var(--gold)] hover:text-white hover:border-white transition-colors duration-200"
            >
              Request a Consultation <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </motion.article>

        {/* Service 2: Training & Capacity Building */}
        <motion.article
          variants={itemVariants}
          className="flex flex-col justify-between bg-[var(--forest)] p-8 text-[var(--surface)] md:col-span-4 md:p-10 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(230,179,75,0.15),transparent_70%)]" />
          <div>
            <p className="eyebrow mb-6 border-t border-white/20 pt-3 text-[var(--gold)]">
              {services[1].label}
            </p>
            <h3 className="font-display text-3xl mb-2">{services[1].title}</h3>
            <p className="mt-4 leading-7 text-white/72">{services[1].text}</p>
          </div>
          <a
            href="/contact"
            className="editorial-link mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-white hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors duration-200"
          >
            Explore programs <ArrowRight className="h-3 w-3" />
          </a>
        </motion.article>

        {/* Service 3: Sustainability & Impact Reporting */}
        <motion.article
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 items-center gap-8 border-t border-[var(--line)] pt-8 md:col-span-12 md:grid-cols-2 md:pt-10"
        >
          <div className="md:pr-10">
            <p className="eyebrow">{services[2].label}</p>
            <h3 className="mt-4 font-display text-4xl text-[var(--forest)]">{services[2].title}</h3>
            <p className="mt-6 text-xl leading-8 text-[var(--ink-muted)]">{services[2].text}</p>
            <ul className="mt-8 space-y-4">
              {services[2].bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-[var(--ink)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--clay)]" />
                  <span className="font-medium">{bullet}</span>
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className="editorial-link mt-8 inline-flex items-center gap-2 border-b border-[var(--forest)] pb-1 text-[var(--forest)] hover:text-[var(--clay)] hover:border-[var(--clay)] transition-colors duration-200"
            >
              Request a Consultation <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="h-[500px] overflow-hidden bg-[var(--surface-soft)] relative group border border-[var(--line)]">
            <Image
              src={services[2].image}
              alt={services[2].title}
              width={800}
              height={600}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-102"
            />
          </div>
        </motion.article>
      </motion.div>
    </section>
  )
}
