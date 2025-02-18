import {Suspense} from "react";
import {columns, Payment} from "./columns";
import {DataTable} from "./data-table";

export default function ServerTable() {
	const data: Payment[] = [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		{
			id: "728ed523",
			amount: 122,
			status: "success",
			email: "huy@example.com",
		},
		{
			id: "728ed521",
			amount: 2,
			status: "success",
			email: "duy@example.com",
		},
		{
			id: "728ed556",
			amount: 122,
			status: "failed",
			email: "danh@example.com",
		},
		// ...
	];
	return (
		<Suspense>
			<DataTable columns={columns} data={data} />
		</Suspense>
	);
}
