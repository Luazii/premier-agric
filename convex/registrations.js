import { query, mutation } from './_generated/server'
import { v } from 'convex/values'
import { internal } from './_generated/api'

export const register = mutation({
  args: {
    webinarId: v.id('webinars'),
    clerkUserId: v.string(),
    userName: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('registrations')
      .withIndex('by_webinar_user', (q) =>
        q.eq('webinarId', args.webinarId).eq('clerkUserId', args.clerkUserId)
      )
      .first()

    if (existing) return existing._id

    const registrationId = await ctx.db.insert('registrations', {
      webinarId: args.webinarId,
      clerkUserId: args.clerkUserId,
      userName: args.userName,
      userEmail: args.userEmail,
      registeredAt: Date.now(),
    })

    const webinar = await ctx.db.get(args.webinarId)
    if (webinar) {
      await ctx.scheduler.runAfter(0, internal.emails.sendConfirmation, {
        registrationId,
      })

      const reminderTime = webinar.date - 24 * 60 * 60 * 1000
      if (reminderTime > Date.now()) {
        await ctx.scheduler.runAt(reminderTime, internal.emails.sendReminder, {
          registrationId,
        })
      }

      const startingSoonTime = webinar.date - 60 * 60 * 1000
      if (startingSoonTime > Date.now()) {
        await ctx.scheduler.runAt(startingSoonTime, internal.emails.sendStartingSoon, {
          registrationId,
        })
      }
    }

    return registrationId
  },
})

export const unregister = mutation({
  args: { webinarId: v.id('webinars'), clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('registrations')
      .withIndex('by_webinar_user', (q) =>
        q.eq('webinarId', args.webinarId).eq('clerkUserId', args.clerkUserId)
      )
      .first()

    if (existing) await ctx.db.delete(existing._id)
  },
})

export const isRegistered = query({
  args: { webinarId: v.id('webinars'), clerkUserId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('registrations')
      .withIndex('by_webinar_user', (q) =>
        q.eq('webinarId', args.webinarId).eq('clerkUserId', args.clerkUserId)
      )
      .first()
    return !!existing
  },
})

export const listByWebinar = query({
  args: { webinarId: v.id('webinars') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('registrations')
      .withIndex('by_webinar', (q) => q.eq('webinarId', args.webinarId))
      .collect()
  },
})

export const listByUser = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('registrations')
      .withIndex('by_user', (q) => q.eq('clerkUserId', args.clerkUserId))
      .collect()
  },
})
