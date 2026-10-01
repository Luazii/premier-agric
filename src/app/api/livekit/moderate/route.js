import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { TrackSource } from 'livekit-server-sdk';
import { isAdminUser, getRoomService, getRoomState, setRoomState, HOST_ROLE } from '@/lib/livekit-server';

// Actions that target a single participant
const PARTICIPANT_ACTIONS = ['mute_audio', 'mute_video', 'stop_screenshare', 'revoke_publish', 'allow_publish', 'remove', 'ban'];
// Actions that apply to the whole room
const ROOM_ACTIONS = ['mute_all', 'set_listen_only', 'end_session'];

const ATTENDEE_PERMISSION = (canPublish) => ({ canPublish, canSubscribe: true, canPublishData: true });

const isHost = (p) => p.attributes?.role === HOST_ROLE;

async function muteSources(roomService, roomName, participant, sources) {
  const tracks = participant.tracks.filter((t) => sources.includes(t.source) && !t.muted);
  await Promise.all(tracks.map((t) => roomService.mutePublishedTrack(roomName, participant.identity, t.sid, true)));
}

export async function POST(request) {
  try {
    const user = await currentUser();
    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden: Host access required' }, { status: 403 });
    }

    const { room: roomName, action, identity, enabled } = await request.json().catch(() => ({}));
    if (!roomName || !action) {
      return NextResponse.json({ error: 'Missing room or action' }, { status: 400 });
    }
    if (!PARTICIPANT_ACTIONS.includes(action) && !ROOM_ACTIONS.includes(action)) {
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    const roomService = getRoomService();
    if (!roomService) {
      console.error('Missing LiveKit credentials');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (PARTICIPANT_ACTIONS.includes(action)) {
      if (!identity) {
        return NextResponse.json({ error: 'Missing participant identity' }, { status: 400 });
      }
      // Load the participant from the server rather than trusting client-supplied track info
      const participant = await roomService.getParticipant(roomName, identity);
      if (isHost(participant)) {
        return NextResponse.json({ error: 'Hosts cannot be moderated' }, { status: 403 });
      }

      switch (action) {
        case 'mute_audio':
          await muteSources(roomService, roomName, participant, [TrackSource.MICROPHONE]);
          break;
        case 'mute_video':
          await muteSources(roomService, roomName, participant, [TrackSource.CAMERA]);
          break;
        case 'stop_screenshare':
          await muteSources(roomService, roomName, participant, [TrackSource.SCREEN_SHARE, TrackSource.SCREEN_SHARE_AUDIO]);
          break;
        case 'revoke_publish':
        case 'allow_publish':
          // Revoking publish permission unpublishes all of the participant's tracks
          await roomService.updateParticipant(roomName, identity, {
            permission: ATTENDEE_PERMISSION(action === 'allow_publish'),
          });
          break;
        case 'ban': {
          const state = await getRoomState(roomService, roomName);
          if (!state.banned.includes(identity)) {
            await setRoomState(roomService, roomName, { banned: [...state.banned, identity] });
          }
          await roomService.removeParticipant(roomName, identity);
          break;
        }
        case 'remove':
          await roomService.removeParticipant(roomName, identity);
          break;
      }
      return NextResponse.json({ ok: true });
    }

    const attendees = (await roomService.listParticipants(roomName)).filter((p) => !isHost(p));

    switch (action) {
      case 'mute_all':
        await Promise.all(attendees.map((p) => muteSources(roomService, roomName, p, [TrackSource.MICROPHONE])));
        break;
      case 'set_listen_only': {
        // Applies to current attendees and, via room state, to anyone who joins later
        const canPublish = !enabled;
        await setRoomState(roomService, roomName, { attendeesCanPublish: canPublish });
        await Promise.all(
          attendees.map((p) =>
            roomService.updateParticipant(roomName, p.identity, { permission: ATTENDEE_PERMISSION(canPublish) })
          )
        );
        break;
      }
      case 'end_session':
        await roomService.deleteRoom(roomName);
        break;
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('LiveKit moderation failed:', error);
    return NextResponse.json({ error: error?.message || 'Moderation action failed' }, { status: 500 });
  }
}
