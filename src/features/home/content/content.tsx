"use client";

import {cn} from "@/lib/utils";
import {useOrganization, useUser} from "@clerk/nextjs";
import Search from "../components/search";
import CreateNewRoomButton from "./components/create-new-room-button";
import SeparatorCustom from "./components/separator-custom";
import ServerTable from "./components/server-table";

export const ListRooms = ["Organization", "Favorites", "User", "trash"];

export default function Content() {
	const {user} = useUser();
	const {organization} = useOrganization();
	const ChooseListRooms = "Organization";
	return (
		<div className="h-full w-full flex flex-col gap-4 md:gap-6">
			<div className="flex gap-6">
				<CreateNewRoomButton
					user={{id: user?.id || "", name: user?.fullName || ""}}
					org={{id: organization?.id || "", name: organization?.name || ""}}
				/>
			</div>
			<SeparatorCustom className="flex md:hidden" />
			<div className="w-full mx-auto text-white flex flex-col gap-4">
				<div className="flex flex-col gap-4">
					<span className="text-xl font-bold md:flex hidden">List rooms :</span>
					<div className="flex border  border-blackBorder w-fit ">
						{ListRooms.map((item, index) => (
							<div
								key={index}
								className={cn(
									"px-2 py-1 transition-all duration-300",
									ChooseListRooms === item && "bg-blackBorder",
								)}>
								{item}
							</div>
						))}
					</div>
					<Search className="flex md:hidden" />
					<ServerTable />
				</div>
			</div>
		</div>
	);
}
