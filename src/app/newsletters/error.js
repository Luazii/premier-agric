'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Newsletters page error:', error)
  }, [error])

  return (
    <div className="bg-[#061b0e] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full border border-white/10 bg-white/5 backdrop-blur-md p-8 rounded-sm">
        <div className="w-12 h-12 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-[var(--gold)] text-xl font-mono">!</span>
        </div>
        <h2 className="font-display text-2xl text-white mb-2">Unable to load newsletters</h2>
        <p className="text-sm text-white/60 mb-6 font-sans">
          We encountered a temporary network issue loading the newsletters archive. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 px-6 py-3 bg-[var(--gold)] text-[var(--forest)] font-mono text-xs font-semibold tracking-wider uppercase hover:brightness-105 transition-all"
          >
            Try Again
          </button>
          <Link
            href="/news"
            className="flex-1 px-6 py-3 border border-white/20 text-white font-mono text-xs tracking-wider uppercase hover:bg-white/10 transition-all"
          >
            Back to News
          </Link>
        </div>
      </div>
    </div>
  )
}
