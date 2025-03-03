"use client";

import SwitchMode from "@/components/switch-mode";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {useOrganization, useUser} from "@clerk/nextjs";
import CreateOrgButton from "../components/create-org-button";
import DropdownOrgs from "./components/dropdown-orgs";
import HeaderSidebar from "./components/header-sidebar";
import OrgProfile from "./components/org-profile";

export function AppSidebar() {
	const {open, openMobile, toggleSidebar} = useSidebar();
	const {isSignedIn} = useUser();
	const {organization} = useOrganization();
	const {user} = useUser();
	return (
		<div className={cn(!!user ? "flex" : "hidden")}>
			<Sidebar
				collapsible={isSignedIn ? "icon" : "offcanvas"}
				className="!border-r-2 border-blackBorder ">
				{/* header */}
				<HeaderSidebar open={open || openMobile} toggleSidebar={toggleSidebar} />
				<SidebarSeparator className="bg-blackBorder hidden dark:flex" />
				{/* content */}
				<SidebarContent>
					<SidebarGroup>
						<DropdownOrgs />
						<SidebarSeparator className="bg-blackBorder" />
						{/* feature is coming soon */}
						{/* <DropdownProblems /> */}
						<SidebarGroup className="group-data-[collapsible=icon]:hidden">
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<OrgProfile disabled={!organization} />
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<CreateOrgButton />
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarGroup>
				</SidebarContent>
				<SidebarSeparator className="bg-blackBorder" />
				{/* footer */}

				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SwitchMode open={open} />
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
		</div>
	);
}
