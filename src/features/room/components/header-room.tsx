import Logo from "@/features/room/components/logo-room-page";

import {Avatars} from "@/liveblocks/components/Avatars";
import Navbar from "./navbar";
import ThemeSelector from "./theme-selector";
type Props = {
	roomName?: string;
};

export default function HeaderRoom({roomName = "room1"}: Props) {
	return (
		<div
			className="flex w-full text-white justify-between bg-blackLight
			rounded-lg border-2 border-blackBorder">
			<div className="flex">
				<Logo isSlogan={false} className="hidden sm:flex" />
				<Navbar className="flex sm:hidden" />
				<div className="flex flex-col justify-center">
					<div className=" flex-col justify-around">
						<div className="text-lg leading-6 font-bold text-white max-w-24 truncate flex items-center">
							{roomName}
						</div>
						<div className="hidden md:flex text-[12px]  text-white/60 ">
							Code together, fun together
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center mr-3 gap-2 lg:gap-5">
				<ThemeSelector className="hidden sm:flex" />
				<Avatars />
			</div>
		</div>
	);
}
