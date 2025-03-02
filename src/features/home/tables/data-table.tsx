"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import {cn} from "@/lib/utils";
import {Columns} from "lucide-react";
import {useState} from "react";
import SelectTypeRoom from "./select-type-room";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const table = useReactTable({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	return (
		<div className="gap-4 ">
			<div className="flex items-center justify-between py-4">
				{/* <ListRooms /> */}
				<Input
					placeholder="Search Name..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={event => table.getColumn("name")?.setFilterValue(event.target.value)}
					className={cn(
						"text-black dark:text-white/60 border-2 border-blackBorder w-64 lg:w-80 focus:border-gray-600",
					)}
				/>
				<div className="flex gap-2 ">
					<SelectTypeRoom />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="ml-auto dark:bg-blue-700 dark:hover:bg-blue-800  outline-none px-2 py-1">
								<span className="lg:flex hidden">Columns</span>
								<Columns className="flex lg:hidden " size={18} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" side="left">
							{table
								.getAllColumns()
								.filter(column => column.getCanHide())
								.map(column => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize cursor-pointer"
											checked={column.getIsVisible()}
											onCheckedChange={value => column.toggleVisibility(!!value)}>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<Table className="border-blackBorder border-2 ">
				<TableHeader className="border-b border-gray-600 ">
					{table?.getHeaderGroups()?.map(headerGroup => (
						<TableRow
							key={headerGroup.id}
							className="hover:bg-whiteLight dark:hover:bg-blackLight ">
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										className="dark:text-white/80 font-bold  hover:bg-gray-300 dark:bg-blackLight dark:hover:bg-gray-600/20 ">
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel()?.rows?.length ? (
						table.getRowModel()?.rows.map((row, index) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className={cn(
									"cursor-pointer",
									"dark:hover:bg-blue-400/10 dark:hover:text-white dark:hover:!border-b dark:hover:border-white dark:text-gray-300/80 ",
									"text-black hover:bg-gray-300 hover:border-b hover:border-black",
								)}>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell?.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow className="h-24 text-center hover:!bg-blackLight text-white">
							<TableCell colSpan={columns.length}>No rooms.</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					size="sm"
					className="dark:bg-blue-700 dark:hover:bg-blue-800"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					Previous
				</Button>

				<Button
					size="sm"
					className="dark:bg-blue-700 dark:hover:bg-blue-800"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					Next
				</Button>
			</div>
		</div>
	);
}
