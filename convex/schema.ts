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
		image: v.optional(v.string()),
		name: v.string(),
		members: v.array(v.string()), // userIds
		rooms: v.optional(v.array(v.id("rooms"))), // roomIds
	}).index("by_orgId", ["orgId"]),

	rooms: defineTable({
		name: v.string(),
		author: v.string(), // userId
		deletionCountup: v.optional(v.number()), // in days
		orgId: v.string(), // orgId
	})
		.index("by_author", ["author"])
		.index("by_orgId", ["orgId"])
		.index("by_deletionCountup", ["deletionCountup"]),

	favoriteRooms: defineTable({
		userId: v.string(),
		orgId: v.string(),
		roomId: v.id("rooms"),
	})
		.index("by_userId_orgId_by_roomId", ["userId", "roomId", "orgId"])
		.index("by_roomId", ["roomId"])
		.index("by_orgId", ["orgId"]),

	code: defineTable({
		code: v.string(),
		language: v.string(),
		roomId: v.id("rooms"),
	}).index("by_roomId", ["roomId"]),
});
