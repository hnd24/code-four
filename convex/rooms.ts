import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
export async function hasAccessToOrg(ctx: QueryCtx | MutationCtx, orgId: string) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		return null;
	}

	const user = await ctx.db
		.query("users")
		.withIndex("by_userId", q => q.eq("userId", identity.tokenIdentifier))
		.first();

	if (!user) {
		return null;
	}

	const hasAccess = user.orgIds.some(item => item.orgId === orgId);

	if (!hasAccess) {
		throw new ConvexError("you do not have access to this org");
	}

	return user;
}

async function hasAccessToRoom(ctx: QueryCtx | MutationCtx, roomId: Id<"rooms">) {
	const room = await ctx.db.get(roomId);

	if (!room) {
		return null;
	}
	const hasAccess = await hasAccessToOrg(ctx, room.orgId);

	if (!hasAccess) {
		return null;
	}

	return {user: hasAccess, room};
}

export const getRoom = query({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		const room = await ctx.db.get(args.roomId);
		if (!room) {
			throw new ConvexError("expected room to be defined");
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
		const hasAccess = await hasAccessToOrg(ctx, args.orgId);
		if (!hasAccess) {
			return [];
		}

		const rooms = await ctx.db
			.query("rooms")
			.withIndex("by_orgId", q => q.eq("orgId", args.orgId))
			.collect();

		return rooms;
	},
});

export const toggleFavoriteRoom = mutation({
	args: {roomId: v.id("rooms")},
	async handler(ctx, args) {
		const access = await hasAccessToRoom(ctx, args.roomId);
		if (!access) {
			throw new ConvexError("no access to file");
		}
		const favorite = await ctx.db
			.query("favoriteRooms")
			.withIndex("by_userId_orgId_by_roomId", q =>
				q
					.eq("userId", access.user.userId)
					.eq("roomId", access.room._id)
					.eq("orgId", access.room.orgId),
			)
			.first();
		if (!favorite) {
			await ctx.db.insert("favoriteRooms", {
				userId: access.user.userId,
				roomId: access.room._id,
				orgId: access.room.orgId,
			});
			await ctx.db.patch(access.room._id, {favorite: true});
		} else {
			await ctx.db.delete(favorite._id);
			await ctx.db.patch(access.room._id, {favorite: false});
		}
	},
});

export const getAllFavoriteRooms = query({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new ConvexError("you must be logged in to view your favorite rooms");
		}
		return await ctx.db
			.query("favoriteRooms")
			.withIndex("by_userId_orgId_by_roomId", q => q.eq("userId", identity.tokenIdentifier))
			.collect();
	},
});
