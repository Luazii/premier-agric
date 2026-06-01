'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Activity,
  Award,
  HeartHandshake,
  Coins,
  ArrowRight,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import ServicesGrid from '../../components/ServicesGrid'

export default function Services() {
  const challenges = [
    {
      title: 'Optimise inputs',
      text: 'Optimise your inputs to protect margins.',
      icon: <Coins className="h-5 w-5 text-[var(--gold)]" />,
    },
    {
      title: 'Detect stress',
      text: 'Detect crop stress before it becomes a loss.',
      icon: <Activity className="h-5 w-5 text-[var(--gold)]" />,
    },
    {
      title: 'Strengthen business',
      text: 'Strengthen business structures for long-term resilience.',
      icon: <TrendingUp className="h-5 w-5 text-[var(--gold)]" />,
    },
    {
      title: 'Deliver impact',
      text: 'Deliver impact that funders, clients, and communities can see.',
      icon: <Award className="h-5 w-5 text-[var(--gold)]" />,
    },
  ]

  const reasons = [
    {
      title: 'Dedicated Support',
      text: 'We stay with you from planning to harvest — which means you never have to navigate challenges alone. Every decision is guided, every milestone supported.',
      icon: <HeartHandshake className="h-8 w-8 text-[var(--clay)]" />,
    },
    {
      title: 'Proven Expertise',
      text: 'With years of agricultural experience, we translate complex data and systems into simple, actionable steps that help you achieve measurable progress.',
      icon: <Award className="h-8 w-8 text-[var(--clay)]" />,
    },
    {
      title: 'Cost-Effective Growth',
      text: 'Our strategies focus on reducing waste and optimizing inputs — which means higher yields, lower costs, and sustainable growth that lasts.',
      icon: <Shield className="h-8 w-8 text-[var(--clay)]" />,
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
      <section className="mx-auto mb-20 max-w-7xl px-6 pt-16 md:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow mb-6"
        >
          Premier Solutions
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="section-title text-[var(--forest)] font-display max-w-4xl mx-auto"
        >
          Empowering Farmers with Real Results.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-2xl text-xl leading-8 text-[var(--ink-muted)] mx-auto"
        >
          Every service we offer helps farmers work smarter, earn more, and farm sustainably.
        </motion.p>
      </section>

      {/* Developing Agriculture, Nurturing Futures */}
      <section className="border-t border-[var(--line)] py-24 bg-[var(--surface-soft)] px-6 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <p className="eyebrow">The Context</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--forest)] mt-4 leading-tight">
              Developing Agriculture, Nurturing Futures
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg leading-8 text-[var(--ink-muted)]">
            <p>
              Farmers today face increasing costs, unpredictable weather, and shifting markets. That’s why we design solutions that make your work easier, more efficient, and more profitable — without compromising sustainability.
            </p>
            <p className="font-medium text-[var(--ink)]">
              Whether it’s through actionable insights, tailored training, or strategic guidance, our goal is simple: to help you grow your yield, reduce waste, and strengthen your legacy in agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges & Action Highlights */}
      <section className="bg-[var(--forest)] text-[var(--surface-soft)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow text-[var(--gold)]">Resilience in Action</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-4">
              Turning Agricultural Challenges into Measurable Growth
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-8">
              Farming today means navigating uncertainty — shifting rainfall patterns, unpredictable yields, rising input costs, and markets that demand traceability and sustainability. You don’t need more complexity. You need clarity, control, and measurable progress.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {challenges.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 p-6 flex flex-col justify-between group hover:bg-white/10 transition-all duration-300"
              >
                <div>
                  <div className="mb-4 inline-block rounded-full bg-white/5 p-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="text-white font-medium text-lg leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 border-t border-white/10 pt-8 text-center">
            <p className="font-display text-2xl text-[var(--gold)] italic">
              &quot;Your growth story shouldn’t be defined by limitations — it should be measured in results.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* The Core Services Grid */}
      <ServicesGrid />

      {/* Why Farmers Choose Premier Agric */}
      <section className="bg-[var(--surface-soft)] py-24 md:py-32 border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <p className="eyebrow">Our Value Proposition</p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--forest)] mt-4">
              Why Farmers Choose Premier Agric
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--ink-muted)]">
              At Premier Agric, we measure our success by what you achieve in the field. We don’t just deliver agricultural services — we provide the strategies, data, and on-the-ground guidance that turn your potential into real performance. Our approach blends technology with community, ensuring your farm isn’t just productive, but resilient, profitable, and sustainable.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white border border-[var(--line)] p-8 md:p-10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-sm"
              >
                <div>
                  <div className="mb-6 inline-block bg-[var(--surface-soft)] p-4 rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-2xl text-[var(--forest)] mb-4">{item.title}</h3>
                  <p className="text-[var(--ink-muted)] leading-relaxed text-sm md:text-base">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hope Grows When You Do */}
      <section className="relative overflow-hidden bg-[var(--surface-deep)] text-[var(--surface-soft)] py-28 md:py-36 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/images/hero.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,27,14,0.95)] via-[var(--surface-deep)] to-[rgba(6,27,14,0.95)]" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow text-[var(--gold)] mb-6"
          >
            Building the Future
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl text-[var(--surface)] tracking-tight leading-tight"
          >
            Hope Grows When You Do
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto"
          >
            Every partnership begins with one goal — your progress. Each consultation, each training, and each field visit is designed to unlock new opportunities, strengthen your community, and ensure your work today builds a better tomorrow. Because when farmers grow, entire communities rise with them.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <Link
              href="/contact"
              className="editorial-link inline-flex items-center gap-3 bg-[var(--gold)] text-[var(--surface-deep)] px-10 py-5 font-bold hover:brightness-105 transition-all shadow-md"
            >
              Start Your Growth Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
