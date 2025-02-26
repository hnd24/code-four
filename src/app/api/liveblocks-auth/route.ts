// import {auth, currentUser} from "@clerk/nextjs";
import {currentUser} from "@clerk/nextjs/server";
import {Liveblocks} from "@liveblocks/node";
import {type NextRequest} from "next/server";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const USER_COLOR = ["#D583F0", "#F08385", "#F0D885", "#85EED6", "#85BBF0", "#85DBF0", "#85EE85"];

const getUserInfo = async () => {
	const user = await currentUser();
	const color = Math.floor(Math.random() * USER_COLOR.length);
	return {
		userId: user?.id || "anonymous",
		name: user?.fullName || "Anonymous",
		picture: user?.imageUrl || "/public/avatar-1.png",
		color: USER_COLOR[color],
	};
};

const liveblocks = new Liveblocks({
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
	// Create a session for the current user
	// userInfo is made available in Liveblocks presence hooks, e.g. useOthers
	const userInfo = await getUserInfo();
	const session = liveblocks.prepareSession(`user-${userInfo.userId}`, {
		userInfo: userInfo,
	});

	// Use a naming pattern to allow access to rooms with a wildcard
	session.allow(`*`, session.FULL_ACCESS);

	// Authorize the user and return the result
	const {body, status} = await session.authorize();
	return new Response(body, {status});
}
