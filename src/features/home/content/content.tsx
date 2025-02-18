import Search from "../components/search";
import CreateNewRoomButton from "./components/create-new-room-button";
import SeparatorCustom from "./components/separator-custom";
import ServerTable from "./components/server-table";

export default function Content() {
	return (
		<div className="h-full w-full flex flex-col gap-4 md:gap-6">
			<div className="flex gap-6">
				<CreateNewRoomButton />
			</div>
			<SeparatorCustom className="flex md:hidden" />
			<div className="w-full mx-auto text-white flex flex-col gap-4">
				<Search className="flex md:hidden" />
				<ServerTable />
			</div>
		</div>
	);
}
