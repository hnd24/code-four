import {ConvexError, v} from "convex/values";
import {internal} from "./_generated/api";
import {MutationCtx, QueryCtx, internalMutation, query} from "./_generated/server";
import {roles} from "./schema";

export async function getUser(ctx: QueryCtx | MutationCtx, userId: string) {
	const user = await ctx.db
		.query("users")
		.withIndex("by_userId", q => q.eq("userId", userId))
		.first();

	if (!user) {
		throw new ConvexError("expected user to be defined");
	}

	return user;
}

export const createUser = internalMutation({
	args: {
		userId: v.string(),
		name: v.string(),
		image: v.string(),
		email: v.optional(v.string()),
	},
	async handler(ctx, args) {
		await ctx.db.insert("users", {
			userId: args.userId,
			name: args.name,
			image: args.image,
			email: args.email,
			orgIds: [],
		});
	},
});

export const updateUser = internalMutation({
	args: {userId: v.string(), name: v.string(), image: v.string()},
	async handler(ctx, args) {
		const user = await ctx.db
			.query("users")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();

		if (!user) {
			throw new ConvexError("no user with this token found");
		}

		await ctx.db.patch(user._id, {
			name: args.name,
			image: args.image,
		});
	},
});

export const deleteUser = internalMutation({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);

		await ctx.db.delete(user._id);
	},
});

export const addOrgMemberShipToUser = internalMutation({
	args: {userId: v.string(), orgId: v.string(), role: roles},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);

		await ctx.db.patch(user._id, {
			orgIds: [...user.orgIds, {orgId: args.orgId, role: args.role}],
		});

		await ctx.runMutation(internal.organizations.addMemberOrg, {
			orgId: args.orgId,
			member: args.userId,
		});
	},
});

export const updateRoleInOrgForUser = internalMutation({
	args: {userId: v.string(), orgId: v.string(), role: roles},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);

		const org = user.orgIds.find(org => org.orgId === args.orgId);

		if (!org) {
			throw new ConvexError("expected an org on the user but was not found when updating");
		}

		org.role = args.role;

		await ctx.db.patch(user._id, {
			orgIds: user.orgIds,
		});
	},
});

export const removeOrgMemberShipToUser = internalMutation({
	args: {userId: v.string(), orgId: v.string()},
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);

		await ctx.db.patch(user._id, {
			orgIds: user.orgIds.filter(org => org.orgId !== args.orgId),
		});

		await ctx.runMutation(internal.organizations.removeMemberOrg, {
			orgId: args.orgId,
			member: args.userId,
		});
	},
});

export const getUserProfile = query({
	args: {userId: v.string()}, // _id
	async handler(ctx, args) {
		const user = await getUser(ctx, args.userId);

		return {
			name: user?.name,
			image: user?.image,
		};
	},
});

export const getMe = query({
	args: {},
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return null;
		}

		const user = await getUser(ctx, identity.subject);

		if (!user) {
			return null;
		}

		return user;
	},
});
