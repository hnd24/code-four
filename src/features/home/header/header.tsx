"use client";
import {Input} from "@/components/ui/input";
import {useSidebar} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {OrganizationSwitcher, UserButton} from "@clerk/nextjs";
import {Aperture} from "lucide-react";

export default function header() {
	const {isMobile, open, toggleSidebar} = useSidebar();
	return (
		<div className="text-gray-100  w-full h-full">
			<div className="w-full justify-between border-b-blackBorder h-14 border-b flex items-center">
				<div
					onClick={toggleSidebar}
					className={cn(
						" flex text-2xl mb-2 p-2 cursor-pointer w-fit justify-center gap-2 rounded-xl",
						!isMobile && open ? "bg-blue-600" : "bg-indigo-600",
					)}>
					<div className="flex gap-1 transition-transform duration-1000">
						<Aperture size={32} className={cn(!isMobile && open && "animate-spin")} />
					</div>
				</div>
				<div className="mb-2 ">
					<Input
						placeholder={"search rooms"}
						className=" md:flex hidden border-2 border-blackBorder w-64 lg:w-80"
					/>
				</div>
				<div className="mb-2 flex items-center gap-2 ">
					<UserButton />
					<OrganizationSwitcher
						hidePersonal
						appearance={{
							elements: {
								rootBox: {
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: "100%",
								},
								organizationSwitcherTrigger: {
									padding: "6px",
									maxWidth: "120px",
									borderRadius: "8px",
									border: "2px solid #313244",
									justifyContent: "space-between",
									backgroundColor: "#12121a",
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}
