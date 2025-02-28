"use client";

import {roomType} from "@/types";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../../../convex/_generated/api";
import {columnsOrgFav} from "./colums/columns-org-fav";
import TableSkeleton from "./components/table-skeleton";
import {DataTable} from "./data-table";

type Props = {
	userId: string;
};

export default function TableFav({userId}: Props) {
	const {data, isPending} = useQuery(convexQuery(api.rooms.getAllFavoriteRoomsByUser, {userId}));

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
