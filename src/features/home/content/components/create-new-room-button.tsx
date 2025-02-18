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
import {Plus} from "lucide-react";
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
			window.location.replace(`/room/${room1?._id || ""}`);
		},
	});

	return (
		<Dialog>
			<DialogTrigger>
				<>
					<Hint label={"Create new room"} side="top">
						<Button
							asChild
							disabled={isPending || disabled}
							className="!w-64 !h-40 bg-blackLight justify-center items-center rounded-xl border-2 border-blackBorder 
  hover:bg-gray-900 hover:border-gray-600 hidden md:flex">
							<div className="h-full w-full flex flex-col justify-center items-center">
								<span className="text-4xl">
									<Plus className="w-20 h-20 text-blackBorder hover:text-gray-600" />
								</span>
							</div>
						</Button>
					</Hint>
					<Button asChild className="text-gray-100/90 bg-indigo-600 flex md:hidden">
						Create new room
					</Button>
				</>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Room</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Name</Label>
						<Input className="col-span-4" onChange={e => setNameRoom(e.target.value)} />
					</div>
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Author</Label>
						<Input className="col-span-4" value={user.name} disabled />
					</div>
					<div className="w-full grid grid-cols-5">
						<Label className="col-span-1 text-start mr-2 flex items-center">Org</Label>
						<Input className="col-span-4" value={org.name} disabled />
					</div>
					<Button
						disabled={isPending}
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
