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
            Every field has potential — we help farmers unlock it through technology, training, and trust.
          </motion.p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">
            Our Story: Growing with Purpose
          </h2>
          <p className="mt-6 leading-relaxed text-lg">
            Premier Agric began with a simple mission — to help farmers grow more efficiently and sustainably 
            while improving their livelihoods. Established in 2020, we have worked alongside emerging farmers, 
            cooperatives, and agripreneurs to transform challenges into opportunities for success.
          </p>
          <p className="mt-6 leading-relaxed text-lg">
            Through modern technologies like drone mapping, soil analysis, and precision agriculture, 
            we empower farmers to make informed decisions that increase yields, reduce input costs, 
            and ensure environmental sustainability. But beyond data, our true impact is seen in the 
            farmers who now farm with confidence — and communities that are becoming self-sufficient.
          </p>
        </motion.div>

        {/* SECTION 1 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-3">Empowering the Modern Farmer</h3>
            <p className="text-lg leading-relaxed">
              We help smallholder and commercial farmers adopt innovative methods — 
              from crop monitoring using drones to real-time data analytics. This means better 
              planning, improved productivity, and long-term cost savings for our clients.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Farmers who partner with us don’t just grow crops — they grow capacity, confidence, 
              and profitability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/service-3.jpg"
              alt="Empowered farmer"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg object-cover"
            />
          </motion.div>
        </div>

        {/* SECTION 2 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/portfolio-2.jpg"
              alt="Working with communities"
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
            <h3 className="text-2xl font-semibold text-primary mb-3">Building Sustainable Communities</h3>
            <p className="text-lg leading-relaxed">
              Our work goes beyond individual success — we focus on building lasting agricultural ecosystems. 
              By training youth, mentoring cooperatives, and supporting rural farmers, we’re helping entire 
              communities to thrive independently.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Because when one farmer succeeds, the whole community grows stronger. 
              That’s the transformation we stand for.
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
            Let’s Grow Your Farm — and Your Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/90 max-w-2xl mx-auto"
          >
            Whether you’re starting your first project or scaling your agribusiness, Premier Agric is ready 
            to partner with you. Let’s turn your agricultural vision into measurable growth.
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
