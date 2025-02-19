"use client";

import ContentRoom from "@/features/room/components/content-room";
import HeaderRoom from "@/features/room/components/header-room";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";

export default function RoomPage() {
	const pathname = usePathname();
	const roomId = pathname.split("/").pop();
	const {
		data: roomData,
		isPending,
		error,
	} = useQuery(convexQuery(api.rooms.getRoomById, {roomId: roomId as Id<"rooms">}));
	console.log("🚀 ~ RoomPage ~ room:", roomData);
	// if (!roomData) {
	// 	notFound();
	// }
	return (
		<div className="h-screen max-w-screen-2xl flex flex-col items-center mx-auto p-4 gap-4">
			<HeaderRoom />
			<ContentRoom />
		</div>
	);
}
