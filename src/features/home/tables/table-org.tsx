"use client";

import {roomType} from "@/types";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../../../convex/_generated/api";
import TableSkeleton from "./components/table-skeleton";
import {columnsOrgFav} from "./colums/columns-org-fav";
import {DataTable} from "./data-table";

type Props = {
	orgId: string;
	userId: string;
};

export default function TableOrg({orgId, userId}: Props) {
	const {data, isPending} = useQuery(convexQuery(api.rooms.getRoomsOfOrgByUser, {orgId, userId}));

	return (
		<>
			{isPending ? (
				<TableSkeleton />
			) : (
				<DataTable columns={columnsOrgFav} data={data as roomType[]} />
			)}
		</>
	);
}
