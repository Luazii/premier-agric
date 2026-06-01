'use client'

import { motion } from 'framer-motion'

export default function EngagementPrompt() {
  return (
    <section className="section-frame bg-[var(--surface-soft)] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">Next move</p>
          <h2 className="section-title mt-4 text-[var(--forest)]">
            Bring the challenge. We will shape the response.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="glass rounded-[2rem] p-8 text-[var(--ink)] md:p-10"
        >
          <p className="text-base leading-8 text-[var(--ink-muted)]">
            If yields, input costs, sustainability targets, capability gaps, or reporting pressure are slowing progress, send the brief. We will map the right support and respond with relevant options.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-[var(--forest)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--surface-soft)]"
          >
            Start the 3 questions
          </a>
          <p className="mt-5 text-sm leading-7 text-[var(--ink-muted)]">
            Foundations and sponsors looking for measurable rural impact can use the same channel to discuss programme design.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
