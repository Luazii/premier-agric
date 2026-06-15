'use client'

import { useQuery, useMutation } from 'convex/react'
import { useUser, SignInButton } from '@clerk/nextjs'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../../../convex/_generated/api'

const TOPIC_COLORS = {
  'Agribusiness': 'bg-[var(--gold)]/20 text-[var(--gold)] border-[var(--gold)]/30',
  'Drone Mapping': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Data & Analytics': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Sustainability': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  'Finance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

function formatDate(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatTime(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
}

function WebinarCard({ webinar }) {
  const { isSignedIn, user } = useUser()
  const register = useMutation(api.registrations.register)
  const unregister = useMutation(api.registrations.unregister)
  const isRegistered = useQuery(
    api.registrations.isRegistered,
    isSignedIn
      ? { webinarId: webinar._id, clerkUserId: user.id }
      : 'skip'
  )
  const registrationCount = useQuery(api.registrations.listByWebinar, { webinarId: webinar._id })

  const [loading, setLoading] = useState(false)
  const [justRegistered, setJustRegistered] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleShare() {
    if (typeof window !== 'undefined') {
      const link = `${window.location.origin}/webinars/${webinar._id}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const isPast = webinar.date + webinar.duration * 60 * 1000 < Date.now()
  const isFull =
    webinar.maxAttendees != null &&
    registrationCount != null &&
    registrationCount.length >= webinar.maxAttendees

  const topicClass =
    TOPIC_COLORS[webinar.topic] ??
    'bg-white/10 text-white/60 border-white/20'

  async function handleRegister() {
    if (!isSignedIn) return
    setLoading(true)
    try {
      await register({
        webinarId: webinar._id,
        clerkUserId: user.id,
        userName: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Attendee',
        userEmail: user.primaryEmailAddress?.emailAddress ?? '',
      })
      setJustRegistered(true)
    } finally {
      setLoading(false)
    }
  }

  async function handleUnregister() {
    if (!isSignedIn) return
    setLoading(true)
    try {
      await unregister({ webinarId: webinar._id, clerkUserId: user.id })
      setJustRegistered(false)
    } finally {
      setLoading(false)
    }
  }

  const registered = isRegistered || justRegistered

  return (
    <article className="flex flex-col border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[var(--gold)]/40 hover:bg-white/8">
      <div className="p-6 md:p-8 flex-1 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <span className={`inline-block border px-3 py-1 text-xs font-mono tracking-widest uppercase ${topicClass}`}>
            {webinar.topic}
          </span>
          {registrationCount != null && (
            <span className="text-xs text-white/40 font-mono tabular-nums">
              {registrationCount.length}
              {webinar.maxAttendees ? `/${webinar.maxAttendees}` : ''} registered
            </span>
          )}
        </div>

        <Link href={`/webinars/${webinar._id}`} className="group">
          <h3 className="font-display text-2xl leading-snug text-white group-hover:text-[var(--gold)] transition-colors duration-200">
            {webinar.title}
          </h3>
        </Link>

        <p className="text-white/60 text-sm leading-relaxed flex-1">
          {webinar.description}
        </p>

<div className="pt-2 space-y-1 border-t border-white/10">
          <p className="text-xs text-white/50 font-mono">
            {formatDate(webinar.date)} · {formatTime(webinar.date)}
          </p>
          <p className="text-xs text-white/50 font-mono">
            {webinar.duration} min · {webinar.hostName}, {webinar.hostTitle}
          </p>
        </div>
      </div>

      <div className="px-6 md:px-8 pb-6 md:pb-8">
        {isPast ? (
          <div className="flex gap-2">
            <span className="flex-1 text-center py-3 text-white/30 text-sm font-mono tracking-wide border border-white/10">
              ENDED
            </span>
            <button
              onClick={handleShare}
              title="Copy share link"
              className="px-4 border border-white/10 text-white/60 hover:text-white hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
            >
              {copied ? (
                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              )}
            </button>
          </div>
        ) : isFull && !registered ? (
          <div className="flex gap-2">
            <span className="flex-1 text-center py-3 text-white/30 text-sm font-mono tracking-wide border border-white/10">
              FULLY BOOKED
            </span>
            <button
              onClick={handleShare}
              title="Copy share link"
              className="px-4 border border-white/10 text-white/60 hover:text-white hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
            >
              {copied ? (
                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              )}
            </button>
          </div>
        ) : !isSignedIn ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="flex-1 py-3 text-sm font-mono tracking-widest uppercase border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest)] transition-all duration-300">
                  SIGN IN TO REGISTER
                </button>
              </SignInButton>
              <button
                onClick={handleShare}
                title="Copy share link"
                className="px-4 border border-white/10 text-white/60 hover:text-white hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
              >
                {copied ? (
                  <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-center text-xs text-white/30 font-mono">
              Sign-in required · Meeting link shared upon registration
            </p>
          </div>
        ) : registered ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Link
                href={`/webinars/${webinar._id}`}
                className="flex-1 block text-center py-3 text-emerald-400 text-sm font-mono tracking-widest uppercase border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all"
              >
                ● JOIN SESSION
              </Link>
              <button
                onClick={handleShare}
                title="Copy share link"
                className="px-4 border border-white/10 text-white/60 hover:text-white hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
              >
                {copied ? (
                  <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                )}
              </button>
            </div>
            <button
              onClick={handleUnregister}
              disabled={loading}
              className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono tracking-wide text-center"
            >
              Cancel registration
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleRegister}
              disabled={loading}
              className="flex-1 py-3 text-sm font-mono tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'REGISTERING…' : 'REGISTER NOW'}
            </button>
            <button
              onClick={handleShare}
              title="Copy share link"
              className="px-4 border border-white/10 text-white/60 hover:text-white hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center"
            >
              {copied ? (
                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

function MyWebinars({ userId }) {
  const registrations = useQuery(api.registrations.listByUser, { clerkUserId: userId })
  const webinars = useQuery(api.webinars.list)

  if (!registrations || !webinars) return null
  if (registrations.length === 0) return null

  const myWebinars = webinars.filter((w) =>
    registrations.some((r) => r.webinarId === w._id)
  )

  if (myWebinars.length === 0) return null

  return (
    <section className="border-t border-white/10 pt-16 mt-16">
      <p className="eyebrow text-[var(--gold)] mb-6">Your registrations</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myWebinars.map((w) => (
          <WebinarCard key={w._id} webinar={w} />
        ))}
      </div>
    </section>
  )
}

export default function WebinarsPage() {
  const { isSignedIn, user } = useUser()
  const webinars = useQuery(api.webinars.list)

  const now = Date.now()
  const upcoming = webinars?.filter((w) => w.date + w.duration * 60 * 1000 >= now) ?? []
  const past = webinars?.filter((w) => w.date + w.duration * 60 * 1000 < now) ?? []

  return (
    <div className="bg-[#061b0e] min-h-screen text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24 px-6 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,179,75,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,85,34,0.18),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow text-[var(--gold)]">Live learning</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] max-w-3xl">
            Grow your knowledge.<br />
            <span className="text-[var(--gold)]">Live.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/60 leading-relaxed">
            Join our expert-led webinars on agribusiness, precision farming, sustainability, and more. Register, attend, and transform the way you farm.
          </p>
        </div>
      </section>

      {/* Webinars */}
      <section className="px-6 md:px-8 pb-32">
        <div className="mx-auto max-w-7xl">
          {webinars === undefined ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 border border-white/10 bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : upcoming.length === 0 && past.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
              <div className="w-16 h-px bg-[var(--gold)]" />
              <h2 className="font-display text-4xl text-white/60">Coming soon</h2>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Our first webinar series is being prepared. Sign in to be notified when sessions open for registration.
              </p>
              <div className="w-16 h-px bg-[var(--gold)]" />
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <>
                  <p className="eyebrow text-[var(--gold)] mb-8">Upcoming sessions</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map((w) => (
                      <WebinarCard key={w._id} webinar={w} />
                    ))}
                  </div>
                </>
              )}

              {past.length > 0 && (
                <div className="mt-20">
                  <p className="eyebrow text-white/30 mb-8">Past sessions</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                    {past.map((w) => (
                      <WebinarCard key={w._id} webinar={w} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {isSignedIn && user && <MyWebinars userId={user.id} />}
        </div>
      </section>
    </div>
  )
}
