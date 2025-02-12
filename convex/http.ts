import {httpRouter} from "convex/server";

import {internal} from "./_generated/api";
import {httpAction} from "./_generated/server";
const http = httpRouter();

http.route({
	path: "/clerk",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const payloadString = await request.text();
		const headerPayload = request.headers;

		try {
			const result = await ctx.runAction(internal.clerk.fulfill, {
				payload: payloadString,
				headers: {
					"svix-id": headerPayload.get("svix-id")!,
					"svix-timestamp": headerPayload.get("svix-timestamp")!,
					"svix-signature": headerPayload.get("svix-signature")!,
				},
			});

			switch (result.type) {
				case "user.created":
					await ctx.runMutation(internal.users.createUser, {
						userId: result.data.id,
						name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
						image: result.data.image_url,
						email: result.data.email_addresses[0].email_address,
					});
					break;
				case "user.updated":
					await ctx.runMutation(internal.users.updateUser, {
						userId: result.data.id,
						name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
						image: result.data.image_url,
					});
					break;
				case "organizationMembership.created":
					await ctx.runMutation(internal.users.addOrgIdToUser, {
						userId: result.data.public_user_data.user_id,
						orgId: result.data.organization.id,
						role: result.data.role === "org:admin" ? "admin" : "member",
					});
					break;
				case "organizationMembership.updated":
					await ctx.runMutation(internal.users.updateRoleInOrgForUser, {
						userId: result.data.public_user_data.user_id,
						orgId: result.data.organization.id,
						role: result.data.role === "org:admin" ? "admin" : "member",
					});
					break;
				case "organizationMembership.deleted":
					await ctx.runMutation(internal.users.removeOrgIdFromUser, {
						userId: result.data.public_user_data.user_id,
						orgId: result.data.organization.id,
					});
					break;
				case "organization.deleted": 
					await ctx.runMutation(internal.organizations.removeOrg, {
						orgId: result.data.id ?? "",
					});
					break;
			}

			return new Response(null, {
				status: 200,
			});
		} catch (err) {
			return new Response("Webhook Error", {
				status: 400,
			});
		}
	}),
});

export default http;
