"use client";

import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import NoAccessPage from "@/app/pages/no-access-page";
import ContentRoom from "@/features/room/components/content-room";
import HeaderRoom from "@/features/room/components/header-room";
import {useUser} from "@clerk/nextjs";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";

export default function RoomPage() {
	const pathname = usePathname();

	const roomId = pathname.split("/").pop();
	const {user} = useUser();
	console.log("🚀 ~ RoomPage ~ user:", user);
	const {data, isPending, error} = useQuery(
		convexQuery(api.rooms.confirmJoinRoom, {roomId: roomId as Id<"rooms">}),
	);

	return (
		<>
			{isPending ? (
				<Loading />
			) : !data ? (
				<NotFound />
			) : data === 5 ? (
				<NoAccessPage />
			) : (
				<div className="h-screen max-w-screen-2xl flex flex-col items-center mx-auto p-4 gap-4">
					<HeaderRoom />
					<ContentRoom />
				</div>
			)}
		</>
	);
}
