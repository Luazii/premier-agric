'use client';
import Image from 'next/image';
import Header from '../../components/Header';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      <Header />
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
            Joining Hands with Empowerment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            We don’t just work the land — we cultivate possibility.
          </motion.p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-display">
            Our Story
          </h2>
          <p className="mt-6 leading-relaxed text-lg">
            Premier Agric was born from a shared belief that true agricultural transformation
            starts with people. Established in 2020, we bring together over a decade of hands-on
            experience in agricultural facilitation, mentorship, and innovation. We’re more than
            consultants; we’re partners in purpose, walking alongside farmers, graduates, and
            cooperatives as they turn potential into thriving success stories.
          </p>
         <p className="mt-6 leading-relaxed text-lg">  {/* CARRIES THE POWER OF HOPE */}
            Every project we touch carries a symbol of hope. From smallholder farmers
            finding their footing to young graduates gaining real-world experience, our goal is to
            create systems that grow with integrity, innovation, and sustainability.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-3">Our Essence</h3>
            <p className="text-lg leading-relaxed">
              We believe in a future where every farmer, emerging or commercial, grows with
              confidence and dignity. Where innovation and tradition work hand in hand. Where food
              security isn’t just a goal, but a shared responsibility carried with pride.
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
            <h3 className="text-2xl font-semibold text-primary mb-3">Our Promise</h3>
            <p className="text-lg leading-relaxed">
              We exist to stand beside those who feed nations empowering them with tools,
              technology, and trust. For us, every training, every consultation, and mentorship session is
              a seed planted toward resilience, purpose, and self-sufficiency.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Because the future of agriculture is not built by companies, it’s grown by people,
              together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary text-white py-20 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold font-display"
          >
            You’re Not Just Visiting. You’re Joining Hands with Empowerment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/90 max-w-2xl mx-auto"
          >
            From the soil to the satellite, from learning to leading Premier Agric is where
            innovation meets humanity. Together, we’re reimagining what African agriculture can be.
          </motion.p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-block bg-bright text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              Work With Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
