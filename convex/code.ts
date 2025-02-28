import {ConvexError} from "convex/values";
import {MutationCtx, QueryCtx} from "./_generated/server";
import {Id} from "./_generated/dataModel";

export async function getCode(ctx: QueryCtx | MutationCtx, codeId: Id<"code">) {
	const room = await ctx.db.get(codeId);
	if (!room) {
		throw new ConvexError("Code not found");
	}
	return room;
}
