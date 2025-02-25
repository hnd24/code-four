"use client";
import {Hint} from "@/components/hint";
import {useSidebar} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {OrganizationSwitcher, UserButton} from "@clerk/nextjs";
import LogoToggleSidebar from "../components/logo-toggle-sidebar";

export default function header() {
	const {isMobile, toggleSidebar} = useSidebar();
	return (
		<div className="text-gray-100 border-b border-b-blackBorder">
			<div className="w-full justify-between h-[58px] flex items-center">
				<div className={cn("hidden gap-2 items-center", isMobile && "flex")}>
					<LogoToggleSidebar toggleSidebar={toggleSidebar} />
				</div>
				{/* <Search className="md:flex hidden" /> */}
				<div></div>
				<div className="flex items-center gap-2 ">
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
