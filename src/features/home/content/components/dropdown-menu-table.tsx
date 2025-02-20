"use client";
import {Heart, MoreHorizontal, ScanLine, ShieldBan, Trash2} from "lucide-react";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {roomType} from "@/types";

type Props = {
	room: roomType;
};

export default function DropdownMenuTable({room}: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-5 w-5 rounded-full p-0 hover:!bg-gray-300/60 !outline-none">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" side="right">
				<DropdownMenuItem>
					<Hint label="feature coming soon">
						<div className="w-full flex ">
							<span>Delete</span>
							<Trash2 className="h-4 w-4 text-amber-700 ml-auto" />
						</div>
					</Hint>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Hint label="feature coming soon">
						<div className="w-full flex ">
							<span>Favorite</span>
							<Heart className="h-4 w-4 text-red-700 ml-auto" />
						</div>
					</Hint>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Hint label="feature coming soon">
						<div className="w-full flex ">
							<span>Block</span>
							<ShieldBan className="h-4 w-4 text-yellow-700 ml-auto" />
						</div>
					</Hint>
				</DropdownMenuItem>
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
