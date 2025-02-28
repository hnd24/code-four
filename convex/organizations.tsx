import {ConvexError, v} from "convex/values";
import {api, internal} from "./_generated/api";
import {internalMutation, MutationCtx, query, QueryCtx} from "./_generated/server";

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

export async function getOrg(ctx: QueryCtx | MutationCtx, orgId: string) {
	const org = await ctx.db
		.query("organizations")
		.withIndex("by_orgId", q => q.eq("orgId", orgId))
		.first();
	if (!org) {
		throw new ConvexError("expected org to be defined");
	}
	return org;
}

export const createOrg = internalMutation({
	args: {orgId: v.string(), image: v.string(), name: v.string()},
	async handler(ctx, args) {
		await ctx.db.insert("organizations", {
			orgId: args.orgId,
			name: args.name,
			image: args.image,
			members: [],
		});
	},
});

export const updateProfileOrg = internalMutation({
	args: {orgId: v.string(), name: v.string(), image: v.string()},
	async handler(ctx, args) {
		const org = await getOrg(ctx, args.orgId);
		await ctx.db.patch(org._id, {
			name: args.name,
			image: args.image,
		});
	},
});

export const addMemberOrg = internalMutation({
	args: {orgId: v.string(), member: v.string()},
	async handler(ctx, args) {
		const org = await getOrg(ctx, args.orgId);
		await ctx.db.patch(org._id, {
			members: [...org.members, args.member],
		});
	},
});

export const removeMemberOrg = internalMutation({
	args: {orgId: v.string(), member: v.string()},
	async handler(ctx, args) {
		const org = await getOrg(ctx, args.orgId);
		await ctx.db.patch(org._id, {
			members: org.members.filter(member => member !== args.member),
		});
	},
});

export const removeOrg = internalMutation({
	args: {orgId: v.string()},
	async handler(ctx, args) {
		const org = await getOrg(ctx, args.orgId);

		if (org.members.length > 0) {
			await Promise.all(
				org.members.map(member =>
					ctx.runMutation(internal.users.removeOrgMemberShipToUser, {
						userId: member,
						orgId: args.orgId,
					}),
				),
			);
		}
		if (org.rooms && org.rooms.length > 0) {
			await Promise.all(
				org.rooms.map(roomId => {
					ctx.runMutation(api.rooms.turnOnCountUpDeleteRoom, {roomId});
				}),
			);
		}

		await ctx.db.delete(org._id);
	},
});

export const getOrgById = query({
	args: {orgId: v.string()},
	async handler(ctx, args) {
		const org = await getOrg(ctx, args.orgId);
		return org;
	},
});

export const getOrgsOfUser = query({
	args: {userId: v.string()},
	async handler(ctx, args) {
		const user = await ctx.db
			.query("users")
			.withIndex("by_userId", q => q.eq("userId", args.userId))
			.first();

		if (!user) {
			throw new ConvexError("expected user to be defined");
		}
		const orgIds = user.orgIds.map(org => org.orgId);

		return await Promise.all(orgIds.map(orgId => getOrg(ctx, orgId)));
	},
});
