"use client";

import {roomType} from "@/types";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {api} from "../../../../../convex/_generated/api";
import {columns} from "./columns";
import {DataTable} from "./data-table";

type Props = {
	orgId: string;
};

export default function ServerTable({orgId}: Props) {
	const {
		data: roomData,
		isPending,
		error,
	} = useQuery(convexQuery(api.rooms.getRoomsOfOrganization, {orgId}));

	return (
		<>
			{isPending ? (
				<div className="">Loading...</div>
			) : (
				<DataTable columns={columns} data={roomData as roomType[]} />
			)}
		</>
	);
}
