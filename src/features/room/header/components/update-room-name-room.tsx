import {Hint} from "@/components/hint";
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
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";

type Props = {
	roomName: string;
	roomId: string;
};

export default function UpdateDateRoomNamRoom({roomName, roomId}: Props) {
	const [open, setOpen] = useState<boolean>();
	const [newName, setNewName] = useState<string>(roomName);
	const {mutate: updateNameRoom, isPending} = useMutation({
		mutationFn: useConvexMutation(api.rooms.updateNameRoom),
	});
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<>
					<Hint label="update room name">
						<div className="flex flex-col justify-center px-4 cursor-pointer hover:bg-black/30 rounded-r-xl group">
							<div className=" flex-col justify-around">
								<div
									className="text-lg leading-6 font-bold text-white w-full truncate flex items-center
						dark:group-hover:text-white/60">
									{roomName}
								</div>
								<div
									className="hidden md:flex text-[12px]  text-white/60 
						dark:group-hover:text-white/40">
									Code together, fun together
								</div>
							</div>
						</div>
					</Hint>
				</>
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
							defaultValue={roomName}
						/>
					</div>

					<Button
						className="dark:text-black/90"
						onClick={async () => {
							await updateNameRoom({roomId: roomId as Id<"rooms">, name: newName});
							setOpen(false);
						}}
						disabled={isPending || newName === roomName || newName === ""}>
						Save
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
