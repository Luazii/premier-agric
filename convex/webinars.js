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
    return await ctx.db.get(args.id)
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

