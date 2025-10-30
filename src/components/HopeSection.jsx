'use client'
import { motion } from 'framer-motion'

export default function HopeSection() {
  return (
    <section className="bg-gradient-to-b from-[#F8FAF7] to-[#E6F1EA] py-20 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* WHY CHOOSE US */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-green-800 font-display"
        >
          Why Choose Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto"
        >
        
At Premier Agric, we don’t just provide agricultural solutions, we walk beside you every step of the way. Your success is at 
 the heart of everything we do. By blending cutting-edge technology with sustainable, farmer-first 
 practices, we help you grow stronger, smarter, and more resilient. Every farm is unique, and so are our solutions. Which are designed to boost 
 productivity, lower costs, and nurture lasting growth. With Premier Agric, you’re not just farming, you’re building a sustainable future. we’re honored to be your partner on that journey.

        </motion.p>

        {/* PILLARS */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: 'Dedicated Support',
              text: 'Our team is here for you every step of the way, from planning to harvesting, ensuring your success.',
            },
            {
              title: 'Proven Expertise',
              text: 'With years of experience in agriculture, our team provides reliable guidance and support tailored to your needs.',
            },
            {
              title: 'Cost-Effective Strategies',
              text: 'We help you save on costs without compromising on quality, ensuring maximum return on investment.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * index, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md border border-green-100 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* HOPE SECTION */}
        <div className="mt-24 bg-[#688E3C] text-white rounded-3xl py-16 px-8 md:px-16 shadow-md">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display"
          >
            Hope Grows Here
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 max-w-3xl mx-auto text-lg text-white/90 leading-relaxed"
          >
            Each consultation, each field visit, each training session, is a seed of
            hope. Together, we can nurture a generation of farmers and agribusinesses
            ready to feed nations and shape a greener future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <a
              href="/contact"
              className="inline-block bg-[#FDE335] text-[#1B3A1A] px-8 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              Partner With Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
