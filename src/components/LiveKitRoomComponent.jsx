'use client'

import { useEffect, useState } from 'react'
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from '@livekit/components-react'
import '@livekit/components-styles'

export default function LiveKitRoomComponent({ roomName, displayName }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState(null)

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const params = new URLSearchParams({
          room: roomName,
          name: displayName || '',
        })
        const res = await fetch(`/api/livekit?${params.toString()}`)
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          // Surface the server's message when it's informative
          const msg =
            data?.error?.replace(/^(Forbidden|Unauthorized|Not Found):\s*/i, '') ||
            'Could not connect to the session. Please try again.'
          throw new Error(msg)
        }
        const data = await res.json()
        setToken(data.token)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Could not connect to the session.')
      }
    }

    fetchToken()
  }, [roomName, displayName])

  if (error) {
    return (
      <div className="p-10 text-center bg-[#061b0e] border border-white/10 flex flex-col items-center gap-3">
        <svg className="w-6 h-6 fill-red-400/60" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <p className="text-red-400 text-sm font-mono">{error}</p>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="p-10 text-center text-white bg-[#061b0e] border border-white/10 flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-[var(--gold)]/40 border-t-[var(--gold)] rounded-full animate-spin" />
        <p className="font-mono text-xs tracking-widest text-white/50">CONNECTING TO VIDEO SERVER...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] overflow-hidden border border-white/10 bg-black rounded-lg livekit-theme">
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={serverUrl}
        // Using their pre-built layout:
        data-lk-theme="default"
        style={{ height: '100%' }}
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  )
}
