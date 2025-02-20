"use client";

import {roomType} from "@/types";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../../../../convex/_generated/api";
import {columns} from "./columns";
import {DataTable} from "./data-table";
import TableSkeleton from "./table-skeleton";

type Props = {
	orgId: string;
	userId: string;
};

export default function ServerTable({orgId, userId}: Props) {
	const {
		data: roomData,
		isPending,
		error,
	} = useQuery(convexQuery(api.rooms.getRoomsOfOrgByUser, {orgId, userId}));

	return (
		<>
			{isPending ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columns} data={roomData as roomType[]} />
			)}
		</>
	);
}
