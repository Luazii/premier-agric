'use client'
import { motion } from 'framer-motion'

export default function ServicesGrid() {
  const services = [
    {
      title: 'Agribusiness Consulting',
      body: 'Navigate the complexities of agriculture with tailored strategies that turn ideas into thriving ventures. From business planning and market analysis to sustainability models — we walk beside you every step.',
      img: '/images/service-4.jpg',
    },
    {
      title: 'Training & Capacity Building',
      body: 'Empower your team with hands-on knowledge. Our training cultivates confidence — from modern farming techniques and machinery use to management and stewardship that honours both people and planet.',
      img: '/images/service-5.jpg',
    },
    // {
    //   title: 'Precision Mapping & Data Insights',
    //   body: 'Through advanced drone mapping, satellite analytics, and data interpretation, we transform field information into clear, actionable insights that boost productivity and sustainability.',
    //   img: '/images/service-3.jpg',
    // },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center font-display text-primary"
      >
        Cultivating Growth Through Purpose-Driven Solutions
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-700 max-w-2xl mx-auto mt-4"
      >
        Every solution we offer is rooted in one belief, that when we invest in farmers,
        we invest in the future. Explore how we help agricultural enterprises grow
        stronger, smarter, and more sustainable.
      </motion.p>

      <div className="grid gap-10 md:grid-cols-3 mt-16">
        {services.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-primary">{s.title}</h3>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed flex-1">
                {s.body}
              </p>
              <a
                href="/contact"
                className="mt-6 inline-block self-start text-sm font-medium text-primary hover:text-fresh"
              >
                Let’s Grow Together →
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
