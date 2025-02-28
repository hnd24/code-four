"use client";

import {roomType} from "@/types";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../../../convex/_generated/api";
import {columnsUserTrash} from "./colums/colums-user-trash";
import TableSkeleton from "./components/table-skeleton";
import {DataTable} from "./data-table";

export default function TableUser() {
	const {data, isPending} = useQuery(convexQuery(api.rooms.getRoomsOfUser, {}));

	return (
		<>
			{isPending ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columnsUserTrash} data={data as roomType[]} />
			)}
		</>
	);
}
