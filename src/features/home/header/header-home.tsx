"use client";
import {Hint} from "@/components/hint";
import {useSidebar} from "@/components/ui/sidebar";

import {cn} from "@/lib/utils";
import {OrganizationSwitcher, UserButton} from "@clerk/nextjs";
import LogoToggleSidebar from "../components/logo-toggle-sidebar";
export default function header() {
	const {isMobile, toggleSidebar} = useSidebar();
	return (
		<div className=" rounded-bl-xl dark:rounded-none dark:px-0 pb-[1px] border-b-2  border-blackBorder ">
			<div className="w-full justify-between h-[58px] flex items-center pl-2">
				<div className={cn("hidden gap-2 items-center", isMobile && "flex")}>
					<LogoToggleSidebar toggleSidebar={toggleSidebar} open={false} />
				</div>
				{/* <Search className="md:flex hidden" /> */}
				<div></div>
				<div className="flex items-center gap-2 bg-blackLight h-full px-4 rounded-t-xl rounded-bl-xl shadow">
					<UserButton />
					<Hint label="manage your organizations">
						<div>
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
											color: "#fff",
											"&:hover": {
												color: "#fff",
											},
											"&:focus": {
												color: "#fff",
											},
											// backgroundColor: "--sidebar-background",
											// "&:hover": {
											// 	backgroundColor: "--sidebar-background",
											// },
										},
									},
								}}
							/>
						</div>
					</Hint>
				</div>
			</div>
		</div>
	);
}
