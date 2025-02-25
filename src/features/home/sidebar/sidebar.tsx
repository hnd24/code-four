"use client";

import {
	Sidebar,
	SidebarContent,
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
import DropdownProblems from "./components/dropdown-problems";
import FooterSidebar from "./components/footer-sidebar";
import HeaderSidebar from "./components/header-sidebar";
import OrgProfile from "./components/org-profile";

export function AppSidebar() {
	const {open, toggleSidebar} = useSidebar();
	const {isSignedIn} = useUser();
	const {organization} = useOrganization();
	const {user} = useUser();
	return (
		<div className={cn(!!user ? "flex" : "hidden")}>
			<Sidebar
				collapsible={isSignedIn ? "icon" : "offcanvas"}
				className="text-gray-100/90 border-blackBorder ">
				{/* header */}
				<HeaderSidebar open={open} toggleSidebar={toggleSidebar} />
				<SidebarSeparator className="bg-blackBorder" />
				{/* content */}
				<SidebarContent>
					<SidebarGroup>
						<DropdownOrgs />
						<SidebarSeparator className="bg-blackBorder" />
						<DropdownProblems />
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
				<FooterSidebar open={open} />
			</Sidebar>
		</div>
	);
}
