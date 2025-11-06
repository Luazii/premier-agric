'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)

    try {
      const res = await fetch('https://formspree.io/f/xwpwoddq', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setSent(true)
        e.target.reset()
        setTimeout(() => setSent(false), 4000)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-b from-white to-green-50"
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-green-700 mb-4"
        >
          Let’s Grow Something Great Together
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 max-w-2xl mx-auto"
        >
          Whether you’re exploring drone solutions, training programs, or want to
          start your next agribusiness project — tell us what you’re envisioning.
          We’ll help you find the best path forward.
        </motion.p>
      </div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        method="POST"
        className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-green-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Hidden input to allow Formspree redirection */}
        <input type="hidden" name="_subject" value="New Premier Agric Inquiry" />
        <input type="hidden" name="_captcha" value="false" />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-left"
          >
            <label className="block text-sm font-semibold text-green-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
              placeholder="Enter your full name"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-left"
          >
            <label className="block text-sm font-semibold text-green-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
              placeholder="you@example.com"
            />
          </motion.div>
        </div>

        {/* Message */}
        <motion.div
          className="mt-6 text-left"
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <label className="block text-sm font-semibold text-green-700 mb-2">
            Tell us about your project or inquiry
          </label>
          <textarea
            name="message"
            required
            rows="5"
            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none transition-all duration-200"
            placeholder="Share your goals, challenges, or questions..."
          ></textarea>
        </motion.div>

        {/* Submit */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300 ${
              isSubmitting
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isSubmitting ? 'Sending...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Inquiry
              </>
            )}
          </button>

          {/* Animated Success */}
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center text-green-700 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>

      {/* Contact Info (Optional footer) */}
      <div className="max-w-3xl mx-auto text-center mt-16 space-y-4 text-gray-700">
        <p className="text-lg font-semibold text-green-700">
          Prefer to reach us directly?
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 text-sm">
          <a
            href="mailto:info@premieragric.co.za"
            className="flex items-center justify-center gap-2 hover:text-green-600"
          >
            <Mail className="w-4 h-4" /> info@premieragric.co.za
          </a>
          <a
            href="tel:+27735613851"
            className="flex items-center justify-center gap-2 hover:text-green-600"
          >
            <Phone className="w-4 h-4" /> +27 73 561 3851
          </a>
          <a
            href="/contact"
            className="flex items-center justify-center gap-2 hover:text-green-600"
          >
            <MapPin className="w-4 h-4" /> Durban, South Africa
          </a>
        </div>
      </div>
    </motion.section>
  )
}