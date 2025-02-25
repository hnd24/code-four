"use client";
import {ArrowRightFromLine, ArrowUpDown, ShieldBan} from "lucide-react";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {formatTime} from "@/lib/utils";
import {roomType} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import DropdownMenuTable from "./dropdown-menu-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<roomType>[] = [
	{
		id: "joinRoom",

		cell: ({row}) => {
			const room = row.original;
			if (room?._id)
				return (
					<div className="w-full flex justify-center">
						<Hint label="click to move room" key={row.id}>
							<Button
								className=" bg-blue-700 hover:bg-blue-800 "
								onClick={() => {
									window.location.href = `/room/${room?._id}`;
								}}>
								<span className="hidden lg:flex">Join Room</span>
								<ArrowRightFromLine className="flex lg:hidden" size={14} />
							</Button>
						</Hint>
					</div>
				);
		},
	},
	{
		id: "block",
		header: "Block",
		cell: ({row}) => {
			const room = row.original;
			if (room?.block)
				return (
					<div className="w-full flex ">
						<ShieldBan className="h-4 w-4 text-yellow-700" />
					</div>
				);
		},
	},

	{
		accessorKey: "name",
		header: "Name",
		cell: ({row}) => {
			const room = row.original;
			return <div className="w-full flex items-center justify-start">{room?.name}</div>;
		},
	},
	{
		accessorKey: "_creationTime",
		header: ({column}) => (
			<div className="w-full flex justify-between ">
				<span className="flex items-center">Create at</span>
				<Button
					variant="ghost"
					className="rounded-full hover:!bg-gray-300/60 !outline-none"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<ArrowUpDown className=" h-4 w-4" />
				</Button>
			</div>
		),
		cell: ({row}) => {
			const room = row.original;
			if (room?._creationTime)
				return <div className="w-full truncate">{formatTime(room?._creationTime || 0)}</div>;
		},
		sortingFn: "datetime",
	},

	{
		id: "actions",
		cell: ({row}) => {
			const room = row.original;
			if (room)
				return (
					<div className="w-full flex items-center justify-center">
						<DropdownMenuTable room={room} />
					</div>
				);
		},
	},
];
