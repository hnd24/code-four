"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import DropdownOrgs from "./DropdownOrgs";
import DropdownProblems from "./DropdownProblems";
import FooterSidebar from "./FooterSidebar";
import HeaderSidebar from "./HeaderSidebar";

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
