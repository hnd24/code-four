import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
	users: defineTable({
		userId: v.string(),
		name: v.optional(v.string()),
		email: v.optional(v.string()),
		image: v.optional(v.string()),
		orgIds: v.array(
			v.object({
				orgId: v.string(),
				role: roles,
			}),
		),
	}).index("by_userId", ["userId"]),

	organizations: defineTable({
		orgId: v.string(),
		name: v.string(),
		members: v.array(v.string()), // userIds
	}).index("by_orgId", ["orgId"]),

	rooms: defineTable({
		name: v.string(),
		block: v.optional(v.boolean()),
		author: v.string(), // userId
		organization: v.optional(v.string()),	// orgId
		theme: v.optional(v.string()),
	}).index("by_author", ["author"]),

	code: defineTable({
		code: v.string(),
		language: v.string(),
		roomId: v.id("rooms"),
	}).index("by_roomId", ["roomId"]),
});
