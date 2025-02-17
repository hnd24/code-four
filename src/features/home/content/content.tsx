import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {columns, Payment} from "@/features/home/content/components/columns";
import {DataTable} from "@/features/home/content/components/data-table";
import {Plus} from "lucide-react";

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: "728ed52f",
			amount: 100,
			status: "pending",
			email: "m@example.com",
		},
		// ...
	];
}

export default async function Content() {
	const data = await getData();
	return (
		<div className="h-full w-full flex flex-col gap-6">
			<div className="flex gap-6">
				<Hint label="Create new room" side="top">
					<div
						className="w-64 h-40 justify-center items-center rounded-xl border-2 border-blackBorder 
			hover:bg-gray-900 hover:border-gray-600 hidden md:flex">
						<Plus size={80} className="text-blackBorder hover:text-gray-600" />
					</div>
				</Hint>
				<Button className="text-gray-100/90 bg-indigo-600 flex md:hidden">Create new room</Button>
			</div>
			<div className="w-full h-[1px] bg-blackBorder flex md:hidden"></div>
			<div className="w-full mx-auto text-white flex flex-col gap-2">
				<div className="flex gap-2 md:hidden">
					<Input
						placeholder={"search rooms"}
						className=" border-2 border-blackBorder w-64 lg:w-80"
					/>
					<Button className="text-gray-100/90 bg-blue-600">Find</Button>
				</div>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	);
}
