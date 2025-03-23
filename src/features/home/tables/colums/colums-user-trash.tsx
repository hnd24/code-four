"use client";
import {ArrowRightFromLine, ArrowUpDown} from "lucide-react";

import {Button} from "@/components/ui/button";
import {formatTime} from "@/lib/utils";
import {roomType} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import DropdownMenuTable from "../components/dropdown-menu-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsUserTrash: ColumnDef<roomType>[] = [
	{
		id: "joinRoom",

		cell: ({row}) => {
			const room = row.original;
			if (room?._id)
				return (
					<div className="w-full flex justify-center">
						<Button
							className=" bg-blue-700 hover:bg-blue-800 "
							onClick={() => {
								window.location.href = `/room/${room?._id}`;
							}}>
							<span className="hidden lg:flex">Join Room</span>
							<ArrowRightFromLine className="flex lg:hidden" size={14} />
						</Button>
					</div>
				);
		},
	},

	{
		accessorKey: "name",
		header: "Name",
		cell: ({row}) => {
			const room = row.original;
			return <div className="min-w-full flex items-center justify-start">{room?.name}</div>;
		},
	},
	{
		accessorKey: "_creationTime",
		header: ({column}) => (
			<div className=" flex justify-between ">
				<span className="flex items-center">Create at</span>
				<ArrowUpDown
					size={16}
					className=" cursor-pointer text-black dark:text-white"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				/>
			</div>
		),
		cell: ({row}) => {
			const room = row.original;
			if (room?._creationTime)
				return (
					<div className="min-w-fit pr-2 truncate">{formatTime(room?._creationTime || 0)}</div>
				);
		},
		sortingFn: "datetime",
	},
	{
		accessorKey: "deleteTime",
		header: ({column}) => (
			<div className="w-full flex justify-between items-center">
				<span className="min-w-fit flex items-center">Auto-Delete</span>
				<ArrowUpDown
					size={16}
					className=" cursor-pointer text-black dark:text-white"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				/>
			</div>
		),
		cell: ({row}) => {
			const room = row.original;
			if (room.deletionCountup && room.deletionCountup > 0)
				return (
					<div className="w-full flex items-center justify-center">
						<span>{7 - room.deletionCountup} day</span>
					</div>
				);
		},
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
