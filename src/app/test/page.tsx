import ServerTable from "@/features/home/content/components/server-table";

export default function page() {
	return (
		<div className="w-screen h-screen bg-blackLight flex items-center justify-center">
			<div className="w-full">
				<ServerTable />
			</div>
		</div>
	);
}
