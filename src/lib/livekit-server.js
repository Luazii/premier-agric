import { RoomServiceClient } from 'livekit-server-sdk'

const ALLOWED_ADMINS = ['lgumbi2169@gmail.com', 'support@premieragric.co.za', 'premieragric1@gmail.com']

// Participant attribute used to mark hosts so they can't be moderated by other hosts
export const HOST_ROLE = 'host'

export function isAdminUser(user) {
  if (!user) return false
  const userEmails = (user.emailAddresses || []).map((e) => e.emailAddress?.toLowerCase()).filter(Boolean)
  if (user.primaryEmailAddress?.emailAddress) {
    userEmails.push(user.primaryEmailAddress.emailAddress.toLowerCase())
  }
  const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim().toLowerCase()) : []
  return (
    user.publicMetadata?.role === 'admin' ||
    userEmails.some(
      (e) =>
        adminEmails.includes(e) ||
        ALLOWED_ADMINS.includes(e) ||
        e.endsWith('@premieragric.co.za')
    )
  )
}

export function getRoomService() {
  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL
  if (!apiKey || !apiSecret || !wsUrl) return null
  // RoomService talks HTTP(S), not WebSocket
  const host = wsUrl.replace(/^ws(s?):\/\//, 'http$1://')
  return new RoomServiceClient(host, apiKey, apiSecret)
}

// Moderation state lives in the LiveKit room metadata, so it lasts for the session only
const DEFAULT_ROOM_STATE = { banned: [], attendeesCanPublish: true }

function parseRoomState(metadata) {
  try {
    return { ...DEFAULT_ROOM_STATE, ...(metadata ? JSON.parse(metadata) : {}) }
  } catch {
    return { ...DEFAULT_ROOM_STATE }
  }
}

export async function getRoomState(roomService, roomName) {
  const [room] = await roomService.listRooms([roomName])
  return parseRoomState(room?.metadata)
}

export async function setRoomState(roomService, roomName, patch) {
  const current = await getRoomState(roomService, roomName)
  const next = { ...current, ...patch }
  await roomService.updateRoomMetadata(roomName, JSON.stringify(next))
  return next
}
