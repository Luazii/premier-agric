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
          Why Farmers Choose Premier Agric
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto"
        >
          At <span className="font-semibold text-green-700">Premier Agric</span>, we measure our success by what 
          <strong>you achieve in the field</strong>.  
          We don’t just deliver agricultural services — we provide the strategies, data, and on-the-ground 
          guidance that turn your potential into real performance.  
          Our approach blends technology with community, ensuring your farm isn’t just productive, 
          but resilient, profitable, and sustainable — year after year.
        </motion.p>

        {/* PILLARS */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: 'Dedicated Support',
              text: `We stay with you from planning to harvest — which means you never have to navigate 
              challenges alone. Every decision is guided, every milestone supported.`,
            },
            {
              title: 'Proven Expertise',
              text: `With years of agricultural experience, we translate complex data and systems 
              into simple, actionable steps that help you achieve measurable progress.`,
            },
            {
              title: 'Cost-Effective Growth',
              text: `Our strategies focus on reducing waste and optimizing inputs — 
              which means higher yields, lower costs, and sustainable growth that lasts.`,
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
            Hope Grows When You Do
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-6 max-w-3xl mx-auto text-lg text-white/90 leading-relaxed"
          >
            Every partnership begins with one goal — your progress.  
            Each consultation, each training, and each field visit is designed to unlock new opportunities, 
            strengthen your community, and ensure your work today builds a better tomorrow.  
            Because when farmers grow, entire communities rise with them.
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
              Start Your Growth Journey →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
