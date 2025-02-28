"use client";

import Table from "../tables/table";
import CreateNewRoomButton from "./components/create-new-room-button";
import SeparatorCustom from "./components/separator-custom";

type Props = {
	user: {
		id: string;
		fullName: string;
	};
	org: {
		id: string;
		name: string;
		image: string;
	};
};

export default function Content({user, org}: Props) {
	return (
		<div className="h-full w-full flex flex-col gap-4 md:gap-6">
			<div className="flex gap-6">
				<CreateNewRoomButton
					user={{id: user?.id, name: user?.fullName}}
					org={{id: org?.id, name: org?.name, image: org?.image}}
				/>
			</div>
			<SeparatorCustom className="flex md:hidden" />
			<div className="w-full mx-auto text-white flex flex-col gap-4">
				<div className="flex flex-col">
					<span className="text-xl font-bold md:flex hidden">List rooms :</span>
					<Table orgId={org?.id} userId={user?.id} />
				</div>
			</div>
		</div>
	);
}
