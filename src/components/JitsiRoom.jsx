'use client'

import { JitsiMeeting } from '@jitsi/react-sdk'

export default function JitsiRoom({ roomName, displayName, userEmail }) {
  return (
    <div className="w-full overflow-hidden border border-white/10">
      <JitsiMeeting
        domain={process.env.NEXT_PUBLIC_JITSI_DOMAIN || 'meet.jit.si'}
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          toolbarButtons: [
            'microphone',
            'camera',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'hangup',
            'chat',
            'raisehand',
            'tileview',
            'videoquality',
            'closedcaptions',
          ],
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_BRAND_WATERMARK: false,
          DEFAULT_BACKGROUND: '#061b0e',
          TOOLBAR_ALWAYS_VISIBLE: false,
        }}
        userInfo={{ displayName: displayName ?? 'Attendee', email: userEmail ?? '' }}
        getIFrameRef={(el) => {
          el.style.height = '560px'
          el.style.width = '100%'
          el.style.border = 'none'
        }}
      />
    </div>
  )
}
