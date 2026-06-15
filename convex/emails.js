import { internalAction, internalQuery } from './_generated/server'
import { v } from 'convex/values'
import { internal } from './_generated/api'

export const getRegistrationDetails = internalQuery({
  args: { registrationId: v.id('registrations') },
  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.registrationId)
    if (!registration) return null

    const webinar = await ctx.db.get(registration.webinarId)
    return {
      ...registration,
      webinar,
    }
  },
})

export const sendConfirmation = internalAction({
  args: { registrationId: v.id('registrations') },
  handler: async (ctx, args) => {
    const registration = await ctx.runQuery(internal.emails.getRegistrationDetails, {
      registrationId: args.registrationId,
    })

    if (!registration) {
      console.warn(`Registration ${args.registrationId} not found, skipping confirmation email.`)
      return
    }

    const { userEmail, userName, webinar } = registration
    if (!webinar) {
      console.warn(`Webinar for registration ${args.registrationId} not found, skipping.`)
      return
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not set. Cannot send confirmation email.')
      return
    }

    const dateStr = new Date(webinar.date).toLocaleDateString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const timeStr = new Date(webinar.date).toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://premieragric.co.za'
    const joinLink = `${siteUrl}/webinars/${webinar._id}`
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@premieragric.co.za'

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background-color: #061b0e; color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #e6b34b; font-family: Georgia, serif; font-size: 28px; font-weight: normal; margin: 0; letter-spacing: 0.5px;">Premier Agric</h1>
          <div style="width: 40px; height: 1px; bg: #e6b34b; background-color: #e6b34b; margin: 12px auto 6px;"></div>
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; font-family: monospace; letter-spacing: 2.5px; margin: 0; text-transform: uppercase;">Registration Confirmed</p>
        </div>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 24px; border-radius: 8px; border-left: 3px solid #e6b34b; margin-bottom: 32px;">
          <p style="margin-top: 0; font-size: 16px; color: #ffffff;">Hello <strong>${userName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.75); margin-bottom: 20px;">
            Thank you for registering. Your spot is confirmed for the following live learning session:
          </p>
          <h2 style="color: #ffffff; font-size: 22px; margin: 16px 0; font-family: Georgia, serif; font-weight: normal; line-height: 1.3;">${webinar.title}</h2>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; font-family: monospace; color: rgba(255,255,255,0.7); margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; width: 90px; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Date</td>
              <td style="padding: 8px 0; color: #ffffff;">${dateStr}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Time</td>
              <td style="padding: 8px 0; color: #ffffff;">${timeStr} SAST</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Duration</td>
              <td style="padding: 8px 0; color: #ffffff;">${webinar.duration} minutes</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Host</td>
              <td style="padding: 8px 0; color: #ffffff;">${webinar.hostName} <span style="color: rgba(255,255,255,0.55); font-size: 12px;">(${webinar.hostTitle})</span></td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.75); margin-bottom: 24px;">
          To join the webinar room when the session starts, please click the button below to sign in and attend:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${joinLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #e6b34b; color: #061b0e; font-weight: bold; font-family: monospace; font-size: 13px; text-decoration: none; padding: 14px 28px; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px; transition: background-color 0.2s;">
            JOIN WEBINAR ROOM
          </a>
        </div>

        <p style="font-size: 12px; color: rgba(255,255,255,0.35); text-align: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; margin-top: 32px; font-family: monospace; line-height: 1.5;">
          This is an automated transmission from Premier Agric.<br/>
          Need assistance? Reach out to us at <a href="mailto:support@premieragric.co.za" style="color: #e6b34b; text-decoration: none;">support@premieragric.co.za</a>.
        </p>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Premier Agric <${fromEmail}>`,
        to: userEmail,
        subject: `Confirmed: ${webinar.title} - Premier Agric`,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Failed to send confirmation email via Resend: ${response.status} ${errorText}`)
    } else {
      console.log(`Confirmation email sent successfully to ${userEmail}`)
    }
  },
})

export const sendReminder = internalAction({
  args: { registrationId: v.id('registrations') },
  handler: async (ctx, args) => {
    const registration = await ctx.runQuery(internal.emails.getRegistrationDetails, {
      registrationId: args.registrationId,
    })

    if (!registration) {
      console.warn(`Registration ${args.registrationId} not found, skipping reminder email.`)
      return
    }

    const { userEmail, userName, webinar } = registration
    if (!webinar) {
      console.warn(`Webinar for registration ${args.registrationId} not found, skipping.`)
      return
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not set. Cannot send reminder email.')
      return
    }

    const dateStr = new Date(webinar.date).toLocaleDateString('en-ZA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const timeStr = new Date(webinar.date).toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://premieragric.co.za'
    const joinLink = `${siteUrl}/webinars/${webinar._id}`
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@premieragric.co.za'

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background-color: #061b0e; color: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #e6b34b; font-family: Georgia, serif; font-size: 28px; font-weight: normal; margin: 0; letter-spacing: 0.5px;">Premier Agric</h1>
          <div style="width: 40px; height: 1px; bg: #e6b34b; background-color: #e6b34b; margin: 12px auto 6px;"></div>
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; font-family: monospace; letter-spacing: 2.5px; margin: 0; text-transform: uppercase;">Webinar Reminder</p>
        </div>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 24px; border-radius: 8px; border-left: 3px solid #e6b34b; margin-bottom: 32px;">
          <p style="margin-top: 0; font-size: 16px; color: #ffffff;">Hello <strong>${userName}</strong>,</p>
          <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.75); margin-bottom: 20px;">
            This is a friendly reminder that the session you registered for starts in **24 hours**:
          </p>
          <h2 style="color: #ffffff; font-size: 22px; margin: 16px 0; font-family: Georgia, serif; font-weight: normal; line-height: 1.3;">${webinar.title}</h2>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; font-family: monospace; color: rgba(255,255,255,0.7); margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; width: 90px; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Date</td>
              <td style="padding: 8px 0; color: #ffffff;">${dateStr}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Time</td>
              <td style="padding: 8px 0; color: #ffffff;">${timeStr} SAST</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #e6b34b; vertical-align: top; text-transform: uppercase; letter-spacing: 1px;">Host</td>
              <td style="padding: 8px 0; color: #ffffff;">${webinar.hostName} <span style="color: rgba(255,255,255,0.55); font-size: 12px;">(${webinar.hostTitle})</span></td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.75); margin-bottom: 24px;">
          Please ensure you are signed in to your account. Click the button below to access the session:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${joinLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #e6b34b; color: #061b0e; font-weight: bold; font-family: monospace; font-size: 13px; text-decoration: none; padding: 14px 28px; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px; transition: background-color 0.2s;">
            JOIN WEBINAR ROOM
          </a>
        </div>

        <p style="font-size: 12px; color: rgba(255,255,255,0.35); text-align: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; margin-top: 32px; font-family: monospace; line-height: 1.5;">
          This is an automated transmission from Premier Agric.<br/>
          Need assistance? Reach out to us at <a href="mailto:support@premieragric.co.za" style="color: #e6b34b; text-decoration: none;">support@premieragric.co.za</a>.
        </p>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Premier Agric <${fromEmail}>`,
        to: userEmail,
        subject: `Reminder: ${webinar.title} - Tomorrow!`,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Failed to send reminder email via Resend: ${response.status} ${errorText}`)
    } else {
      console.log(`Reminder email sent successfully to ${userEmail}`)
    }
  },
})
