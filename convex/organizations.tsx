import {ConvexError, v} from "convex/values";
import {internalMutation, MutationCtx, QueryCtx} from "./_generated/server";

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

export const createOrUpdateOrg = internalMutation({
	args: {orgId: v.string(), member: v.string()},
	async handler(ctx, args) {
		//check if org exists
		const org = await ctx.db
			.query("organizations")
			.withIndex("by_orgId", q => q.eq("orgId", args.orgId))
			.first();
		//if org exists, add member to org
		if (org) {
			await ctx.db.patch(org._id, {
				members: [...org.members, args.member],
			});
			//	if org does not exist, create org and add member
		} else {
			await ctx.db.insert("organizations", {
				orgId: args.orgId,
				name: "name",
				members: [args.member],
			});
		}
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

		org.members.forEach(async member => {
			const user = await ctx.db
				.query("users")
				.withIndex("by_userId", q => q.eq("userId", member))
				.first();
			if (user) {
				await ctx.db.patch(user._id, {
					orgIds: user.orgIds.filter(org => org.orgId !== args.orgId),
				});
			}
		});

		await ctx.db.delete(org._id);
	},
});
