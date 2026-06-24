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
        if (!res.ok) throw new Error('Failed to fetch token')
        const data = await res.json()
        setToken(data.token)
      } catch (err) {
        console.error(err)
        setError('Could not connect to the secure video server.')
      }
    }

    fetchToken()
  }, [roomName, displayName])

  if (error) {
    return <div className="p-10 text-center text-red-400 bg-[#061b0e] border border-white/10">{error}</div>
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
