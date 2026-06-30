import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('webinars')
      .filter((q) => q.eq(q.field('isPublished'), true))
      .collect()
  },
})

export const get = query({
  args: { id: v.id('webinars') },
  handler: async (ctx, args) => {
    const webinar = await ctx.db.get(args.id)
    if (!webinar) return null

    const identity = await ctx.auth.getUserIdentity()
    let canAccessMeeting = false

    if (identity) {
      const email = identity.email
      const isAdmin = !!email && (
        email === 'lgumbi2169@gmail.com' ||
        email === 'support@premieragric.co.za' ||
        email.endsWith('@premieragric.co.za')
      )

      if (isAdmin) {
        canAccessMeeting = true
      } else {
        const clerkUserId = identity.subject
        const registration = await ctx.db
          .query('registrations')
          .withIndex('by_webinar_user', (q) =>
            q.eq('webinarId', args.id).eq('clerkUserId', clerkUserId)
          )
          .first()
        if (registration) {
          const now = Date.now()
          const startTime = webinar.date - 10 * 60 * 1000
          const endTime = webinar.date + (webinar.duration + 10) * 60 * 1000
          if (now >= startTime && now <= endTime) {
            canAccessMeeting = true
          }
        }
      }
    }

    if (!canAccessMeeting) {
      const { meetingLink, ...publicWebinar } = webinar
      return publicWebinar
    }

    return webinar
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.number(),
    duration: v.number(),
    hostName: v.string(),
    hostTitle: v.string(),
    topic: v.string(),
    maxAttendees: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    meetingLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('webinars', {
      ...args,
      isPublished: true,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('webinars'),
    title: v.string(),
    description: v.string(),
    date: v.number(),
    duration: v.number(),
    hostName: v.string(),
    hostTitle: v.string(),
    topic: v.string(),
    maxAttendees: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    meetingLink: v.optional(v.string()),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args
    await ctx.db.patch(id, data)
  },
})

export const remove = mutation({
  args: { id: v.id('webinars') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('webinars').collect()
  },
})

