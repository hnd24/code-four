import {cn} from "@/lib/utils";
import Image from "next/image";

type Props = {
	open?: boolean;
	toggleSidebar?: () => void;
};

export default function LogoToggleSidebar({open = true, toggleSidebar}: Props) {
	return (
		<div className=" flex gap-2 w-full rounded-xl  hover:cursor-pointer" onClick={toggleSidebar}>
			<div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-blackBlue border-2 border-blackBorder ">
				<Image src="/favicon/logo.ico" alt="logo" width={48} height={48} className="w-12 h-12 " />
			</div>
			<div className={cn("md:hidden flex-col justify-center w-full", open && "md:flex")}>
				<div className="text-lg font-bold text-white truncate">Code Four</div>
				<div className="text-xs text-gray-100/60 w-full truncate">Code together, fun together</div>
			</div>
		</div>
	);
}
