"use client";
import {Heart, HeartCrack, Loader, MoreHorizontal, ScanLine, Trash2} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {roomType} from "@/types";
import {useUser} from "@clerk/nextjs";
import {convexQuery, useConvexMutation} from "@convex-dev/react-query";
import {useMutation, useQuery} from "@tanstack/react-query";
import {api} from "../../../../../convex/_generated/api";

type Props = {
	room: roomType;
};

export default function DropdownMenuTable({room}: Props) {
	const {user} = useUser();
	// const {mutate: toggleBlockRoom, isPending: isPendingToggleBlockRoom} = useMutation({
	// 	mutationFn: useConvexMutation(api.rooms.toggleBlockRoom),
	// });
	const {mutate: deleteRoomById, isPending: isPendingDeleteRoom} = useMutation({
		mutationFn: useConvexMutation(api.rooms.deleteRoomById),
	});
	const {mutate: toggleFavoriteRoom, isPending: isPendingToggleFavoriteRoom} = useMutation({
		mutationFn: useConvexMutation(api.rooms.toggleFavoriteRoom),
	});
	const {data: isFavoriteRoom, isPending: isPendingFavoriteRoom} = useQuery(
		convexQuery(api.rooms.confirmFavoriteRoom, {roomId: room._id, userId: user?.id || ""}),
	);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-5 w-5 rounded-full p-0 hover:!bg-gray-300/60 !outline-none">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" side="right" className="w-44">
				{room.author === user?.id && (
					<>
						{/* delete opt */}
						<DropdownMenuItem onClick={() => deleteRoomById({roomId: room._id})}>
							<div className="w-full flex ">
								<span>Delete</span>
								{isPendingDeleteRoom ? (
									<Loader className="h-4 w-4 ml-auto text-red-700" />
								) : (
									<Trash2 className="h-4 w-4 text-red-700 ml-auto" />
								)}
							</div>
						</DropdownMenuItem>
						{/* block opt */}
						{/* <DropdownMenuItem>
							<div
								className="w-full flex "
								onClick={() => {
									toggleBlockRoom({roomId: room._id});
								}}>
								{room?.block ? (
									<div className="w-full flex">
										<span>Un Block</span>
										<Shield className="h-4 w-4 text-yellow-700 ml-auto" />
									</div>
								) : (
									<div className="w-full flex ">
										<span>Block</span>
										<ShieldBan className="h-4 w-4 text-yellow-700 ml-auto" />
									</div>
								)}
							</div>
						</DropdownMenuItem> */}
					</>
				)}
				{/* favorite opt */}
				<DropdownMenuItem>
					<div
						className="w-full flex "
						onClick={() => {
							toggleFavoriteRoom({roomId: room._id});
						}}>
						{isFavoriteRoom ? (
							<>
								<span>Un favorite</span>
								<HeartCrack className="h-4 w-4 text-pink-700 ml-auto" />
							</>
						) : (
							<>
								<span>Favorite</span>
								<Heart className="h-4 w-4 text-pink-700 ml-auto" />
							</>
						)}
					</div>
				</DropdownMenuItem>
				{/*  */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="hover:!border-none !outline-none hover:bg-gray-300/60"
					onClick={() => navigator.clipboard.writeText(room._id)}>
					<div className="w-full flex ">
						<span>Copy ID</span>
						<ScanLine className="h-4 w-4 ml-auto" />
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
