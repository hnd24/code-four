"use client";

import {useTable} from "@/hooks/use-table";
import TableFav from "./table-fav";
import TableOrg from "./table-org";
import TableTrash from "./table-trash";
import TableUser from "./table-user";

type Props = {
	userId: string;
	orgId: string;
};
export default function Table({userId, orgId}: Props) {
	const {
		config: {typeRooms},
	} = useTable();
	if (typeRooms === "Organization") {
		return <TableOrg orgId={orgId} userId={userId} />;
	} else if (typeRooms === "Favorites") {
		return <TableFav userId={userId} />;
	} else if (typeRooms === "User") {
		return <TableUser />;
	} else if (typeRooms === "Trash") {
		return <TableTrash />;
	}
}
