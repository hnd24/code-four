import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";

export async function getCode(ctx: QueryCtx | MutationCtx, codeId: Id<"code">) {
	const room = await ctx.db.get(codeId);
	if (!room) {
		throw new ConvexError("Code not found");
	}
	return room;
}

export async function createCode(
	ctx: MutationCtx,
	roomId: Id<"rooms">,
	code: string,
	language: string,
) {
	await ctx.db.insert("code", {roomId, code, language});
}

export async function deleteCodeByRoomId(ctx: MutationCtx, roomId: Id<"rooms">) {
	const code = await ctx.db
		.query("code")
		.withIndex("by_roomId", q => q.eq("roomId", roomId))
		.first();
	if (!code) return;
	await ctx.db.delete(code._id);
}

export const updateLanguageInCodeRoom = mutation({
	args: {
		codeId: v.id("code"),
		language: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.codeId, {language: args.language});
	},
});

export const updateCode = mutation({
	args: {
		codeId: v.id("code"),
		code: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.codeId, {code: args.code});
	},
});

export const getCodeByRoomId = query({
	args: {
		roomId: v.id("rooms"),
	},
	async handler(ctx, args) {
		const code = await ctx.db
			.query("code")
			.withIndex("by_roomId", q => q.eq("roomId", args.roomId))
			.first();
		return code;
	},
});
