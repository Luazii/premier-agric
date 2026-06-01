import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

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

    return await ctx.db.insert('registrations', {
      webinarId: args.webinarId,
      clerkUserId: args.clerkUserId,
      userName: args.userName,
      userEmail: args.userEmail,
      registeredAt: Date.now(),
    })
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
