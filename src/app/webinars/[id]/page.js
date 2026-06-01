'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { useUser, SignInButton } from '@clerk/nextjs'
import { useState } from 'react'
import Link from 'next/link'
import { api } from '../../../../convex/_generated/api'

const JitsiRoom = dynamic(() => import('../../../components/JitsiRoom'), { ssr: false })

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function WebinarRoomPage() {
  const { id } = useParams()
  const { isSignedIn, user } = useUser()

  const webinar = useQuery(api.webinars.get, id ? { id } : 'skip')
  const register = useMutation(api.registrations.register)
  const unregister = useMutation(api.registrations.unregister)
  const isRegistered = useQuery(
    api.registrations.isRegistered,
    isSignedIn && id ? { webinarId: id, clerkUserId: user.id } : 'skip'
  )
  const registrationCount = useQuery(
    api.registrations.listByWebinar,
    id ? { webinarId: id } : 'skip'
  )

  const [loading, setLoading] = useState(false)
  const [justRegistered, setJustRegistered] = useState(false)

  const registered = isRegistered || justRegistered
  const isPast = webinar ? webinar.date < Date.now() : false
  const isFull =
    webinar?.maxAttendees != null &&
    registrationCount != null &&
    registrationCount.length >= webinar.maxAttendees

  const roomName = id ? `pa-${id}` : null

  async function handleRegister() {
    if (!isSignedIn || !webinar) return
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
    if (!isSignedIn || !webinar) return
    setLoading(true)
    try {
      await unregister({ webinarId: webinar._id, clerkUserId: user.id })
      setJustRegistered(false)
    } finally {
      setLoading(false)
    }
  }

  if (webinar === undefined) {
    return (
      <div className="bg-[#061b0e] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border border-[var(--gold)]/40 border-t-[var(--gold)] rounded-full animate-spin" />
      </div>
    )
  }

  if (webinar === null) {
    return (
      <div className="bg-[#061b0e] min-h-screen flex flex-col items-center justify-center gap-4 text-white">
        <p className="font-mono text-white/40">Webinar not found.</p>
        <Link href="/webinars" className="editorial-link text-[var(--gold)] text-sm">
          ← Back to webinars
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#061b0e] min-h-screen text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 pt-24 pb-6 px-6 md:px-8">
        <div className="mx-auto max-w-7xl flex flex-col gap-3">
          <Link
            href="/webinars"
            className="editorial-link text-white/40 hover:text-white text-xs font-mono tracking-widest transition-colors"
          >
            ← ALL WEBINARS
          </Link>
          <div className="flex flex-wrap items-baseline gap-4">
            <h1 className="font-display text-3xl md:text-4xl leading-tight">
              {webinar.title}
            </h1>
            <span className="text-white/40 font-mono text-sm">
              {formatDate(webinar.date)} · {formatTime(webinar.date)} · {webinar.duration} min
            </span>
          </div>
          <p className="text-white/50 text-sm">
            Hosted by <span className="text-white/70">{webinar.hostName}</span>,{' '}
            {webinar.hostTitle}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 py-10 flex flex-col gap-8">
        {/* Gate: not signed in */}
        {!isSignedIn && (
          <div className="flex flex-col items-center justify-center gap-6 py-24 border border-white/10 bg-white/5">
            <div className="w-12 h-px bg-[var(--gold)]" />
            <p className="font-display text-2xl text-center">Sign in to access this session</p>
            <p className="text-white/40 text-sm text-center max-w-sm">
              You need a free account to register and attend Premier Agric webinars.
            </p>
            <SignInButton mode="modal">
              <button className="px-8 py-3 font-mono text-sm tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all">
                SIGN IN / CREATE ACCOUNT
              </button>
            </SignInButton>
            <div className="w-12 h-px bg-[var(--gold)]" />
          </div>
        )}

        {/* Gate: signed in, not registered */}
        {isSignedIn && !registered && !isPast && (
          <div className="flex flex-col items-center justify-center gap-6 py-24 border border-white/10 bg-white/5">
            <div className="w-12 h-px bg-[var(--gold)]" />
            <p className="font-display text-2xl text-center">Register to join this session</p>
            <p className="text-white/40 text-sm text-center max-w-sm leading-relaxed">
              {webinar.description}
            </p>
            {isFull ? (
              <span className="px-8 py-3 font-mono text-sm tracking-widest text-white/30 border border-white/10">
                FULLY BOOKED
              </span>
            ) : (
              <button
                onClick={handleRegister}
                disabled={loading}
                className="px-8 py-3 font-mono text-sm tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all disabled:opacity-50"
              >
                {loading ? 'REGISTERING…' : 'REGISTER & JOIN'}
              </button>
            )}
            {registrationCount != null && webinar.maxAttendees && (
              <p className="text-xs text-white/30 font-mono">
                {registrationCount.length}/{webinar.maxAttendees} spots filled
              </p>
            )}
            <div className="w-12 h-px bg-[var(--gold)]" />
          </div>
        )}

        {/* Past webinar — no room */}
        {isSignedIn && isPast && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 border border-white/10 bg-white/5">
            <p className="text-white/40 font-mono text-sm tracking-wide">THIS SESSION HAS ENDED</p>
            <p className="text-white/25 text-xs">Check upcoming sessions for future webinars.</p>
          </div>
        )}

        {/* Live room */}
        {isSignedIn && registered && !isPast && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-mono text-xs tracking-widest">● LIVE SESSION ROOM</span>
              <button
                onClick={handleUnregister}
                disabled={loading}
                className="text-xs text-white/25 hover:text-white/50 font-mono transition-colors"
              >
                Cancel registration
              </button>
            </div>
            <JitsiRoom
              roomName={roomName}
              displayName={user.fullName ?? user.primaryEmailAddress?.emailAddress}
              userEmail={user.primaryEmailAddress?.emailAddress}
            />
            <p className="text-xs text-white/25 font-mono text-center">
              Room · {roomName} · Only registered attendees see this link
            </p>
          </div>
        )}

        {/* About this session */}
        <div className="border-t border-white/10 pt-8 grid md:grid-cols-2 gap-8">
          <div>
            <p className="eyebrow text-[var(--gold)] mb-4">About this session</p>
            <p className="text-white/60 leading-relaxed text-sm">{webinar.description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-[var(--gold)] mb-0">Details</p>
            <div className="space-y-2 font-mono text-xs text-white/40">
              <p>Date · {formatDate(webinar.date)}</p>
              <p>Time · {formatTime(webinar.date)} SAST</p>
              <p>Duration · {webinar.duration} minutes</p>
              <p>Host · {webinar.hostName}</p>
              <p>Topic · {webinar.topic}</p>
              {registrationCount != null && (
                <p>
                  Registered ·{' '}
                  {registrationCount.length}
                  {webinar.maxAttendees ? `/${webinar.maxAttendees}` : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
