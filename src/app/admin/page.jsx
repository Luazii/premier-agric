'use client'

import { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { useUser, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { api } from '../../../convex/_generated/api'
import { Newspaper, Video, Upload, Image as ImageIcon, Check, Trash2, Edit, Plus, Eye, EyeOff, Sparkles } from 'lucide-react'

// Sub-component to display registrations in a real-time reactive drawer/list
function WebinarRegistrations({ webinarId }) {
  const registrationsQuery = api?.registrations?.listByWebinar ? api.registrations.listByWebinar : 'skip'
  const registrations = useQuery(registrationsQuery, { webinarId })

  if (registrations === undefined) {
    return (
      <div className="mt-3 border-t border-white/10 pt-3 flex justify-center py-2">
        <div className="w-4 h-4 border border-[var(--gold)]/40 border-t-[var(--gold)] rounded-full animate-spin" />
      </div>
    )
  }

  if (!Array.isArray(registrations) || registrations.length === 0) {
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
  try {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  } catch (e) {
    return ''
  }
}

function formatDate(timestamp) {
  if (!timestamp) return ''
  try {
    const d = new Date(timestamp)
    if (isNaN(d.getTime())) return String(timestamp)
    return d.toLocaleDateString('en-ZA', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch (e) {
    return String(timestamp)
  }
}

function formatTime(timestamp) {
  if (!timestamp) return ''
  try {
    const d = new Date(timestamp)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (e) {
    return ''
  }
}

export default function AdminPortalPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [activeTab, setActiveTab] = useState('newsletters') // 'newsletters' | 'webinars'

  // Webinars Data
  const webinars = useQuery(api?.webinars?.listAll ?? 'skip')
  const createWebinar = useMutation(api.webinars.create)
  const updateWebinar = useMutation(api.webinars.update)
  const removeWebinar = useMutation(api.webinars.remove)

  // Newsletters Data
  const newsletters = useQuery(api?.newsletters?.listAll ?? 'skip')
  const createNewsletter = useMutation(api.newsletters.create)
  const updateNewsletter = useMutation(api.newsletters.update)
  const removeNewsletter = useMutation(api.newsletters.remove)
  const generateUploadUrl = useMutation(api.newsletters.generateUploadUrl)

  // Webinar Form State
  const initialWebinarState = {
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
  const [webinarFormData, setWebinarFormData] = useState(initialWebinarState)
  const [editingWebinarId, setEditingWebinarId] = useState(null)

  // Newsletter Form State
  const initialNewsletterState = {
    title: '',
    issue: 'Issue #' + (Array.isArray(newsletters) ? newsletters.length + 1 : 1),
    category: 'Agritech & Innovation',
    readTime: '4 min read',
    summary: '',
    content: '',
    author: 'Premier Agric Editorial Desk',
    imageUrl: '',
    highlightsText: '',
    isPublished: true,
  }
  const [newsletterFormData, setNewsletterFormData] = useState(initialNewsletterState)
  const [editingNewsletterId, setEditingNewsletterId] = useState(null)
  const [selectedNewsletterPhoto, setSelectedNewsletterPhoto] = useState(null)

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

  const userEmails = (user?.emailAddresses || []).map((e) => e.emailAddress?.toLowerCase()).filter(Boolean)
  if (user?.primaryEmailAddress?.emailAddress) {
    userEmails.push(user.primaryEmailAddress.emailAddress.toLowerCase())
  }

  const ALLOWED_ADMINS = [
    'lgumbi2169@gmail.com',
    'support@premieragric.co.za',
    'premieragric1@gmail.com',
  ]

  const isAdmin =
    isSignedIn &&
    (user?.publicMetadata?.role === 'admin' ||
      userEmails.some(
        (e) =>
          ALLOWED_ADMINS.includes(e) ||
          e.endsWith('@premieragric.co.za')
      ))

  if (!isAdmin) {
    return (
      <div className="bg-[#061b0e] min-h-screen flex flex-col items-center justify-center gap-6 text-white px-6">
        <div className="w-16 h-px bg-red-500" />
        <h1 className="font-display text-3xl text-center">Access Denied</h1>
        <p className="text-white/40 text-sm text-center max-w-sm leading-relaxed">
          You do not have administrative privileges to access this portal. Please sign in with an authorized administrator account (e.g. lgumbi2169@gmail.com, support@premieragric.co.za, premieragric1@gmail.com).
        </p>
        {isSignedIn ? (
          <Link
            href="/news"
            className="px-6 py-2 border border-white/10 text-white/60 hover:text-white transition-all text-sm font-mono tracking-wider"
          >
            BACK TO NEWS
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

  // Handle Photo File Upload for Newsletter
  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo is too large. Please upload an image under 5MB.')
      return
    }
    setSelectedNewsletterPhoto(file)
    setNewsletterFormData((prev) => ({
      ...prev,
      imageUrl: URL.createObjectURL(file),
    }))
  }

  // Submit Newsletter Form
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const highlightsArray = newsletterFormData.highlightsText
        ? newsletterFormData.highlightsText.split('\n').map((s) => s.trim()).filter(Boolean)
        : []

      let storageId = undefined;
      if (selectedNewsletterPhoto) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedNewsletterPhoto.type },
          body: selectedNewsletterPhoto,
        });
        const uploadResult = await result.json();
        storageId = uploadResult.storageId;
      }

      const payload = {
        title: newsletterFormData.title,
        issue: newsletterFormData.issue,
        category: newsletterFormData.category,
        readTime: newsletterFormData.readTime,
        summary: newsletterFormData.summary,
        content: newsletterFormData.content,
        author: newsletterFormData.author,
        imageUrl: !selectedNewsletterPhoto ? (newsletterFormData.imageUrl || undefined) : undefined,
        storageId,
        highlights: highlightsArray.length > 0 ? highlightsArray : undefined,
        isPublished: newsletterFormData.isPublished,
      }

      if (editingNewsletterId) {
        await updateNewsletter({
          id: editingNewsletterId,
          ...payload,
        })
        setSuccessMessage('Newsletter updated successfully! Changes are live.')
      } else {
        await createNewsletter(payload)
        setSuccessMessage('Newsletter created and published successfully!')
      }

      setNewsletterFormData(initialNewsletterState)
      setEditingNewsletterId(null)
      setSelectedNewsletterPhoto(null)
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while saving the newsletter.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditNewsletter = (item) => {
    setEditingNewsletterId(item._id)
    setSelectedNewsletterPhoto(null)
    setNewsletterFormData({
      title: item.title,
      issue: item.issue,
      category: item.category,
      readTime: item.readTime,
      summary: item.summary,
      content: item.content,
      author: item.author,
      imageUrl: item.imageUrl || '',
      highlightsText: item.highlights ? item.highlights.join('\n') : '',
      isPublished: item.isPublished ?? true,
    })
    setSuccessMessage('')
    setErrorMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteNewsletter = async (id, title) => {
    if (confirm(`Are you sure you want to delete the newsletter "${title}"?`)) {
      try {
        await removeNewsletter({ id })
        if (editingNewsletterId === id) {
          setEditingNewsletterId(null)
          setNewsletterFormData(initialNewsletterState)
          setSelectedNewsletterPhoto(null)
        }
      } catch (err) {
        alert('Failed to delete newsletter: ' + err.message)
      }
    }
  }

  // Submit Webinar Form
  const handleWebinarSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const parsedDate = new Date(webinarFormData.date).getTime()
      if (isNaN(parsedDate)) {
        throw new Error('Please select a valid date and time.')
      }

      const payload = {
        title: webinarFormData.title,
        description: webinarFormData.description,
        date: parsedDate,
        duration: Number(webinarFormData.duration),
        hostName: webinarFormData.hostName,
        hostTitle: webinarFormData.hostTitle,
        topic: webinarFormData.topic,
        maxAttendees: webinarFormData.maxAttendees ? Number(webinarFormData.maxAttendees) : undefined,
        imageUrl: webinarFormData.imageUrl || undefined,
        meetingLink: webinarFormData.meetingLink || undefined,
      }

      if (editingWebinarId) {
        await updateWebinar({
          id: editingWebinarId,
          ...payload,
          isPublished: webinarFormData.isPublished,
        })
        setSuccessMessage('Webinar details updated successfully!')
      } else {
        await createWebinar(payload)
        setSuccessMessage('Webinar created successfully!')
      }

      setWebinarFormData(initialWebinarState)
      setEditingWebinarId(null)
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while saving the webinar.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditWebinar = (webinar) => {
    setEditingWebinarId(webinar._id)
    setWebinarFormData({
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

  const handleDeleteWebinar = async (id, title) => {
    if (confirm(`Are you sure you want to delete the webinar "${title}"?`)) {
      try {
        await removeWebinar({ id })
        if (editingWebinarId === id) {
          setEditingWebinarId(null)
          setWebinarFormData(initialWebinarState)
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

  const upcomingWebinars = Array.isArray(webinars)
    ? webinars.filter((w) => w.date + w.duration * 60 * 1000 >= Date.now())
    : []
  const pastWebinars = Array.isArray(webinars)
    ? webinars.filter((w) => w.date + w.duration * 60 * 1000 < Date.now())
    : []

  const newsletterList = Array.isArray(newsletters) ? newsletters : []

  return (
    <div className="bg-[#061b0e] min-h-screen text-white pt-24 pb-16">
      {/* Header & Tabs */}
      <div className="border-b border-white/10 pb-6 px-6 md:px-8 mb-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="eyebrow text-[var(--gold)]">SYSTEM CONSOLE</span>
            <h1 className="font-display text-3xl md:text-4xl leading-tight mt-1">
              Admin Portal
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/news"
              className="px-4 py-2 border border-white/10 text-white/60 hover:text-white text-xs font-mono tracking-wider transition-colors"
            >
              ← VIEW NEWS PAGE
            </Link>
            <Link
              href="/newsletters"
              className="px-4 py-2 border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--forest)] text-xs font-mono tracking-wider transition-colors"
            >
              VIEW NEWSLETTERS
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mx-auto max-w-7xl mt-8 flex border-b border-white/10 gap-8">
          <button
            onClick={() => {
              setActiveTab('newsletters')
              setSuccessMessage('')
              setErrorMessage('')
            }}
            className={`pb-4 text-sm font-mono tracking-wider uppercase flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'newsletters'
                ? 'border-[var(--gold)] text-[var(--gold)] font-semibold'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            Upload Newsletters ({newsletterList.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('webinars')
              setSuccessMessage('')
              setErrorMessage('')
            }}
            className={`pb-4 text-sm font-mono tracking-wider uppercase flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'webinars'
                ? 'border-[var(--gold)] text-[var(--gold)] font-semibold'
                : 'border-transparent text-white/40 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            Manage Webinars ({Array.isArray(webinars) ? webinars.length : 0})
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Success / Error Banners */}
        {successMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 mb-8 text-sm font-mono flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 mb-8 text-sm font-mono">
            {errorMessage}
          </div>
        )}

        {/* TAB 1: NEWSLETTERS MANAGEMENT */}
        {activeTab === 'newsletters' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Newsletter Upload Form */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="eyebrow text-[var(--gold)] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[var(--gold)]" />
                    {editingNewsletterId ? 'Edit Newsletter Issue' : 'Upload New Newsletter'}
                  </p>
                  {editingNewsletterId && (
                    <span className="text-xs font-mono text-[var(--gold)] border border-[var(--gold)]/30 px-2 py-0.5">
                      EDITING MODE
                    </span>
                  )}
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                      Newsletter Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newsletterFormData.title}
                      onChange={(e) => setNewsletterFormData({ ...newsletterFormData, title: e.target.value })}
                      placeholder="e.g. Precision Farming & Drone Telemetry Benchmarks"
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                        Issue / Edition *
                      </label>
                      <input
                        type="text"
                        required
                        value={newsletterFormData.issue}
                        onChange={(e) => setNewsletterFormData({ ...newsletterFormData, issue: e.target.value })}
                        placeholder="e.g. Issue #09"
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                        Category *
                      </label>
                      <select
                        value={newsletterFormData.category}
                        onChange={(e) => setNewsletterFormData({ ...newsletterFormData, category: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                      >
                        <option value="Agritech & Innovation" className="bg-[#061b0e]">Agritech & Innovation</option>
                        <option value="Soil & Climate Resilience" className="bg-[#061b0e]">Soil & Climate Resilience</option>
                        <option value="Community Impact" className="bg-[#061b0e]">Community Impact</option>
                        <option value="Finance & Growth" className="bg-[#061b0e]">Finance & Growth</option>
                        <option value="General News" className="bg-[#061b0e]">General News</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={newsletterFormData.author}
                        onChange={(e) => setNewsletterFormData({ ...newsletterFormData, author: e.target.value })}
                        placeholder="Premier Agric Desk"
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                        Estimated Read Time
                      </label>
                      <input
                        type="text"
                        value={newsletterFormData.readTime}
                        onChange={(e) => setNewsletterFormData({ ...newsletterFormData, readTime: e.target.value })}
                        placeholder="e.g. 4 min read"
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                      Short Summary / Teaser Excerpt *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newsletterFormData.summary}
                      onChange={(e) => setNewsletterFormData({ ...newsletterFormData, summary: e.target.value })}
                      placeholder="Write a compelling 2-3 sentence teaser shown on the newsletter cards..."
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                      Full Article Body *
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={newsletterFormData.content}
                      onChange={(e) => setNewsletterFormData({ ...newsletterFormData, content: e.target.value })}
                      placeholder="Write the full newsletter text, sections, and details..."
                      className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                      Key Highlights (1 per line)
                    </label>
                    <textarea
                      rows={3}
                      value={newsletterFormData.highlightsText}
                      onChange={(e) => setNewsletterFormData({ ...newsletterFormData, highlightsText: e.target.value })}
                      placeholder="22% cost reduction in fertilizer&#10;14% increase in crop yield&#10;Multispectral scanning active"
                      className="w-full bg-white/5 border border-white/10 p-3 text-xs font-mono text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div className="border border-dashed border-white/20 p-4 rounded-sm bg-white/5">
                    <label className="block text-xs font-mono text-[var(--gold)] uppercase mb-2 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      Attach Newsletter Photo
                    </label>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="cursor-pointer px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-all shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        Choose Photo File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-white/30 font-mono">or enter Image URL below</span>
                    </div>

                    <input
                      type="url"
                      value={newsletterFormData.imageUrl}
                      onChange={(e) => setNewsletterFormData({ ...newsletterFormData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="mt-3 w-full bg-white/5 border border-white/10 p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[var(--gold)]"
                    />

                    {newsletterFormData.imageUrl && (
                      <div className="mt-3 relative w-full h-32 border border-white/20 rounded-sm overflow-hidden bg-black/40">
                        <img
                          src={newsletterFormData.imageUrl}
                          alt="Uploaded photo preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setNewsletterFormData((prev) => ({ ...prev, imageUrl: '' }))
                            setSelectedNewsletterPhoto(null)
                          }}
                          className="absolute top-2 right-2 px-2 py-1 bg-red-600/80 hover:bg-red-600 text-white text-[10px] font-mono"
                        >
                          Remove Photo
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="newsletterPublished"
                      checked={newsletterFormData.isPublished}
                      onChange={(e) => setNewsletterFormData({ ...newsletterFormData, isPublished: e.target.checked })}
                      className="w-4 h-4 accent-[var(--gold)] rounded"
                    />
                    <label htmlFor="newsletterPublished" className="text-sm font-mono text-white/70 cursor-pointer">
                      Publish immediately on website
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 font-mono text-xs tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all font-semibold disabled:opacity-50"
                    >
                      {submitting ? 'SAVING…' : editingNewsletterId ? 'UPDATE NEWSLETTER' : 'UPLOAD NEWSLETTER'}
                    </button>
                    {editingNewsletterId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNewsletterId(null)
                          setNewsletterFormData(initialNewsletterState)
                          setSelectedNewsletterPhoto(null)
                        }}
                        className="px-4 py-3 font-mono text-xs tracking-widest uppercase border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Newsletter List */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-[var(--gold)]">
                  Published & Saved Newsletters ({newsletterList.length})
                </p>
                <Link
                  href="/newsletters"
                  target="_blank"
                  className="text-xs font-mono text-white/40 hover:text-[var(--gold)]"
                >
                  View Public Archive ↗
                </Link>
              </div>

              {newsletters === undefined ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-32 border border-white/10 bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : newsletterList.length === 0 ? (
                <div className="border border-white/10 bg-white/5 p-12 text-center flex flex-col items-center gap-4">
                  <Newspaper className="w-8 h-8 text-white/20" />
                  <p className="text-white/40 font-mono text-sm">No uploaded newsletters yet.</p>
                  <p className="text-white/30 text-xs">Fill out the form on the left to upload your first newsletter photo and text.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {newsletterList.map((item) => (
                    <div
                      key={item._id}
                      className="border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/8 rounded-sm"
                    >
                      {item.imageUrl && (
                        <div className="w-full h-32 mb-4 overflow-hidden border border-white/10 rounded-sm">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono border border-[var(--gold)]/30 text-[var(--gold)] px-2 py-0.5 uppercase tracking-wider">
                              {item.category}
                            </span>
                            <span className="text-[10px] font-mono text-white/40">
                              {item.issue} · {item.readTime}
                            </span>
                          </div>
                          <h3 className="font-display text-lg text-white font-medium leading-snug">{item.title}</h3>
                          <p className="text-xs text-white/50 line-clamp-2 mt-2">{item.summary}</p>
                        </div>
                        
                        <span className={`text-[10px] font-mono px-2 py-1 shrink-0 ${item.isPublished ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                          {item.isPublished ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs font-mono">
                        <span className="text-white/30">Uploaded by {item.author}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditNewsletter(item)}
                            className="px-3 py-1 border border-white/10 hover:border-blue-500/40 text-white/70 hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNewsletter(item._id, item.title)}
                            className="px-3 py-1 border border-white/10 hover:border-red-500/40 text-white/70 hover:text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: WEBINARS MANAGEMENT */}
        {activeTab === 'webinars' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Webinar Form Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
                <p className="eyebrow text-[var(--gold)] mb-4">
                  {editingWebinarId ? 'Edit Session' : 'Create New Webinar Session'}
                </p>

                <form onSubmit={handleWebinarSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/40 uppercase mb-1.5">
                      Webinar Title
                    </label>
                    <input
                      type="text"
                      required
                      value={webinarFormData.title}
                      onChange={(e) => setWebinarFormData({ ...webinarFormData, title: e.target.value })}
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
                      value={webinarFormData.description}
                      onChange={(e) => setWebinarFormData({ ...webinarFormData, description: e.target.value })}
                      placeholder="Describe the topics covered..."
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
                        value={webinarFormData.date}
                        onChange={(e) => setWebinarFormData({ ...webinarFormData, date: e.target.value })}
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
                        value={webinarFormData.duration}
                        onChange={(e) => setWebinarFormData({ ...webinarFormData, duration: e.target.value })}
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
                        value={webinarFormData.hostName}
                        onChange={(e) => setWebinarFormData({ ...webinarFormData, hostName: e.target.value })}
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
                        value={webinarFormData.hostTitle}
                        onChange={(e) => setWebinarFormData({ ...webinarFormData, hostTitle: e.target.value })}
                        placeholder="e.g. Agronomist & Pilot"
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
                        value={webinarFormData.topic}
                        onChange={(e) => setWebinarFormData({ ...webinarFormData, topic: e.target.value })}
                        className="w-full bg-[#061b0e] border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
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
                        value={webinarFormData.maxAttendees}
                        onChange={(e) => setWebinarFormData({ ...webinarFormData, maxAttendees: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 p-3 text-sm text-white focus:outline-none focus:border-[var(--gold)]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isPublishedWebinar"
                      checked={webinarFormData.isPublished}
                      onChange={(e) => setWebinarFormData({ ...webinarFormData, isPublished: e.target.checked })}
                      className="w-4 h-4 accent-[var(--gold)] rounded"
                    />
                    <label htmlFor="isPublishedWebinar" className="text-sm font-mono text-white/70 cursor-pointer">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 font-mono text-xs tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all font-semibold disabled:opacity-50"
                    >
                      {submitting ? 'SAVING…' : editingWebinarId ? 'UPDATE WEBINAR' : 'CREATE WEBINAR'}
                    </button>
                    {editingWebinarId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWebinarId(null)
                          setWebinarFormData(initialWebinarState)
                        }}
                        className="px-4 py-3 font-mono text-xs tracking-widest uppercase border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                      >
                        CANCEL
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Webinar List Column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {webinars === undefined ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-44 border border-white/10 bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : !Array.isArray(webinars) || webinars.length === 0 ? (
                <div className="border border-white/10 bg-white/5 p-12 text-center flex flex-col items-center gap-4">
                  <Video className="w-8 h-8 text-white/20" />
                  <p className="text-white/40 font-mono text-sm">No webinars found in database.</p>
                </div>
              ) : (
                <div className="space-y-8">
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
                              </div>
                              <span className="text-xs font-mono text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-1">
                                {!w.isPublished ? 'DRAFT' : 'ACTIVE'}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/5">
                              <button
                                onClick={() => handleCopyLink(w._id)}
                                className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-[var(--gold)]/40 hover:bg-white/5 transition-all flex items-center gap-1.5 text-white/70 hover:text-white"
                              >
                                {copiedId === w._id ? 'Copied!' : 'Copy Share Link'}
                              </button>
                              <button
                                onClick={() => handleEditWebinar(w)}
                                className="text-xs font-mono py-1.5 px-3 border border-white/10 hover:border-blue-500/40 hover:bg-white/5 transition-all text-white/70 hover:text-white"
                              >
                                Edit Details
                              </button>
                              <button
                                onClick={() => handleDeleteWebinar(w._id, w.title)}
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
                              </div>
                              <span className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-1">
                                ENDED
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-white/5">
                              <button
                                onClick={() => handleEditWebinar(w)}
                                className="text-xs font-mono py-1.5 px-3 border border-white/10 text-white/70 hover:text-white"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteWebinar(w._id, w.title)}
                                className="text-xs font-mono py-1.5 px-3 border border-white/10 text-white/70 hover:text-red-400"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
