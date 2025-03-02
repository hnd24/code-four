"use client";
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
import {
	Heart,
	HeartCrack,
	Loader2,
	MoreHorizontal,
	ScanLine,
	ShieldCheck,
	Trash2,
} from "lucide-react";
import {api} from "../../../../../convex/_generated/api";
import DetailsRoom from "./detail-room";
import UpdateRoom from "./update-room";

type Props = {
	room: roomType;
};

export default function DropdownMenuTable({room}: Props) {
	const {user} = useUser();

	const {mutate: deleteRoomById} = useMutation({
		mutationFn: useConvexMutation(api.rooms.deleteRoomById),
	});
	const {mutate: toggleFavoriteRoom} = useMutation({
		mutationFn: useConvexMutation(api.rooms.toggleFavoriteRoom),
	});
	const {mutate: UncountdownDelete} = useMutation({
		mutationFn: useConvexMutation(api.rooms.turnOffCountUpDeleteRoom),
	});
	const {data: isFavoriteRoom} = useQuery(
		convexQuery(api.rooms.confirmFavoriteRoom, {roomId: room._id, userId: user?.id || ""}),
	);
	const {data: author, isPending: isPendingAuthor} = useQuery(
		convexQuery(api.users.getUserProfile, {userId: room.author}),
	);
	const {data: org, isPending: isPendingOrg} = useQuery(
		convexQuery(api.organizations.getOrgById, {orgId: room.orgId}),
	);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-5 w-5 rounded-full p-0 text-black bg-transparent hover:!bg-gray-300/60
					dark:text-white/60 !outline-none">
					<MoreHorizontal className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" side="right" className="w-44">
				{room.author === user?.id && (
					<>
						{/* delete opt */}
						<DropdownMenuItem onClick={() => deleteRoomById({roomId: room._id})}>
							<div className="w-full flex text-red-700">
								<span className="">Delete</span>
								<Trash2 className="h-4 w-4  ml-auto" />
							</div>
						</DropdownMenuItem>
						{/* Un countdown delete file */}
						{room?.deletionCountup && room?.deletionCountup > 0 ? (
							<DropdownMenuItem onClick={() => UncountdownDelete({roomId: room._id})}>
								<div className="w-full flex text-green-700">
									<span className="">UnCountdown </span>
									<ShieldCheck className="h-4 w-4  ml-auto" />
								</div>
							</DropdownMenuItem>
						) : (
							<> </>
						)}
						{/* Update new name room */}
						<UpdateRoom
							room={room}
							author={{name: author?.name, image: author?.image}}
							org={{name: org?.name, image: org?.image}}
						/>
					</>
				)}
				{/* favorite opt */}
				<DropdownMenuItem>
					<div
						className="w-full flex text-pink-700"
						onClick={() => {
							toggleFavoriteRoom({roomId: room._id});
						}}>
						{isFavoriteRoom ? (
							<>
								<span>Un favorite</span>
								<HeartCrack className="h-4 w-4  ml-auto" />
							</>
						) : (
							<>
								<span>Favorite</span>
								<Heart className="h-4 w-4  ml-auto" />
							</>
						)}
					</div>
				</DropdownMenuItem>
				{/*  */}
				<DropdownMenuSeparator />
				<div className="w-full flex ">
					{isPendingOrg || isPendingAuthor ? (
						<Loader2 className="h-4 w-4" />
					) : (
						<DetailsRoom
							room={room}
							author={{name: author?.name, image: author?.image}}
							org={{name: org?.name, image: org?.image}}
						/>
					)}
				</div>
				<DropdownMenuItem
					className="hover:!border-none !outline-none "
					onClick={() => navigator.clipboard.writeText(room._id)}>
					<div className="w-full flex text-black/80 dark:text-white/80">
						<span>Copy ID</span>
						<ScanLine className="h-4 w-4 ml-auto" />
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
