'use client';
import Image from 'next/image';
import Header from '../../components/Header';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[55vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="About Premier Agric"
          fill
          className="object-cover brightness-[0.5]"
        />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold font-display"
          >
            Empowering Farmers. Elevating Communities.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            Every field holds potential — we help farmers unlock it through
            innovation, data, and partnerships that drive measurable growth.
          </motion.p>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">
            Why We Exist
          </h2>
          <p className="mt-6 leading-relaxed text-lg">
            Every agricultural project — from smallholder co-ops to corporate social 
            investment portfolios — deserves more than generic solutions. You work hard 
            to create livelihoods, build resilience, and deliver tangible outcomes, but 
            fragmented systems, outdated training, and poor data visibility often hold 
            back real progress.
          </p>
          <p className="mt-6 leading-relaxed text-lg">
            We exist to close that gap — delivering <span className="font-semibold text-green-700">
            support that scales with you, data that strengthens your decisions, and training 
            that transforms how you work.</span> Our mission is to make agriculture more connected, 
            sustainable, and profitable — for the farmer and the community at large.
          </p>
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/portfolio-2.jpg"
                alt="Empowered farmer"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-display mb-4">
                Our Story: Growing with Purpose
              </h2>
              <p className="text-lg leading-relaxed">
                Premier Agric was founded in 2020 with one belief — that agricultural transformation 
                begins with people. We’ve worked alongside emerging farmers, cooperatives, and 
                agripreneurs to turn challenges into scalable, sustainable solutions.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                Through precision agriculture, mentorship, and hands-on implementation, 
                we help our partners not just grow crops, but grow capacity and confidence. 
                Our impact is seen in farms that now run efficiently, youth that find meaningful 
                work, and communities that are becoming self-sufficient.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-gray-700">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-primary font-display mb-8 text-center"
        >
          Our Approach: Practical Innovation with Measurable Impact
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-green-700 mb-3">
              Precision Mapping & Data Insights
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              See your operation clearly. Identify crop stress, irrigation inefficiencies, and yield potential 
              before they affect results — using drone mapping, satellite data, and spatial analytics.
            </p>

            <h3 className="text-2xl font-semibold text-green-700 mb-3">
              Business Model Design & Enterprise Development
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              Move from vision to profitability. We help you design scalable, viable business models that 
              align people, processes, and performance for long-term success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-green-700 mb-3">
              Hands-On Training & Capacity Building
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              Equip your teams — from farmers and youth to field staff — with practical skills 
              that boost confidence, efficiency, and output. Our programs bridge knowledge gaps 
              with real-world experience.
            </p>

            <h3 className="text-2xl font-semibold text-green-700 mb-3">
              End-to-End Support
            </h3>
            <p className="text-lg leading-relaxed">
              From concept and design through monitoring, evaluation, and scaling — we walk 
              with you every step of the way. Because transformation doesn’t end at strategy; 
              it thrives through partnership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-primary text-white py-20 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold font-display"
          >
            Let’s Build the Future of Agriculture — Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/90 max-w-2xl mx-auto"
          >
            Whether you’re exploring precision farming, training programs, or enterprise 
            development, Premier Agric is ready to help you turn your agricultural goals 
            into measurable results.
          </motion.p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block bg-bright text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              Request a Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
