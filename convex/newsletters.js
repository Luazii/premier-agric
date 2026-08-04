import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl()
})

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
    storageId: v.optional(v.id("_storage")),
    highlights: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    let imageUrl = args.imageUrl;
    if (args.storageId) {
      imageUrl = await ctx.storage.getUrl(args.storageId);
    }
    const { storageId, ...rest } = args;
    
    return await ctx.db.insert('newsletters', {
      ...rest,
      imageUrl,
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
    storageId: v.optional(v.id("_storage")),
    highlights: v.optional(v.array(v.string())),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    let imageUrl = args.imageUrl;
    if (args.storageId) {
      imageUrl = await ctx.storage.getUrl(args.storageId);
    }
    const { id, storageId, ...data } = args
    
    await ctx.db.patch(id, {
      ...data,
      ...(imageUrl !== undefined ? { imageUrl } : {})
    })
  },
})

export const remove = mutation({
  args: { id: v.id('newsletters') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})
