'use client'
import { motion } from 'framer-motion'

export default function ServicesGrid() {
  const services = [
    {
      title: 'Agribusiness Consulting',
      body: `Strong operations start with a strong model. 
      We help you design clear, profitable business systems — 
      which means you can secure buyers, reduce waste, and scale with confidence.`,
      img: '/images/service-6.jpg',
    },
    {
      title: 'Training & Capacity Building',
      body: `Transformation begins with people. 
      We provide practical training in agricultural technique and business skills — 
      which means your team gains the confidence to solve problems and drive daily productivity without constant supervision.`,
      img: '/images/service-5.jpg',
    },
    {
      title: 'Sustainability & Impact Reporting',
      body: `For partners who must prove value. 
      We track real-world data on yields, jobs created, and climate resilience — 
      which means you get credible, audit-ready reports that validate your investment and attract future funding.`,
      img: '/images/service-4.jpg',
    },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* HEADER */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center font-display text-[#688E3C]"
      >
        Turning Agricultural Challenges into Measurable Growth
      </motion.h2>

      {/* CONTEXT PARAGRAPH (Expanded Messaging) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-700 max-w-3xl mx-auto mt-6 leading-relaxed text-lg"
      >
        Farming today means navigating uncertainty — shifting rainfall patterns, unpredictable yields, rising input costs,
        and markets that demand traceability and sustainability. You don’t need more complexity. You need clarity, control,
        and measurable progress.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-700 max-w-3xl mx-auto mt-4 leading-relaxed text-lg"
      >
        We help you:
        <br />• Optimise your inputs to protect margins.
        <br />• Detect crop stress before it becomes a loss.
        <br />• Strengthen business structures for long-term resilience.
        <br />• Deliver impact that funders, clients, and communities can see.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-gray-700 max-w-3xl mx-auto mt-4 leading-relaxed text-lg"
      >
        Your growth story shouldn’t be defined by limitations — it should be measured in results.
      </motion.p>

      {/* SERVICES GRID */}
      <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center mt-16 max-w-6xl mx-auto">
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
