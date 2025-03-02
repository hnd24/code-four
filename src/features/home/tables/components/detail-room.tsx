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
import {BookUser} from "lucide-react";
import Image from "next/image";
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

export default function DetailsRoom({room, author, org}: PropsDetailsRoom) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="w-full flex text-black/80 dark:!text-white/80 px-[7px] py-1 hover:cursor-pointer hover:bg-gray-300/20">
					<span className="font-sans  text-md">Detail</span>
					<BookUser className="h-4 w-4 ml-auto relative top-[2px] " />
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
