"use client";

import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className=" border border-gray-600">
			<Table className="border-blackBorder">
				<TableHeader className="border-b border-gray-600">
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id} className="hover:bg-blackLight">
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										className="text-gray-100/80 font-bold hover:text-white hover:bg-blackLight hover:bg-gray-600/20">
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, index) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className={cn(
									"hover:bg-blue-400/10 hover:text-white  text-gray-300/80 ",
									index % 2 !== 0 && "bg-gray-600/10",
								)}>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
