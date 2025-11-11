'use client'
import { motion } from 'framer-motion'

export default function ServicesGrid() {
  const services = [
    {
      title: 'Agribusiness Consulting',
      body: `Strong operations start with a strong model. 
      We help you design clear, profitable business systems that align with your environment, market, and mission — 
      whether you manage a co-op, corporate impact programme, or commercial farm. 
      Build capacity. Secure buyers. Strengthen your bottom line with purpose.`,
      img: '/images/service-6.jpg',
    },
    {
      title: 'Training & Capacity Building',
      body: `Transformation begins with people. 
      We provide practical training that blends agricultural technique, digital literacy, and enterprise skills 
      so your team can turn knowledge into real-world results. 
      From youth programmes to professional extension, our approach ensures growth that lasts beyond the training room.`,
      img: '/images/service-5.jpg',
    },
    {
      title: 'Sustainability & Impact Reporting',
      body: `For partners who must prove measurable outcomes, we make it easy to show real impact. 
      Our data systems track productivity gains, cost savings, youth employment, climate resilience, and community upliftment — 
      giving you clear, credible evidence for reports and stakeholder communication.`,
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
