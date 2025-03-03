"use client";

import Logo from "@/features/room/header/logo-room-page";

import {cn} from "@/lib/utils";
import {Avatars} from "@/liveblocks/components/Avatars";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import Navbar from "../components/navbar";
import ThemeSelector from "./theme-selector";

type Props = {
	roomName?: string;
};

export default function HeaderRoom({roomName = "room1"}: Props) {
	const {theme, setTheme} = useTheme();
	return (
		<div
			className="flex w-full  justify-between  rounded-2xl shadow-2xl
			bg-whiteLight
			border-x-2 border-b-2 border-black
		dark:border-2 dark:rounded-lg dark:text-white dark:bg-blackLight dark:border-blackBorder ">
			<div
				className="flex bg-black/90 rounded-xl pr-4
			dark:bg-transparent dark:rounded-lg">
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
