import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    waitlist: defineTable({
        email: v.string(),
    }).index("by_email", ["email"]),
});
