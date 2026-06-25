import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    const user = await currentUser();
    const { searchParams } = new URL(request.url);
    const roomName = searchParams.get('room');
    
    // Securely use the Clerk user's identity if logged in, otherwise fallback
    const participantName = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? searchParams.get('name') ?? 'Attendee';

    if (!roomName) {
      return NextResponse.json({ error: 'Missing room name' }, { status: 400 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      console.error('Missing LiveKit credentials');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // Determine admin status
    const email = user?.primaryEmailAddress?.emailAddress;
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()) : [];
    const isAdmin = !!email && adminEmails.includes(email.toLowerCase());

    const participantIdentity = user?.id || `anon_${Math.random().toString(36).substring(2, 10)}`;

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: participantName,
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      roomAdmin: isAdmin, // Grants admin controls in the UI if true
    });

    const token = await at.toJwt();

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}
