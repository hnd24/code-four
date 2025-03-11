"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {roomType} from "@/types";
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {CopyPlus, Plus} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import {api} from "../../../../../convex/_generated/api";
type Props = {
	user: {
		id: string;
		name: string;
	};
	org: {
		id: string;
		name: string;
		image: string;
	};
	disabled?: boolean;
};

export default function CreateNewRoomButton({disabled = false, user, org}: Props) {
	const [nameRoom, setNameRoom] = useState("");
	const {mutate: createRoom, isPending} = useMutation({
		mutationFn: useConvexMutation(api.rooms.createRoom),
		onSuccess: room => {
			setNameRoom("");
			const room1 = room as roomType;
			window.location.replace(`/room/${room1?._id}`);
		},
	});
	const isDisabled = isPending || nameRoom === "";
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="px-2">
					<Hint label={"Create new room"} side="top">
						<Button
							asChild
							disabled={isPending || disabled}
							className="hidden md:flex !w-64 !h-40 justify-center items-center rounded-xl border-2 
							bg-gray-300 hover:bg-gray-400 hover:border-black/60
							dark:bg-blackLight  dark:hover:bg-gray-900 dark:border-blackBorder dark:hover:border-gray-600">
							<div className="h-full w-full flex flex-col justify-center items-center">
								<span className="text-4xl">
									<Plus className="w-20 h-20 text-blackBorder hover:text-gray-600" />
								</span>
							</div>
						</Button>
					</Hint>
					<Button
						className="flex md:hidden py-6 rounded-full
						text-white/90 
						dark:bg-indigo-600 ">
						<CopyPlus size={18} />
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Room</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Name</Label>
						<Input
							className="col-span-4"
							onKeyDown={async e => {
								if (e.key === "Enter" && !isDisabled) {
									await createRoom({name: nameRoom, author: user.id, orgId: org.id});
								}
							}}
							onChange={e => setNameRoom(e.target.value)}
						/>
					</div>
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Author</Label>
						<Input className="col-span-4" value={user.name} disabled />
					</div>
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Org</Label>
						<div className="col-span-4 flex gap-2">
							<Input className="w-full" value={org.name} disabled />
							<Image
								src={org.image}
								alt="logo Org"
								width={36}
								height={36}
								className=" rounded-lg border border-gray-400	"
							/>
						</div>
					</div>
					<Button
						className="dark:text-black"
						disabled={isDisabled}
						onClick={async () => {
							await createRoom({name: nameRoom, author: user.id, orgId: org.id});
						}}>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
