import {cn} from "@/lib/utils";
import {Aperture} from "lucide-react";

type Props = {
	open: boolean;
	toggleSidebar?: () => void;
	isMobile?: boolean;
};

export default function ApertureButton({open, toggleSidebar, isMobile}: Props) {
	return (
		<div
			onClick={toggleSidebar}
			className={cn(
				" flex text-2xl p-2 cursor-pointer w-fit justify-center gap-2 rounded-xl",
				!isMobile && open ? "bg-blue-600" : "bg-indigo-600",
			)}>
			<div className="flex gap-1 transition-transform duration-1000">
				<Aperture size={32} className={cn(!isMobile && open && "animate-spin")} />
			</div>
		</div>
	);
}
