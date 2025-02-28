"use client";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {listTypeRoom} from "@/constants";
import {useTable} from "@/hooks/use-table";
import {ListCollapse} from "lucide-react";

export default function SelectTypeRoom() {
	const {
		config: {typeRooms},
		setConfig,
	} = useTable();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="ml-auto bg-green-700 hover:bg-green-800  outline-none px-2 py-1">
					<span className="lg:flex hidden">Type</span>
					<ListCollapse className="flex lg:hidden " size={18} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" side="left">
				{listTypeRoom.map((type, index) => (
					<DropdownMenuCheckboxItem
						key={index}
						checked={type === typeRooms}
						onClick={() => setConfig({typeRooms: type})}>
						{type}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
