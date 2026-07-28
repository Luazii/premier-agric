import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query('newsletters')
      .filter((q) => q.eq(q.field('isPublished'), true))
      .collect()

    // Sort by createdAt descending
    return items.sort((a, b) => b.createdAt - a.createdAt)
  },
})

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query('newsletters').collect()
    return items.sort((a, b) => b.createdAt - a.createdAt)
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    issue: v.string(),
    category: v.string(),
    readTime: v.string(),
    summary: v.string(),
    content: v.string(),
    author: v.string(),
    imageUrl: v.optional(v.string()),
    highlights: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('newsletters', {
      ...args,
      createdAt: Date.now(),
    })
  },
})

export const update = mutation({
  args: {
    id: v.id('newsletters'),
    title: v.string(),
    issue: v.string(),
    category: v.string(),
    readTime: v.string(),
    summary: v.string(),
    content: v.string(),
    author: v.string(),
    imageUrl: v.optional(v.string()),
    highlights: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args
    await ctx.db.patch(id, data)
  },
})

export const remove = mutation({
  args: { id: v.id('newsletters') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
