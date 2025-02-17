import {Hint} from "@/components/hint";
import {SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import Image from "next/image";

type Props = {
	open: boolean;
};

export default function HeaderSidebar({open}: Props) {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<Hint label="feature coming soon" side="bottom">
						<div className="flex gap-2 w-full rounded-xl  hover:cursor-pointer">
							<div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-blackBlue border-2 border-blackBorder ">
								<Image
									src="/favicon/logo.ico"
									alt="logo"
									width={48}
									height={48}
									className="w-12 h-12 "
								/>
							</div>
							<div className={cn("hidden flex-col justify-center", open && "flex")}>
								<div className="text-lg font-bold leading-tight">Code Four</div>
								<div className="text-xs text-gray-100/60 w-full truncate">
									Code together, fun together
								</div>
							</div>
						</div>
					</Hint>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}
