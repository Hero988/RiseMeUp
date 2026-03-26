import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  siteConfig: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  teamMembers: defineTable({
    name: v.string(),
    role: v.string(),
    image: v.string(),
    bio: v.string(),
    education: v.array(
      v.object({ icon: v.string(), text: v.string() })
    ),
    order: v.number(),
  }),

  projects: defineTable({
    phase: v.number(),
    title: v.string(),
    description: v.string(),
    benefits: v.array(v.string()),
    imageType: v.string(), // "img" or "svg"
    imageSrc: v.string(),
    order: v.number(),
  }),

  objectives: defineTable({
    title: v.string(),
    description: v.string(),
    iconName: v.string(),
    image: v.optional(v.string()),
    order: v.number(),
  }),

  sdgs: defineTable({
    number: v.number(),
    title: v.string(),
    description: v.string(),
    colorClass: v.string(),
    order: v.number(),
  }),

  services: defineTable({
    title: v.string(),
    description: v.string(),
    iconName: v.string(),
    order: v.number(),
  }),

  stats: defineTable({
    target: v.number(),
    suffix: v.string(),
    label: v.string(),
    isDecimal: v.boolean(),
    order: v.number(),
  }),

  contactMessages: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    interest: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),

  newsletterSubscribers: defineTable({
    email: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
