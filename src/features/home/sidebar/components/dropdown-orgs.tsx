"use client";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	useSidebar,
} from "@/components/ui/sidebar";

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {cn} from "@/lib/utils";
import {useOrganizationList} from "@clerk/nextjs";
import {ChevronDown, Loader} from "lucide-react";
import OrgItem from "./org-item";

export default function DropdownOrgs() {
	const {open} = useSidebar();
	const {userMemberships, isLoaded} = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});
	return (
		<Collapsible defaultOpen className="group/collapsible">
			<SidebarGroup>
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger>
						<div className="text-gray-100/60 text-base gap-2 flex w-full truncate">
							{isLoaded ? (
								<span>{userMemberships.data?.length}</span>
							) : (
								<Loader size={18} className=" relative top-0.5" />
							)}
							Organizations
						</div>
						<ChevronDown className="ml-auto text-gray-100/60 transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent>
						<SidebarMenu>
							{isLoaded ? (
								userMemberships.data?.map((mem, index) => (
									<SidebarMenuItem key={index}>
										<SidebarMenuButton asChild>
											<OrgItem
												id={mem.organization.id}
												name={mem.organization.name}
												imageUrl={mem.organization.imageUrl}
												memberCount={mem.organization.membersCount}
											/>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))
							) : (
								<div className={cn(!open && "hidden")}>
									<SidebarMenuSkeleton className="w-44" showIcon></SidebarMenuSkeleton>
									<SidebarMenuSkeleton className="w-52" showIcon></SidebarMenuSkeleton>
									<SidebarMenuSkeleton className="w-36" showIcon></SidebarMenuSkeleton>
								</div>
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
