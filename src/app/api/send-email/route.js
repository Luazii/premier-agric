import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const { type, email, name, challenge, message } = data;

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    let subject = '';
    let html = '';

    if (type === 'newsletter') {
      subject = 'New Newsletter Subscription - Premier Agric';
      html = `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
      `;
    } else if (type === 'contact') {
      subject = 'New Inquiry - Premier Agric';
      html = `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nature of Inquiry:</strong> ${challenge}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 });
    }

    const resendResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Acme <onboarding@resend.dev>',
      to: ['info@premieragric.co.za'], // The recipient email
      subject: subject,
      html: html,
    });

    if (resendResponse.error) {
      console.error('Resend error:', resendResponse.error);
      return NextResponse.json({ error: resendResponse.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: resendResponse.data.id });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
