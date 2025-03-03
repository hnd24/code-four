"use client";

import Logo from "@/features/room/header/components/logo-room-page";

import {cn} from "@/lib/utils";
import {Avatars} from "@/liveblocks/components/Avatars";
import {useUser} from "@clerk/nextjs";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import Navbar from "../components/navbar";
import ThemeSelector from "./components/theme-selector";
import UpdateDateRoomNamRoom from "./components/update-room-name-room";

type Props = {
	roomName?: string;
	roomId: string;
	authorId: string;
};

export default function HeaderRoom({roomName = "room1", roomId, authorId}: Props) {
	const {user} = useUser();

	const {theme, setTheme} = useTheme();
	return (
		<div
			className="flex w-full  justify-between  rounded-2xl shadow-2xl
			bg-whiteLight
			border-x-2 border-b-2 border-black
		dark:border-2 dark:rounded-lg dark:text-white dark:bg-blackLight dark:border-blackBorder ">
			<div
				className="flex   
				bg-gradient-to-tr from-black/80 to-black/60 rounded-xl  border-t-2 border-r-2 border-black
				dark:bg-blackLight dark:rounded-lg dark:border-t-0  dark:border-blackBorder">
				<div className="hover:bg-black/30 rounded-l-xl ">
					<Logo isSlogan={false} className="hidden sm:flex" />
					<Navbar className="flex sm:hidden" />
				</div>
				<div className="h-full p-[1px] bg-black/30 dark:bg-blackBorder" />
				{user?.id === authorId ? (
					<UpdateDateRoomNamRoom roomName={roomName} roomId={roomId} />
				) : (
					<div className="flex flex-col justify-center px-4 cursor-pointer hover:bg-black/30 rounded-r-xl ">
						<div className=" flex-col justify-around">
							<div className="text-lg leading-6 font-bold text-white w-full truncate flex items-center">
								{roomName}
							</div>
							<div className="hidden md:flex text-[12px]  text-white/60 ">
								Code together, fun together
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="flex items-center gap-2 mr-2">
				<ThemeSelector className="hidden sm:flex " />
				<div
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					className={cn(
						"hidden md:flex items-center p-1 justify-center rounded-full border-2  transition-all",
						"border-black text-black bg-whiteLight",
						"dark:bg-blackLight dark:border-blackBorder dark:text-white/90",
					)}>
					{theme === "dark" ? <Moon /> : <Sun />}
				</div>

				<div className="ml-2">
					<Avatars />
				</div>
			</div>
		</div>
	);
}
