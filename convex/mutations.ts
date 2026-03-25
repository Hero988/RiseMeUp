import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitContactMessage = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    interest: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contactMessages", {
      ...args,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});

export const subscribeNewsletter = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) return { success: true, alreadySubscribed: true };
    await ctx.db.insert("newsletterSubscribers", {
      email: args.email,
      createdAt: Date.now(),
    });
    return { success: true, alreadySubscribed: false };
  },
});
