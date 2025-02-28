"use client";

import {roomType} from "@/types";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {api} from "../../../../convex/_generated/api";
import {columnsUserTrash} from "./colums/colums-user-trash";
import TableSkeleton from "./components/table-skeleton";
import {DataTable} from "./data-table";

export default function TableTrash() {
	const {data, isPending} = useQuery(convexQuery(api.rooms.getRoomsOfUser, {}));

	const roomData = useMemo(() => {
		return data?.filter(room => room?.deletionCountup && room.deletionCountup > 0);
	}, [data]);

	return (
		<>
			{isPending ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columnsUserTrash} data={roomData as roomType[]} />
			)}
		</>
	);
}
