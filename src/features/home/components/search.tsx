"use client";
import {Input} from "@/components/ui/input";
import {useTable} from "@/hooks/use-table";
// Import useTable
import {cn} from "@/lib/utils";

type Props = {
	className?: string;
	change: (value: string) => void;
};

export default function Search({className}: Props) {
	const {
		config: {search: globalFilter},
		setConfig,
	} = useTable(); // Lấy search từ useTable

	return (
		<Input
			placeholder="Search..."
			value={globalFilter || ""}
			onChange={event => setConfig((prev: any) => ({...prev, search: event.target.value}))}
			className={cn("border-2 border-blackBorder w-64 lg:w-80 focus:border-gray-600", className)}
		/>
	);
}
