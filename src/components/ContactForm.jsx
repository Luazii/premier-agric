'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries());
    data.type = 'contact';

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSent(true)
        e.target.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[var(--surface)] pt-32">
      <div className="mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="flex flex-col justify-between pt-12 md:col-span-5 md:pt-24">
            <div className="mb-16">
              <span className="eyebrow mb-4 block">Connect</span>
              <h1 className="section-title text-[var(--forest)]">Let&apos;s cultivate excellence.</h1>
              <p className="mt-6 max-w-md text-xl leading-8 text-[var(--ink-muted)]">
                Whether you&apos;re looking to optimise operations or explore sustainable innovation, our advisors are ready to partner with you.
              </p>
            </div>
            <div className="space-y-8 border-l border-[var(--line)] pl-6">
              <div>
                <h3 className="eyebrow mb-2 text-[var(--ink-muted)]">Headquarters</h3>
                <p className="text-lg text-[var(--forest)]">Durban, KZN<br />South Africa</p>
              </div>
              <div>
                <h3 className="eyebrow mb-2 text-[var(--ink-muted)]">Direct line</h3>
                <a href="tel:+27735613851" className="font-display text-3xl text-[var(--forest)] hover:text-[var(--clay)]">+27 73 561 3851</a>
              </div>
              <div>
                <h3 className="eyebrow mb-2 text-[var(--ink-muted)]">Electronic mail</h3>
                <a href="mailto:info@premieragric.co.za" className="border-b border-[var(--clay)]/40 pb-1 text-xl text-[var(--forest)] hover:text-[var(--clay)]">info@premieragric.co.za</a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="relative border border-[var(--line)] bg-white p-8 shadow-sm md:p-12">
              <div className="absolute left-0 top-0 h-[2px] w-full bg-[var(--clay)]" />
              <div className="mb-10">
                <h2 className="font-display text-5xl text-[var(--forest)]">Answer 3 Quick Questions</h2>
                <p className="mt-2 text-[var(--ink-muted)]">To help us route your inquiry to the right specialist.</p>
              </div>

              <form className="space-y-10" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New Premier Agric Inquiry" />
                <input type="hidden" name="_captcha" value="false" />

                <div>
                  <label className="eyebrow mb-2 block text-[var(--forest)]">01. What is the nature of your inquiry?</label>
                  <select name="challenge" className="underline-input text-lg text-[var(--forest)]">
                    <option>Strategic Consulting</option>
                    <option>Sustainability Solutions</option>
                    <option>Portfolio Management</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="eyebrow mb-2 block text-[var(--forest)]">02. Briefly describe your project scale or current challenge.</label>
                  <textarea name="message" rows="3" className="underline-input text-lg text-[var(--forest)]" placeholder="E.g. 500-hectare commercial farm seeking yield optimisation..." required />
                </div>

                <div>
                  <label className="eyebrow mb-6 block text-[var(--forest)]">03. Where should we send our response?</label>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <input name="name" className="underline-input" placeholder="Full Name" required />
                    <input name="email" type="email" className="underline-input" placeholder="Email Address" required />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="editorial-link inline-flex items-center gap-4 bg-[var(--forest)] px-8 py-4 text-[var(--surface)] hover:bg-[var(--clay)]">
                    {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
                  </button>
                  {sent ? <p className="mt-4 text-sm text-[var(--clay)]">Inquiry sent successfully.</p> : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
