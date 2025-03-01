"use client";

import Loading from "@/app/loading";
import {ClientSideSuspense} from "@liveblocks/react";
import {RoomProvider} from "@liveblocks/react/suspense";
import {usePathname, useSearchParams} from "next/navigation";
import {ReactNode, useMemo} from "react";

export function Room({children}: {children: ReactNode}) {
	const pathname = usePathname();

	const roomId = pathname?.split("/").pop() || "example-room";

	return (
		<RoomProvider
			id={roomId!}
			initialPresence={{
				cursor: null,
			}}>
			<ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
		</RoomProvider>
	);
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
	const params = useSearchParams();
	const exampleId = params?.get("exampleId");

	const exampleRoomId = useMemo(() => {
		return exampleId ? `${roomId}-${exampleId}` : roomId;
	}, [roomId, exampleId]);

	return exampleRoomId;
}
