"use client";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {useQueryState} from "nuqs";

type Props = {
	className?: string;
};

export default function Search({className}: Props) {
	const [globalFilter, setGlobalFilter] = useQueryState("search");
	return (
		<Input
			placeholder="Search..."
			value={globalFilter || ""}
			onChange={event => setGlobalFilter(event.target.value)}
			className={cn("border-2 border-blackBorder w-64 lg:w-80 focus:border-gray-600", className)}
		/>
	);
}
