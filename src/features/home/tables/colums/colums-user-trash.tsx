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
					className="rounded-full bg-blackLight hover:bg-gray-300/60 !outline-none"
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
		accessorKey: "deleteTime",
		header: ({column}) => (
			<div className="w-full flex justify-between ">
				<span className="flex items-center">Countdown delete</span>
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
			if (room.deletionCountup && room.deletionCountup > 0)
				return (
					<div className="w-full">
						<span>{7 - room.deletionCountup}</span>
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
