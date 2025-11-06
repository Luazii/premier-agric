'use client'
import { motion } from 'framer-motion'

export default function ServicesGrid() {
  const services = [
    {
      title: 'Agribusiness Consulting',
      body: `We help farmers and cooperatives design profitable business models that actually work in local conditions. 
      This means you can access better markets, secure funding, and manage your operations more efficiently — with clarity and confidence.`,
      img: '/images/service-6.jpg',
    },
    {
      title: 'Training & Capacity Building',
      body: `Our hands-on training equips your team with the latest agricultural techniques, business management tools, 
      and digital literacy skills — which means improved performance in the field and more sustainable long-term results.`,
      img: '/images/service-5.jpg',
    },
    // {
    //   title: 'Precision Mapping & Data Insights',
    //   body: `We use drone and satellite mapping to give you real-time insights into soil health, crop stress, and yield forecasts. 
    //   This means you can plan smarter, save on inputs, and boost productivity while caring for the environment.`,
    //   img: '/images/service-3.jpg',
    // },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center font-display text-[#688E3C]"
      >
        Turning Agricultural Challenges into Measurable Growth
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-700 max-w-2xl mx-auto mt-4"
      >
        Our services are built around one goal — helping you achieve real, visible progress in productivity,
        profitability, and sustainability.
      </motion.p>

      {/* Services Grid */}
      <div className="flex md:grid-cols-3 gap-10 justify-center mt-16 max-w-6xl mx-auto">
        {services.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group"
          >
            <div className="relative h-56 overflow-hidden">
              <motion.img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-[#688E3C] group-hover:text-[#577D31] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="mt-3 text-gray-700 text-sm leading-relaxed flex-1">{s.body}</p>
              <a
                href="/contact"
                className="mt-6 inline-block self-start text-sm font-medium text-[#688E3C] hover:text-[#FDE335] transition-colors duration-300"
              >
                Request a Consultation →
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
