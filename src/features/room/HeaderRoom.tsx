import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";
import ThemeSelector from "./ThemeSelector";

export default function HeaderRoom() {
	return (
		<div
			className="flex w-full text-white justify-between bg-gradient-to-tr from-blackBlue to-blacklight
			rounded-lg border-2 border-blackBorder">
			<div className="flex">
				<Logo isSlogan={false} />
				<div className="flex flex-col justify-center">
					<div className=" flex-col justify-around 	 ">
						<div className="text-lg leading-5 font-bold text-white max-w-24 truncate">Room1</div>
						<div className="hidden md:flex text-[12px] leading-5 text-white/60 ">
							Code together, fun together
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center mr-3 gap-2 lg:gap-3">
				<ThemeSelector />
				<Button
					className="bg-blue-600 py-2 lg:py-1 px-2 lg:px-3 leading-none h-fit text-base font-medium
    hover:bg-blue-500 ">
					<Share2 className="text-white flex lg:hidden" />
					<div className="text-white hidden lg:flex">Share</div>
				</Button>
			</div>
		</div>
	);
}
