'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { NEWSLETTERS as INITIAL_NEWSLETTERS } from '../../data/newsletters'
import { ArrowRight, Newspaper, Calendar, Clock, Sparkles, BookOpen, Video, ChevronRight, Share2, Check } from 'lucide-react'

function formatDate(timestamp) {
  if (!timestamp) return ''
  try {
    const d = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp)
    if (isNaN(d.getTime())) return String(timestamp)
    return d.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return String(timestamp || '')
  }
}

function formatTime(timestamp) {
  if (!timestamp) return ''
  try {
    const d = new Date(timestamp)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
  } catch (e) {
    return ''
  }
}

export default function NewsPage() {
  const [selectedNewsletter, setSelectedNewsletter] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [now, setNow] = useState(null)

  useEffect(() => {
    setNow(Date.now())
  }, [])

  // Fetch published newsletters from Convex
  const convexNewsletters = useQuery(api.newsletters.listPublished)
  
  // Combine Convex newsletters (admin uploaded) with initial static newsletters safely
  const allNewsletters = Array.isArray(convexNewsletters)
    ? [...convexNewsletters, ...INITIAL_NEWSLETTERS]
    : INITIAL_NEWSLETTERS

  // Top 3 featured newsletters
  const featuredNewsletters = allNewsletters.slice(0, 3)

  // Fetch webinars from Convex
  const webinars = useQuery(api.webinars.list)
  
  const upcomingWebinars = Array.isArray(webinars)
    ? webinars.filter((w) => (now ? w.date + w.duration * 60 * 1000 >= now : true))
    : []

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
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-40 pb-20 px-6 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,179,75,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,85,34,0.22),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-mono tracking-widest uppercase mb-6">
            <Newspaper className="w-3.5 h-3.5" />
            <span>News & Agritech Insights</span>
          </div>

          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] max-w-4xl">
            Latest Agricultural <br />
            <span className="text-[var(--gold)]">Intelligence & Events.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed font-sans">
            Stay informed with our published newsletters, expert agronomic research, drone technology updates, and upcoming live learning webinars.
          </p>
        </div>
      </section>

      {/* SECTION 1: NEWSLETTERS SECTION */}
      <section className="relative px-6 md:px-8 py-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow text-[var(--gold)] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--gold)]" />
                Featured Newsletters
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-white">
                Quarterly Insights & Reports
              </h2>
            </div>
            
            <Link
              href="/newsletters"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest)] transition-all duration-300 font-mono text-sm tracking-widest uppercase rounded-sm group self-start md:self-auto"
            >
              <span>Read More Newsletters</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Short Newsletters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNewsletters.map((item) => (
              <article
                key={item._id || item.id}
                onClick={() => setSelectedNewsletter(item)}
                className="group relative flex flex-col justify-between border border-white/10 bg-white/5 backdrop-blur-md p-7 rounded-sm transition-all duration-300 hover:border-[var(--gold)]/50 hover:bg-white/[0.08] cursor-pointer overflow-hidden"
              >
                <div>
                  {item.imageUrl && (
                    <div className="w-full h-44 -mx-7 -mt-7 mb-5 border-b border-white/10 overflow-hidden relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-block px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] rounded-xs">
                      {item.category}
                    </span>
                    <span className="text-xs text-white/40 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-white/40 mb-2">
                    {item.issue} · {item.createdAt ? formatDate(item.createdAt) : item.date}
                  </p>
                  
                  <h3 className="font-display text-xl leading-snug text-white group-hover:text-[var(--gold)] transition-colors duration-200 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--gold)] group-hover:underline flex items-center gap-1">
                    Read issue details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <button
                    onClick={(e) => handleShare(e, item._id || item.id)}
                    className="p-1.5 text-white/40 hover:text-white transition-colors"
                    title="Share link"
                  >
                    {copiedId === (item._id || item.id) ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 p-8 border border-white/10 bg-gradient-to-r from-emerald-950/40 via-white/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <div>
                <h4 className="font-display text-lg text-white">Looking for past editions or specific topics?</h4>
                <p className="text-sm text-white/60">Browse our complete archive of technical guides, soil analyses, and agribusiness stories.</p>
              </div>
            </div>
            <Link
              href="/newsletters"
              className="px-6 py-3 bg-[var(--gold)] text-[var(--forest)] font-mono text-sm font-semibold tracking-wider uppercase hover:bg-[var(--gold)]/90 transition-all shrink-0"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: WEBINARS SECTION */}
      <section className="relative px-6 md:px-8 py-20 bg-black/20 border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow text-[var(--gold)] flex items-center gap-2">
                <Video className="w-4 h-4 text-[var(--gold)]" />
                Live Webinars
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-white">
                Upcoming & On-Demand Workshops
              </h2>
            </div>

            <Link
              href="/webinars"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all duration-300 font-mono text-sm font-semibold tracking-widest uppercase rounded-sm group self-start md:self-auto"
            >
              <span>Explore All Webinars</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {webinars === undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 border border-white/10 bg-white/5 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : upcomingWebinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingWebinars.slice(0, 3).map((w) => (
                <div key={w._id} className="border border-white/10 bg-white/5 p-6 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-all">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 text-xs font-mono text-[var(--gold)] border border-[var(--gold)]/30 bg-[var(--gold)]/10 mb-3">
                      {w.topic}
                    </span>
                    <h3 className="font-display text-xl text-white mb-2">{w.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">{w.description}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--gold)]" />
                      {formatDate(w.date)}
                    </span>
                    <span>{formatTime(w.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 bg-white/5 p-12 text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                <Video className="w-6 h-6 text-white/40" />
              </div>
              <h3 className="font-display text-2xl text-white">Live Learning Webinars</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Join our expert agronomists and technology specialists in real-time interactive sessions covering precision drone scanning, soil health, and agri-finance.
              </p>
              <Link
                href="/webinars"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest)] transition-all font-mono text-sm uppercase tracking-wider"
              >
                Go to Webinars Page
              </Link>
            </div>
          )}

          <div className="mt-12 p-8 border border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="font-display text-2xl text-white">Ready to join a live session?</h4>
              <p className="text-sm text-white/60 mt-1">Register for upcoming webinars, access past recorded sessions, and join interactive rooms.</p>
            </div>
            <Link
              href="/webinars"
              className="px-8 py-4 bg-[var(--gold)] text-[var(--forest)] font-mono text-sm font-semibold tracking-widest uppercase hover:brightness-105 transition-all shrink-0"
            >
              View Webinars Page →
            </Link>
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
              <div className="w-full h-56 -mx-6 -mt-6 md:-mx-10 md:-mt-10 mb-6 overflow-hidden border-b border-white/10">
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

            <h2 className="font-display text-3xl leading-snug mb-4 text-white">
              {selectedNewsletter.title}
            </h2>

            <p className="text-sm font-mono text-white/50 mb-6 border-b border-white/10 pb-4">
              By {selectedNewsletter.author}
            </p>

            <div className="prose prose-invert max-w-none text-white/80 text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {selectedNewsletter.content}
            </div>

            {selectedNewsletter.highlights && selectedNewsletter.highlights.length > 0 && (
              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-sm">
                <h4 className="font-mono text-xs text-[var(--gold)] uppercase tracking-wider mb-3">Key Highlights</h4>
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

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/newsletters"
                className="w-full sm:w-auto text-center px-6 py-3 bg-[var(--gold)] text-[var(--forest)] font-mono text-sm font-semibold tracking-wider uppercase hover:brightness-105"
              >
                Browse All Newsletters
              </Link>
              <button
                onClick={() => setSelectedNewsletter(null)}
                className="text-xs font-mono text-white/50 hover:text-white"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
