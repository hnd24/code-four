import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {internalMutation, mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {getOrg} from "./organizations";
import {getUser} from "./users";

export async function getRoom(ctx: QueryCtx | MutationCtx, roomId: Id<"rooms">) {
	const room = await ctx.db.get(roomId);
	if (!room) {
		throw new ConvexError("Room not found");
	}
	return room;
}

export async function isAuthorOfRoom(ctx: QueryCtx | MutationCtx, roomId: Id<"rooms">) {
	const room = await ctx.db.get(roomId);
	if (!room) {
		throw new ConvexError("Room not found");
	}
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new ConvexError("You must be logged in");
	}
	const access = room.author === identity.tokenIdentifier;
	if (!access) return false;
	if (access) return room;
}

export async function deleteRoom(ctx: MutationCtx, roomId: Id<"rooms">) {
	const room = await getRoom(ctx, roomId);
	if (!room) {
		throw new ConvexError("Room not found");
	}
	await ctx.db.delete(room._id);
}

export async function deleteFavorite(ctx: MutationCtx, orgId: string) {
	const favorites = await ctx.db
		.query("favoriteRooms")
		.withIndex("by_orgId", q => q.eq("orgId", orgId))
		.collect();
	if (!favorites) return;
	Promise.all(
		favorites.map(async favorite => {
			const room = await ctx.db.get(favorite.roomId);
			if (room?.author === favorite.userId) return;
			ctx.db.delete(favorite._id);
		}),
	);
}

export const getRoomById = query({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		const room = await ctx.db.get(args.roomId);
		if (!room) {
			return null;
		}

		return room;
	},
});

export const getRoomsOfUser = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("you must be logged in to view your rooms");
		}
		return await ctx.db
			.query("rooms")
			.withIndex("by_author", q => q.eq("author", identity.tokenIdentifier))
			.collect();
	},
});

export const getRoomsOfOrganization = query({
	args: {orgId: v.string()},
	async handler(ctx, args) {
		const org = await getOrg(ctx, args.orgId);
		if (!org || !org.rooms || org.rooms.length === 0) {
			return [];
		}
		return await Promise.all(org.rooms.map(roomId => ctx.db.get(roomId)));
	},
});

export const toggleFavoriteRoom = mutation({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("you must be logged in to favorite a room");
		}
		const user = await getUser(ctx, identity?.subject);
		const room = await getRoom(ctx, args.roomId);
		if (!room || !user) {
			throw new ConvexError("room not found");
		}
		const favorite = await ctx.db
			.query("favoriteRooms")
			.withIndex("by_userId_orgId_by_roomId", q =>
				q.eq("userId", user.userId).eq("roomId", room._id).eq("orgId", room.orgId),
			)
			.first();
		if (!favorite) {
			await ctx.db.insert("favoriteRooms", {
				userId: user.userId,
				roomId: room._id,
				orgId: room.orgId,
			});
		} else {
			await ctx.db.delete(favorite._id);
		}
	},
});

export const toggleBlockRoom = mutation({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("you must be logged in to favorite a room");
		}
		const user = await getUser(ctx, identity?.subject);
		const room = await getRoom(ctx, args.roomId);

		if (!room) {
			throw new ConvexError("room not found");
		}
		if (room.author !== user.userId) {
			throw new ConvexError("you are not the author of this room");
		}
		if (room.block) {
			await ctx.db.patch(room._id, {block: false});
		} else {
			await ctx.db.patch(room._id, {block: true});
		}
	},
});

export const getAllFavoriteRooms = query({
	args: {},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("you must be logged in to view your favorite rooms");
		}
		const user = await getUser(ctx, identity?.subject);
		if (!identity) {
			throw new ConvexError("you must be logged in to view your favorite rooms");
		}
		const favorites = await ctx.db
			.query("favoriteRooms")
			.withIndex("by_userId_orgId_by_roomId", q => q.eq("userId", identity.subject))
			.collect();
		let rooms = Promise.all(
			favorites.map(async favorite => {
				return await ctx.db.get(favorite.roomId);
			}),
		);
	},
});

export const turnOnCountUpDeleteRoom = mutation({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		await ctx.db.patch(args.roomId, {deletionCountup: 1});
	},
});

export const turnOffCountUpDeleteRoom = mutation({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		await ctx.db.patch(args.roomId, {deletionCountup: 0});
	},
});

export const createRoom = mutation({
	args: {
		name: v.string(),
		author: v.string(), // userId
		orgId: v.string(), // orgId
		block: v.optional(v.boolean()),
		deletionCountup: v.optional(v.number()), // in days
	},
	async handler(ctx, args) {
		// Chèn room vào database và lấy ID của nó
		const roomId = await ctx.db.insert("rooms", args);

		// Lấy lại thông tin room vừa tạo
		return await ctx.db.get(roomId);
	},
});

export const deleteRoomById = mutation({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		await deleteRoom(ctx, args.roomId);
	},
});

export const renameRoom = mutation({
	args: {roomId: v.id("rooms"), name: v.string()},
	async handler(ctx, args) {
		await ctx.db.patch(args.roomId, {name: args.name});
	},
});

export const plusCountUpDeleteRoom = internalMutation({
	args: {},
	async handler(ctx, args) {
		const rooms = await ctx.db
			.query("rooms")
			.withIndex("by_deletionCountup", q => q.gt("deletionCountup", 0))
			.collect();
		Promise.all(
			rooms.map(async room => {
				if (room.deletionCountup)
					await ctx.db.patch(room._id, {deletionCountup: room.deletionCountup + 1});
			}),
		);
	},
});

export const deleteRoomsByCountUp = internalMutation({
	args: {},
	async handler(ctx, args) {
		const rooms = await ctx.db
			.query("rooms")
			.withIndex("by_deletionCountup", q => q.eq("deletionCountup", 7))
			.collect();
		Promise.all(
			rooms.map(async room => {
				if (room.deletionCountup && room.deletionCountup === 7) await ctx.db.delete(room._id);
			}),
		);
	},
});
