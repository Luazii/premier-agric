import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

export async function GET(request) {
  try {
    const user = await currentUser();
    const { searchParams } = new URL(request.url);
    const roomName = searchParams.get('room');

    if (!roomName) {
      return NextResponse.json({ error: 'Missing room name' }, { status: 400 });
    }

    // Identify the webinar ID from the room name
    let webinarId = null;
    if (roomName.startsWith('pa-')) {
      webinarId = roomName.substring(3);
    }

    if (webinarId) {
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized: Sign in required to join the webinar room' }, { status: 401 });
      }
    }

    // Securely use the Clerk user's identity if logged in, otherwise fallback
    const participantName = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? searchParams.get('name') ?? 'Attendee';

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
    const isAdmin = !!email && (
      adminEmails.includes(email.toLowerCase()) ||
      email === 'lgumbi2169@gmail.com' ||
      email === 'support@premieragric.co.za' ||
      email.endsWith('@premieragric.co.za') ||
      user?.publicMetadata?.role === 'admin'
    );

    // Verify registration and timing window if user is not an admin
    if (webinarId && !isAdmin) {
      if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
        console.error('Missing Convex URL configuration');
        return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
      }

      const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
      try {
        const webinar = await convex.query(api.webinars.get, { id: webinarId });
        if (!webinar) {
          return NextResponse.json({ error: 'Not Found: Webinar not found' }, { status: 404 });
        }

        const isRegistered = await convex.query(api.registrations.isRegistered, {
          webinarId: webinarId,
          clerkUserId: user.id,
        });
        if (!isRegistered) {
          return NextResponse.json({ error: 'Forbidden: You must be registered to join this session' }, { status: 403 });
        }

        const now = Date.now();
        const startTime = webinar.date - 10 * 60 * 1000;
        const endTime = webinar.date + (webinar.duration + 10) * 60 * 1000;

        if (now < startTime) {
          return NextResponse.json({ error: 'Forbidden: The room is not active yet. It opens 10 minutes before the start time.' }, { status: 403 });
        }
        if (now > endTime) {
          return NextResponse.json({ error: 'Forbidden: The session has ended.' }, { status: 403 });
        }
      } catch (err) {
        console.error('Failed to verify registration/session details in Convex:', err);
        return NextResponse.json({ error: 'Forbidden: Invalid registration or session ID' }, { status: 403 });
      }
    }

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
