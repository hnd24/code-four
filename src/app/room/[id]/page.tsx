"use client";

import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import ContentRoom from "@/features/room/content/content-room";
import HeaderRoom from "@/features/room/header/header-room";
import {Room} from "@/liveblocks/Room";
import NoAccessPage from "@/pages/no-access-page";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";

export default function RoomPage() {
	const pathname = usePathname();

	const roomId = pathname?.split("/").pop() || "";
	const {data: room, isPending} = useQuery(
		convexQuery(api.rooms.confirmJoinRoom, {roomId: roomId as Id<"rooms">}),
	);

	return (
		<>
			{isPending ? (
				<Loading />
			) : !room ? (
				<NotFound />
			) : room === 5 ? (
				<NoAccessPage />
			) : (
				<Room>
					<div className="h-screen max-w-screen-2xl flex flex-col items-center mx-auto p-4 gap-4">
						<HeaderRoom roomName={room.name} roomId={roomId} authorId={room.author} />
						<ContentRoom roomId={roomId} />
					</div>
				</Room>
			)}
		</>
	);
}
