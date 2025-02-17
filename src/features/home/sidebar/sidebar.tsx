"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import DropdownOrgs from "./components/dropdown-orgs";
import DropdownProblems from "./components/dropdown-problems";
import FooterSidebar from "./components/footer-sidebar";
import HeaderSidebar from "./components/header-sidebar";

export function AppSidebar() {
	const {open} = useSidebar();

	return (
		<Sidebar collapsible="icon" className="text-gray-100/90 border-blackBorder">
			{/* header */}
			<HeaderSidebar open={open} />
			<SidebarSeparator className="bg-blackBorder" />
			{/* content */}
			<SidebarContent>
				<SidebarGroup>
					<DropdownOrgs />
					<SidebarSeparator className="bg-blackBorder" />
					<DropdownProblems />
				</SidebarGroup>
			</SidebarContent>
			<SidebarSeparator className="bg-blackBorder" />
			{/* footer */}
			<FooterSidebar open={open} />
		</Sidebar>
	);
}
