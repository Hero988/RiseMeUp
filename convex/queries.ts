import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSiteConfig = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
  },
});

export const getTeamMembers = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("teamMembers").collect();
    return members.sort((a, b) => a.order - b.order);
  },
});

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects.sort((a, b) => a.order - b.order);
  },
});

export const getObjectives = query({
  args: {},
  handler: async (ctx) => {
    const objectives = await ctx.db.query("objectives").collect();
    return objectives.sort((a, b) => a.order - b.order);
  },
});

export const getSDGs = query({
  args: {},
  handler: async (ctx) => {
    const sdgs = await ctx.db.query("sdgs").collect();
    return sdgs.sort((a, b) => a.order - b.order);
  },
});

export const getServices = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => a.order - b.order);
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("stats").collect();
    return stats.sort((a, b) => a.order - b.order);
  },
});
