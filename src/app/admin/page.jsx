'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { useUser, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { api } from '../../../convex/_generated/api'

// Sub-component to display registrations in a real-time reactive drawer/list
function WebinarRegistrations({ webinarId }) {
  const registrations = useQuery(api.registrations.listByWebinar, { webinarId })

  if (registrations === undefined) {
    return (
      <div className="mt-3 border-t border-white/10 pt-3 flex justify-center py-2">
        <div className="w-4 h-4 border border-[var(--gold)]/40 border-t-[var(--gold)] rounded-full animate-spin" />
      </div>
    )
  }

  if (registrations === null || registrations.length === 0) {
    return (
      <div className="mt-3 border-t border-white/5 pt-3">
        <p className="text-xs text-white/30 font-mono italic">No attendees registered yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-3 border-t border-white/10 pt-3">
      <p className="text-xs text-[var(--gold)] font-mono mb-2 uppercase tracking-wider">
        Registered Attendees ({registrations.length})
      </p>
      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
        {registrations.map((r) => (
          <div
            key={r._id}
            className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0"
          >
            <span className="font-medium text-white/80">{r.userName}</span>
            <span className="text-white/40 font-mono select-all">{r.userEmail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function timestampToDatetimeLocal(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-ZA', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminPortalPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const webinars = useQuery(api.webinars.listAll)

  const createWebinar = useMutation(api.webinars.create)
  const updateWebinar = useMutation(api.webinars.update)
  const removeWebinar = useMutation(api.webinars.remove)

  const initialFormState = {
    title: '',
    description: '',
    date: '',
    duration: 60,
    hostName: '',
    hostTitle: '',
    topic: 'Agribusiness',
    maxAttendees: '',
    imageUrl: '',
    meetingLink: '',
    isPublished: true,
  }

  const [formData, setFormData] = useState(initialFormState)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [expandedAttendeesId, setExpandedAttendeesId] = useState(null)

  if (!isLoaded) {
    return (
      <div className="bg-[#061b0e] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border border-[var(--gold)]/40 border-t-[var(--gold)] rounded-full animate-spin" />
      </div>
    )
  }

  const email = user?.primaryEmailAddress?.emailAddress
  const isAdmin =
    isSignedIn &&
    (user.publicMetadata?.role === 'admin' ||
      email === 'lgumbi2169@gmail.com' ||
      email?.endsWith('@premieragric.co.za'))

  if (!isAdmin) {
    return (
      <div className="bg-[#061b0e] min-h-screen flex flex-col items-center justify-center gap-6 text-white px-6">
        <div className="w-16 h-px bg-red-500" />
        <h1 className="font-display text-3xl text-center">Access Denied</h1>
        <p className="text-white/40 text-sm text-center max-w-sm leading-relaxed">
          You do not have administrative privileges to access this portal. Please sign in with an authorized administrator account.
        </p>
        {isSignedIn ? (
          <Link
            href="/webinars"
            className="px-6 py-2 border border-white/10 text-white/60 hover:text-white transition-all text-sm font-mono tracking-wider"
          >
            BACK TO WEBINARS
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="px-8 py-3 font-mono text-sm tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all">
              SIGN IN
            </button>
          </SignInButton>
        )}
        <div className="w-16 h-px bg-red-500" />
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const parsedDate = new Date(formData.date).getTime()
      if (isNaN(parsedDate)) {
        throw new Error('Please select a valid date and time.')
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        date: parsedDate,
        duration: Number(formData.duration),
        hostName: formData.hostName,
        hostTitle: formData.hostTitle,
        topic: formData.topic,
        maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : undefined,
        imageUrl: formData.imageUrl || undefined,
        meetingLink: formData.meetingLink || undefined,
      }

      if (editingId) {
        await updateWebinar({
          id: editingId,
          ...payload,
          isPublished: formData.isPublished,
        })
        setSuccessMessage('Webinar details updated successfully!')
      } else {
        await createWebinar(payload)
        setSuccessMessage('Webinar created successfully!')
      }

      setFormData(initialFormState)
      setEditingId(null)
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while saving the webinar.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (webinar) => {
    setEditingId(webinar._id)
    setFormData({
      title: webinar.title,
      description: webinar.description,
      date: timestampToDatetimeLocal(webinar.date),
      duration: webinar.duration,
      hostName: webinar.hostName,
      hostTitle: webinar.hostTitle,
      topic: webinar.topic,
      maxAttendees: webinar.maxAttendees ?? '',
      imageUrl: webinar.imageUrl ?? '',
      meetingLink: webinar.meetingLink ?? '',
      isPublished: webinar.isPublished ?? true,
    })
    setSuccessMessage('')
    setErrorMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete the webinar "${title}"?`)) {
      try {
        await removeWebinar({ id })
        if (editingId === id) {
          setEditingId(initialFormState)
          setEditingId(null)
        }
      } catch (err) {
        alert('Failed to delete webinar: ' + err.message)
      }
    }
  }

  const handleCopyLink = (webinarId) => {
    const link = `${window.location.origin}/webinars/${webinarId}`
    navigator.clipboard.writeText(link)
    setCopiedId(webinarId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData(initialFormState)
    setSuccessMessage('')
    setErrorMessage('')
  }

  const upcomingWebinars = webinars?.filter((w) => w.date >= Date.now()) ?? []
  const pastWebinars = webinars?.filter((w) => w.date < Date.now()) ?? []

  return (
    <div className="bg-[#061b0e] min-h-screen text-white pt-24 pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 px-6 md:px-8 mb-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="eyebrow text-[var(--gold)]">SYSTEM CONSOLE</span>
            <h1 className="font-display text-3xl md:text-4xl leading-tight mt-1">
              Webinar Administration
            </h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/webinars"
              className="editorial-link text-white/50 hover:text-white text-xs font-mono tracking-widest transition-colors self-center"
            >
              ← VIEW PUBLIC PORTAL
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
            <p className="eyebrow text-[var(--gold)] mb-4">
              {editingId ? 'Edit Session' : 'Create New Session'}
            </p>

            {successMessage && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 mb-6 text-sm font-mono">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 mb-6 text-sm font-mono">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                  Webinar Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Precision Drone Mapping in Agribusiness"
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the topics covered and what attendees will learn..."
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                    Duration (Min)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                    Host Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hostName}
                    onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                    placeholder="e.g. Dr. Silas Gumbi"
                    className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                    Host Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hostTitle}
                    onChange={(e) => setFormData({ ...formData, hostTitle: e.target.value })}
                    placeholder="e.g. Agronomist & Drone Pilot"
                    className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                    Topic Category
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                  >
                    <option value="Agribusiness" className="bg-[#061b0e]">Agribusiness</option>
                    <option value="Drone Mapping" className="bg-[#061b0e]">Drone Mapping</option>
                    <option value="Data & Analytics" className="bg-[#061b0e]">Data & Analytics</option>
                    <option value="Sustainability" className="bg-[#061b0e]">Sustainability</option>
                    <option value="Finance" className="bg-[#061b0e]">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                    Max Capacity (Opt)
                  </label>
                  <input
                    type="number"
                    min={1}
                    placeholder="Unlimited"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                  Meeting Link (Optional Zoom/Teams/Meet)
                </label>
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  placeholder="If empty, built-in Jitsi Room is used"
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                />
              </div>

              {editingId && (
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-[var(--gold)] rounded"
                  />
                  <label htmlFor="isPublished" className="text-sm font-mono text-white/70 cursor-pointer">
                    Publish immediately
                  </label>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 font-mono text-xs tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all font-semibold disabled:opacity-50"
                >
                  {submitting ? 'SAVING…' : editingId ? 'UPDATE WEBINAR' : 'CREATE WEBINAR'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-3 font-mono text-xs tracking-widest uppercase border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {webinars === undefined ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-44 border border-white/10 bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : webinars.length === 0 ? (
            <div className="border border-white/10 bg-white/5 p-12 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-px bg-[var(--gold)]" />
              <p className="text-white/40 font-mono text-sm">No webinars found in database.</p>
              <div className="w-12 h-px bg-[var(--gold)]" />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Webinars */}
              {upcomingWebinars.length > 0 && (
                <div>
                  <p className="eyebrow text-[var(--gold)] mb-4">Upcoming Webinars ({upcomingWebinars.length})</p>
                  <div className="space-y-4">
                    {upcomingWebinars.map((w) => (
                      <div
                        key={w._id}
                        className="border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/8"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="inline-block text-[10px] font-mono border border-[var(--gold)]/30 text-[var(--gold)] px-2 py-0.5 uppercase tracking-widest mb-2">
                              {w.topic}
                            </span>
                            <h3 className="font-display text-lg text-white font-medium">{w.title}</h3>
                            <p className="text-xs text-white/50 font-mono mt-1">
                              {formatDate(w.date)} @ {formatTime(w.date)} SAST ({w.duration} mins)
                            </p>
                            <p className="text-xs text-white/40 mt-1 font-mono">
                              Host: {w.hostName} ({w.hostTitle})
                            </p>
                            {w.meetingLink && (
                              <p className="text-[10px] text-emerald-400 font-mono mt-1 select-all">
                                Custom Link: {w.meetingLink}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-xs font-mono text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-1">
                              {!w.isPublished ? 'DRAFT' : 'ACTIVE'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/5">
                          <button
                            onClick={() => handleCopyLink(w._id)}
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all flex items-center gap-1.5 text-white/70 hover:text-white"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                            {copiedId === w._id ? 'Copied!' : 'Copy Share Link'}
                          </button>
                          <button
                            onClick={() => handleEdit(w)}
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-blue-500/40 hover:bg-white/5 transition-all text-white/70 hover:text-white"
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={() => handleDelete(w._id, w.title)}
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-red-500/40 hover:bg-white/5 transition-all text-white/70 hover:text-red-400"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              setExpandedAttendeesId(
                                expandedAttendeesId === w._id ? null : w._id
                              )
                            }
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all text-white/70 hover:text-white ml-auto"
                          >
                            {expandedAttendeesId === w._id ? 'Hide Attendees' : 'View Attendees'}
                          </button>
                        </div>

                        {expandedAttendeesId === w._id && (
                          <WebinarRegistrations webinarId={w._id} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Webinars */}
              {pastWebinars.length > 0 && (
                <div>
                  <p className="eyebrow text-white/30 mb-4">Past Sessions ({pastWebinars.length})</p>
                  <div className="space-y-4 opacity-75 hover:opacity-100 transition-opacity">
                    {pastWebinars.map((w) => (
                      <div
                        key={w._id}
                        className="border border-white/10 bg-white/5 p-5 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="inline-block text-[10px] font-mono border border-white/20 text-white/40 px-2 py-0.5 uppercase tracking-widest mb-2">
                              {w.topic}
                            </span>
                            <h3 className="font-display text-lg text-white/60 font-medium">{w.title}</h3>
                            <p className="text-xs text-white/40 font-mono mt-1">
                              {formatDate(w.date)} @ {formatTime(w.date)} SAST ({w.duration} mins)
                            </p>
                          </div>
                          <div className="shrink-0">
                            <span className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-1">
                              ENDED
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/5">
                          <button
                            onClick={() => handleCopyLink(w._id)}
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all flex items-center gap-1.5 text-white/70 hover:text-white"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                            {copiedId === w._id ? 'Copied!' : 'Copy Share Link'}
                          </button>
                          <button
                            onClick={() => handleEdit(w)}
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-blue-500/40 hover:bg-white/5 transition-all text-white/70 hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(w._id, w.title)}
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-red-500/40 hover:bg-white/5 transition-all text-white/70 hover:text-red-400"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              setExpandedAttendeesId(
                                expandedAttendeesId === w._id ? null : w._id
                              )
                            }
                            className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all text-white/70 hover:text-white ml-auto"
                          >
                            {expandedAttendeesId === w._id ? 'Hide Attendees' : 'View Attendees'}
                          </button>
                        </div>

                        {expandedAttendeesId === w._id && (
                          <WebinarRegistrations webinarId={w._id} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
