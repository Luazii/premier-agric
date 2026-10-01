'use client'

import { useState } from 'react'
import { useParticipants, useRoomInfo } from '@livekit/components-react'

function parseRoomState(metadata) {
  try {
    return { banned: [], attendeesCanPublish: true, ...(metadata ? JSON.parse(metadata) : {}) }
  } catch {
    return { banned: [], attendeesCanPublish: true }
  }
}

function ActionButton({ onClick, disabled, danger, children, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`px-2 py-1 text-[10px] font-mono tracking-wider border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        danger
          ? 'border-red-400/30 text-red-300 hover:bg-red-400/10'
          : 'border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

export default function HostControls({ roomName }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(null)
  const [error, setError] = useState(null)

  const participants = useParticipants()
  const { metadata } = useRoomInfo()
  const roomState = parseRoomState(metadata)
  const listenOnly = !roomState.attendeesCanPublish

  const attendees = participants.filter((p) => !p.isLocal && p.attributes?.role !== 'host')
  const hosts = participants.filter((p) => p.attributes?.role === 'host')

  async function moderate(action, extra = {}, confirmMessage) {
    if (confirmMessage && !window.confirm(confirmMessage)) return
    const key = `${action}:${extra.identity ?? 'room'}`
    setPending(key)
    setError(null)
    try {
      const res = await fetch('/api/livekit/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room: roomName, action, ...extra }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Action failed')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setPending(null)
    }
  }

  const isPending = (action, identity) => pending === `${action}:${identity ?? 'room'}`

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="absolute top-3 right-3 z-20 px-3 py-1.5 text-xs font-mono tracking-widest uppercase bg-[var(--gold)] text-[var(--forest)] hover:bg-[var(--gold)]/90 transition-all shadow-lg"
      >
        {open ? 'Close' : 'Host Controls'}
        {!open && attendees.length > 0 && <span className="ml-2 opacity-70">({attendees.length})</span>}
      </button>

      {open && (
        <aside className="absolute top-0 right-0 bottom-0 z-10 w-full sm:w-96 bg-[#061b0e]/95 backdrop-blur border-l border-white/10 flex flex-col text-white">
          <div className="px-4 pt-14 pb-4 border-b border-white/10 flex flex-col gap-3">
            <p className="eyebrow text-[var(--gold)]">Host Controls</p>

            <div className="flex flex-wrap gap-2">
              <ActionButton
                onClick={() => moderate('mute_all')}
                disabled={!!pending || attendees.length === 0}
                title="Mute every attendee's microphone"
              >
                {isPending('mute_all') ? 'MUTING…' : 'MUTE ALL'}
              </ActionButton>
              <ActionButton
                onClick={() => moderate('set_listen_only', { enabled: !listenOnly })}
                disabled={!!pending}
                title="Listen-only: attendees cannot turn on their mic, camera or screen share"
              >
                {listenOnly ? 'ALLOW ATTENDEES TO SPEAK' : 'LISTEN-ONLY MODE'}
              </ActionButton>
              <ActionButton
                danger
                onClick={() =>
                  moderate('end_session', {}, 'End the session for everyone? All participants will be disconnected.')
                }
                disabled={!!pending}
              >
                END FOR ALL
              </ActionButton>
            </div>

            <p className="text-[11px] text-white/40 font-mono">
              {listenOnly ? '● Listen-only is on: attendees cannot speak or share.' : '○ Attendees can speak and share.'}
              {roomState.banned.length > 0 && ` · ${roomState.banned.length} removed and blocked`}
            </p>

            {error && <p className="text-[11px] text-red-400 font-mono">{error}</p>}
          </div>

          <div className="flex-1 overflow-y-auto">
            {hosts.length > 0 && (
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-[10px] font-mono tracking-widest text-white/30 mb-2">HOSTS · {hosts.length}</p>
                {hosts.map((p) => (
                  <p key={p.identity} className="text-sm text-white/60 truncate">
                    {p.name || p.identity} {p.isLocal && <span className="text-white/30">(you)</span>}
                  </p>
                ))}
              </div>
            )}

            <div className="px-4 py-3">
              <p className="text-[10px] font-mono tracking-widest text-white/30 mb-2">ATTENDEES · {attendees.length}</p>
              {attendees.length === 0 && <p className="text-xs text-white/30">No attendees in the room yet.</p>}

              <ul className="flex flex-col divide-y divide-white/5">
                {attendees.map((p) => {
                  const canPublish = p.permissions?.canPublish ?? true
                  const busy = !!pending
                  return (
                    <li key={p.identity} className="py-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm truncate">{p.name || p.identity}</span>
                        <span className="flex gap-2 text-[10px] font-mono shrink-0">
                          <span className={p.isMicrophoneEnabled ? 'text-emerald-400' : 'text-white/25'}>MIC</span>
                          <span className={p.isCameraEnabled ? 'text-emerald-400' : 'text-white/25'}>CAM</span>
                          {p.isScreenShareEnabled && <span className="text-emerald-400">SCREEN</span>}
                          {!canPublish && <span className="text-amber-400">LISTEN-ONLY</span>}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <ActionButton
                          onClick={() => moderate('mute_audio', { identity: p.identity })}
                          disabled={busy || !p.isMicrophoneEnabled}
                        >
                          {isPending('mute_audio', p.identity) ? '…' : 'MUTE'}
                        </ActionButton>
                        <ActionButton
                          onClick={() => moderate('mute_video', { identity: p.identity })}
                          disabled={busy || !p.isCameraEnabled}
                        >
                          {isPending('mute_video', p.identity) ? '…' : 'CAMERA OFF'}
                        </ActionButton>
                        {p.isScreenShareEnabled && (
                          <ActionButton
                            onClick={() => moderate('stop_screenshare', { identity: p.identity })}
                            disabled={busy}
                          >
                            STOP SHARE
                          </ActionButton>
                        )}
                        <ActionButton
                          onClick={() =>
                            moderate(canPublish ? 'revoke_publish' : 'allow_publish', { identity: p.identity })
                          }
                          disabled={busy}
                          title={canPublish ? 'Stop this attendee from using mic, camera or screen share' : 'Let this attendee speak'}
                        >
                          {canPublish ? 'MAKE LISTEN-ONLY' : 'ALLOW TO SPEAK'}
                        </ActionButton>
                        <ActionButton
                          danger
                          onClick={() =>
                            moderate('remove', { identity: p.identity }, `Remove ${p.name || 'this attendee'}? They can rejoin.`)
                          }
                          disabled={busy}
                        >
                          REMOVE
                        </ActionButton>
                        <ActionButton
                          danger
                          onClick={() =>
                            moderate(
                              'ban',
                              { identity: p.identity },
                              `Remove ${p.name || 'this attendee'} and block them from rejoining this session?`
                            )
                          }
                          disabled={busy}
                        >
                          REMOVE &amp; BLOCK
                        </ActionButton>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
