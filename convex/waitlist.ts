import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const joinWaitlist = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        // Check if email already exists to avoid duplicates
        const existing = await ctx.db
            .query("waitlist")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existing) {
            return existing._id;
        }

        const waitlistId = await ctx.db.insert("waitlist", {
            email: args.email,
        });
        return waitlistId;
    },
});

export const getCount = query({
    args: {},
    handler: async (ctx) => {
        const list = await ctx.db.query("waitlist").collect();
        return list.length;
    },
});
