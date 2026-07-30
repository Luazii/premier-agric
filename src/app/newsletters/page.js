'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { NEWSLETTERS as INITIAL_NEWSLETTERS } from '../../data/newsletters'
import { BookOpen, Search, ArrowLeft, Clock, Calendar, Share2, Check, Send, Image as ImageIcon } from 'lucide-react'

function formatDate(timestamp) {
  if (!timestamp) return ''
  try {
    const d = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp)
    if (isNaN(d.getTime())) return String(timestamp || '')
    return d.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return String(timestamp || '')
  }
}

function NewslettersContent() {
  const searchParams = useSearchParams()
  const initialId = searchParams?.get('id')

  // Safely fetch live published newsletters from Convex
  const listPublishedQuery = api?.newsletters?.listPublished ? api.newsletters.listPublished : 'skip'
  const convexNewsletters = useQuery(listPublishedQuery)

  const allNewsletters = Array.isArray(convexNewsletters)
    ? [...convexNewsletters, ...INITIAL_NEWSLETTERS]
    : INITIAL_NEWSLETTERS

  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNewsletter, setSelectedNewsletter] = useState(null)
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState('idle')
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    if (initialId && allNewsletters.length > 0) {
      const found = allNewsletters.find((n) => (n._id === initialId || n.id === initialId))
      if (found) setSelectedNewsletter(found)
    }
  }, [initialId, convexNewsletters])

  const categories = ['All', ...Array.from(new Set(allNewsletters.map((n) => n.category)))]

  const filteredNewsletters = allNewsletters.filter((n) => {
    const matchesCat = activeCategory === 'All' || n.category === activeCategory
    const titleMatch = n.title ? n.title.toLowerCase().includes(searchQuery.toLowerCase()) : false
    const summaryMatch = n.summary ? n.summary.toLowerCase().includes(searchQuery.toLowerCase()) : false
    const contentMatch = n.content ? n.content.toLowerCase().includes(searchQuery.toLowerCase()) : false
    return matchesCat && (titleMatch || summaryMatch || contentMatch)
  })

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribeStatus('loading')
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email }),
      })
      if (res.ok) {
        setSubscribeStatus('success')
        setEmail('')
      } else {
        setSubscribeStatus('error')
      }
    } catch (err) {
      setSubscribeStatus('error')
    }
  }

  const handleShare = (e, id) => {
    e.stopPropagation()
    if (typeof window !== 'undefined') {
      const link = `${window.location.origin}/newsletters?id=${id}`
      navigator.clipboard.writeText(link)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div className="bg-[#061b0e] min-h-screen text-white">
      {/* Header / Hero */}
      <section className="relative overflow-hidden pt-40 pb-16 px-6 md:px-8 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,179,75,0.12),transparent_55%)]" />
        
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] hover:underline uppercase tracking-wider mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to News & Insights
          </Link>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
            Premier Agric <span className="text-[var(--gold)]">Newsletters Archive</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed font-sans">
            In-depth agricultural reports, technological benchmarks, soil health guides, and commercial farming insights.
          </p>

          {/* Search & Categories Bar */}
          <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all rounded-xs border ${
                    activeCategory === cat
                      ? 'bg-[var(--gold)] text-[var(--forest)] border-[var(--gold)] font-semibold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:border-[var(--gold)]/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 md:px-8 py-16">
        <div className="mx-auto max-w-7xl">
          {filteredNewsletters.length === 0 ? (
            <div className="py-20 text-center text-white/40 font-mono">
              No newsletters found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNewsletters.map((newsletter) => (
                <article
                  key={newsletter._id || newsletter.id}
                  onClick={() => setSelectedNewsletter(newsletter)}
                  className="group border border-white/10 bg-white/5 backdrop-blur-sm p-8 rounded-sm hover:border-[var(--gold)]/50 hover:bg-white/[0.08] transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {newsletter.imageUrl && (
                      <div className="w-full h-52 -mx-8 -mt-8 mb-6 border-b border-white/10 overflow-hidden relative">
                        <img
                          src={newsletter.imageUrl}
                          alt={newsletter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="px-3 py-1 text-xs font-mono tracking-wider uppercase border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)]">
                        {newsletter.category}
                      </span>
                      <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {newsletter.readTime}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-white/40 mb-2">
                      {newsletter.issue} · {newsletter.createdAt ? formatDate(newsletter.createdAt) : newsletter.date}
                    </p>

                    <h2 className="font-display text-2xl text-white group-hover:text-[var(--gold)] transition-colors mb-4 leading-snug">
                      {newsletter.title}
                    </h2>

                    <p className="text-white/65 text-sm leading-relaxed mb-6 font-sans">
                      {newsletter.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--gold)] flex items-center gap-1 group-hover:underline">
                      Read full issue →
                    </span>
                    <button
                      onClick={(e) => handleShare(e, newsletter._id || newsletter.id)}
                      className="p-1.5 text-white/40 hover:text-white transition-colors"
                      title="Share link"
                    >
                      {copiedId === (newsletter._id || newsletter.id) ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Subscribe Box */}
          <div className="mt-20 border border-[var(--gold)]/30 bg-gradient-to-r from-emerald-950/60 via-white/5 to-transparent p-8 md:p-12 rounded-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="eyebrow text-[var(--gold)] mb-2">Subscribe to Premier Agric</p>
              <h3 className="font-display text-2xl md:text-3xl text-white">
                Get new issues delivered directly to your inbox.
              </h3>
              <p className="text-sm text-white/60 mt-2 max-w-xl">
                Join hundreds of farmers receiving our monthly newsletters, technology reviews, and regional soil updates.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-5 py-3 bg-white/5 border border-white/20 text-xs font-mono text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)] min-w-[260px]"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-6 py-3 bg-[var(--gold)] text-[var(--forest)] font-mono text-xs font-semibold tracking-widest uppercase hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      {selectedNewsletter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0a2313] border border-[var(--gold)]/40 p-6 md:p-10 rounded-sm shadow-2xl text-white">
            <button
              onClick={() => setSelectedNewsletter(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-2 text-xl font-mono"
            >
              ✕
            </button>

            {selectedNewsletter.imageUrl && (
              <div className="w-full h-64 -mx-6 -mt-6 md:-mx-10 md:-mt-10 mb-6 overflow-hidden border-b border-white/10">
                <img src={selectedNewsletter.imageUrl} alt={selectedNewsletter.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)]">
                {selectedNewsletter.category}
              </span>
              <span className="text-xs font-mono text-white/40">
                {selectedNewsletter.issue} · {selectedNewsletter.createdAt ? formatDate(selectedNewsletter.createdAt) : selectedNewsletter.date}
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4 text-white">
              {selectedNewsletter.title}
            </h2>

            <p className="text-xs font-mono text-white/50 mb-8 border-b border-white/10 pb-4">
              Written by {selectedNewsletter.author} · {selectedNewsletter.readTime}
            </p>

            <div className="prose prose-invert max-w-none text-white/80 text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {selectedNewsletter.content}
            </div>

            {selectedNewsletter.highlights && selectedNewsletter.highlights.length > 0 && (
              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-sm">
                <h4 className="font-mono text-xs text-[var(--gold)] uppercase tracking-wider mb-3">
                  Key Takeaways
                </h4>
                <ul className="space-y-2">
                  {selectedNewsletter.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedNewsletter(null)}
                className="px-6 py-2.5 border border-white/20 text-xs font-mono text-white hover:border-[var(--gold)] transition-colors uppercase tracking-wider"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function NewslettersPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#061b0e] min-h-screen text-white pt-40 px-6 text-center font-mono">
        Loading Newsletters...
      </div>
    }>
      <NewslettersContent />
    </Suspense>
  )
}
