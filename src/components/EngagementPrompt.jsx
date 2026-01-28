'use client'
import { motion } from 'framer-motion'

export default function EngagementPrompt() {
    return (
        <section className="py-20 bg-[#688E3C] text-white">
            <div className="max-w-5xl mx-auto px-6 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-3xl md:text-4xl font-bold font-display"
                >
                    What Could Your Farm Achieve With the Right Support?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mt-6 text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
                >
                    If you’re facing challenges with yields, input costs, sustainability targets, or skills development —
                    we’d love to help.
                    <br />
                    Answer just <span className="font-semibold text-yellow-300">3 quick questions</span> and we’ll respond
                    with relevant solutions or partnership options.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="mt-10"
                >
                    <a
                        href="/contact"
                        className="inline-block bg-[#FDE335] text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-yellow-300 transition"
                    >
                        Start the 3 Questions →
                    </a>
                </motion.div>

                {/* Sponsor Line */}
                <p className="mt-8 text-sm text-white/80">
                    Foundations & sponsors: looking for measurable rural impact?
                    Let’s explore a programme together.
                </p>
            </div>
        </section>
    )
}
