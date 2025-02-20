"use client";

import {Hint} from "@/components/hint";
import {useTable} from "@/hooks/use-table";
import {cn} from "@/lib/utils";

export const listRooms = ["Organization", "Favorites", "User", "Trash"];

export default function ListRooms() {
	const {
		config: {typeRooms},
	} = useTable();
	return (
		<Hint label="featre coming soon">
			<div className="flex border  border-blackBorder w-fit ">
				{listRooms.map((item, index) => (
					<div
						key={index}
						className={cn(
							"px-2 py-1 transition-all duration-300 cursor-pointer",
							typeRooms === item && "bg-blackBorder",
						)}>
						{item}
					</div>
				))}
			</div>
		</Hint>
	);
}
