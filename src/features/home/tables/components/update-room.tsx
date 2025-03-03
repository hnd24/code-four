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
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {roomType} from "@/types";
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {NotebookPen} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";
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

export default function UpdateRoom({room, author, org}: PropsDetailsRoom) {
	const [open, setOpen] = useState<boolean>(false);
	const [newName, setNewName] = useState<string>(room?.name);
	const {mutate: updateNameRoom, isPending} = useMutation({
		mutationFn: useConvexMutation(api.rooms.updateNameRoom),
	});
	const isDisabled = isPending || newName === room?.name || newName === "";
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="w-full flex text-yellow-400/80  px-[7px] py-1 hover:cursor-pointer hover:bg-gray-300/20">
					<span className="font-sans  text-md">Update</span>
					<NotebookPen className="h-4 w-4 ml-auto relative top-[2px] " />
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex gap-2">Room Details</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">New Name</Label>
						<Input
							onChange={e => setNewName(e.target.value)}
							className="col-span-4"
							defaultValue={room?.name}
						/>
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
							<Input
								onKeyDown={e => {
									if (e.key === "Enter" && isDisabled) {
									}
								}}
								className="w-full"
								value={org?.name}
								disabled
							/>
							<Image
								src={org?.image || "/avt-room.png"}
								alt="logo Org"
								width={36}
								height={36}
								className=" rounded-lg  "
							/>
						</div>
					</div>
					<Button
						className="dark:text-black/90"
						onClick={async () => {
							await updateNameRoom({roomId: room._id as Id<"rooms">, name: newName});
							setOpen(false);
						}}
						disabled={isDisabled}>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
