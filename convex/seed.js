import { mutation } from './_generated/server'

export const cropProductionSeries = mutation({
  args: {},
  handler: async (ctx) => {
    const series = [
      {
        title: 'Ep. 1 — Foundations of Crop Production',
        description:
          'We lay the groundwork: understanding your soil type, reading land, and preparing your fields for a productive season. This session covers soil health indicators, land preparation methods, and how to choose the right crops for your conditions.',
        date: 1779897600000,
        duration: 90,
        hostName: 'Premier Agric',
        hostTitle: 'Agribusiness & Training Division',
        topic: 'Agribusiness',
        maxAttendees: 100,
        isPublished: true,
        meetingLink: 'https://meet.google.com/tbd-episode-1',
      },
      {
        title: 'Ep. 2 — Seed Selection & Planting Techniques',
        description:
          'Choosing the wrong seed can cost you an entire season. This session covers certified seed varieties, germination rates, optimum planting depths, row spacing, and how to adapt planting methods to local conditions.',
        date: 1780502400000,
        duration: 90,
        hostName: 'Premier Agric',
        hostTitle: 'Agribusiness & Training Division',
        topic: 'Agribusiness',
        maxAttendees: 100,
        isPublished: true,
        meetingLink: 'https://meet.google.com/tbd-episode-2',
      },
      {
        title: 'Ep. 3 — Crop Protection & Pest Management',
        description:
          'Learn to identify the most common pests and diseases threatening your crops and how to respond effectively. We cover integrated pest management (IPM), safe agrochemical use, and low-cost biological control strategies.',
        date: 1781107200000,
        duration: 90,
        hostName: 'Premier Agric',
        hostTitle: 'Agribusiness & Training Division',
        topic: 'Agribusiness',
        maxAttendees: 100,
        isPublished: true,
        meetingLink: 'https://meet.google.com/tbd-episode-3',
      },
      {
        title: 'Ep. 4 — Harvesting, Yield Assessment & Post-Harvest',
        description:
          'The harvest is only half the story. This final session covers harvest timing indicators, yield estimation, proper handling to reduce losses, grading, storage, and getting your produce to market in the best condition.',
        date: 1781712000000,
        duration: 90,
        hostName: 'Premier Agric',
        hostTitle: 'Agribusiness & Training Division',
        topic: 'Agribusiness',
        maxAttendees: 100,
        isPublished: true,
        meetingLink: 'https://meet.google.com/tbd-episode-4',
      },
    ]

    const ids = []
    for (const webinar of series) {
      ids.push(await ctx.db.insert('webinars', webinar))
    }
    return ids
  },
})
