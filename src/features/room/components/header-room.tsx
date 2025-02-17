import Logo from "@/components/logo";

import Navbar from "./navbar";
import ThemeSelector from "./rheme-selector";
import ShareButton from "./share-button";

export default function HeaderRoom() {
	return (
		<div
			className="flex w-full text-white justify-between bg-blackLight
			rounded-lg border-2 border-blackBorder">
			<div className="flex">
				<Logo isSlogan={false} className="hidden sm:flex" />
				<Navbar className="flex sm:hidden" />
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
				<ThemeSelector className="hidden sm:flex" />
				<ShareButton />
			</div>
		</div>
	);
}
