"use client";
import {ArrowUpDown} from "lucide-react";

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
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "_creationTime",
		header: ({column}) => (
			<div className="w-full flex gap-4">
				<span className="flex items-center">Create at</span>
				<Button
					variant="ghost"
					className="rounded-full hover:!bg-gray-300/60 !outline-none"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					<ArrowUpDown className=" h-4 w-4" />
				</Button>
			</div>
		),
		cell: ({row}) => formatTime(row.getValue("_creationTime")),
		sortingFn: "datetime",
	},

	{
		id: "joinRoom",
		cell: ({row}) => {
			const room = row.original;

			return (
				<div className="w-full flex  justify-center">
					<Hint label="click to move room" key={row.id}>
						<Button
							className=" bg-blue-700 hover:bg-blue-800 "
							onClick={() => {
								window.location.href = `/room/${room._id}`;
							}}>
							Join Room
						</Button>
					</Hint>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({row}) => {
			const room = row.original;

			return <DropdownMenuTable room={room} />;
		},
	},
];
