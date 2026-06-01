import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  webinars: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.number(),
    duration: v.number(),
    hostName: v.string(),
    hostTitle: v.string(),
    topic: v.string(),
    maxAttendees: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    isPublished: v.boolean(),
    meetingLink: v.optional(v.string()),
  }),
  registrations: defineTable({
    webinarId: v.id('webinars'),
    clerkUserId: v.string(),
    userName: v.string(),
    userEmail: v.string(),
    registeredAt: v.number(),
  })
    .index('by_webinar', ['webinarId'])
    .index('by_user', ['clerkUserId'])
    .index('by_webinar_user', ['webinarId', 'clerkUserId']),
})
