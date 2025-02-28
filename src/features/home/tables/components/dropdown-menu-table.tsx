"use client";
import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {roomType} from "@/types";
import {useUser} from "@clerk/nextjs";
import {convexQuery, useConvexMutation} from "@convex-dev/react-query";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
	BookUser,
	Heart,
	HeartCrack,
	Loader2,
	MoreHorizontal,
	ScanLine,
	ShieldCheck,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import {api} from "../../../../../convex/_generated/api";

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
					className="h-5 w-5 rounded-full p-0 hover:!bfg-gray-300/60 !outline-none">
					<MoreHorizontal className="h-4 w-4" />
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

type PropsDetailsRoom = {
	room: roomType;
	author: {
		name?: string;
		image?: string;
	};
	org: {
		name?: string;
		image?: string;
	};
};

function DetailsRoom({room, author, org}: PropsDetailsRoom) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="w-full flex px-[7px] py-1 hover:cursor-pointer hover:bg-gray-300/20">
					<span className="font-sans text-gray-900 text-md">Detail</span>
					<BookUser className="h-5 w-5 ml-auto relative top-[2px] text-gray-600" />
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex gap-2">Room Details</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Name</Label>
						<Input disabled className="col-span-4" value={room?.name} />
					</div>
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Author</Label>
						<div className="col-span-4 flex gap-2">
							<Input className="w-full" value={author?.name} disabled />
							<Image
								src={author?.image || "/avt-room.png"}
								alt="logo Org"
								width={36}
								height={36}
								className=" rounded-full "
							/>
						</div>
					</div>
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Org</Label>
						<div className="col-span-4 flex gap-2">
							<Input className="w-full" value={org?.name} disabled />
							<Image
								src={org?.image || "/avt-room.png"}
								alt="logo Org"
								width={36}
								height={36}
								className=" rounded-lg  "
							/>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
