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
import {useUser} from "@clerk/nextjs";
import {convexQuery} from "@convex-dev/react-query";
import {useQuery} from "@tanstack/react-query";
import {ChevronDown, Loader} from "lucide-react";
import {api} from "../../../../../convex/_generated/api";
import OrgItem from "./org-item";

export default function DropdownOrgs() {
	const {open} = useSidebar();
	const {user} = useUser();
	const userId = user?.id || "";
	const {data: orgData, isPending} = useQuery(
		convexQuery(api.organizations.getOrgsOfUser, {userId}),
	);
	return (
		<Collapsible defaultOpen className="group/collapsible">
			<SidebarGroup>
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger>
						<div
							className="text-base gap-2 flex w-full truncate text-black font-bold 
							dark:text-white/60 dark:font-normal">
							{isPending ? (
								<Loader size={18} className=" relative top-0.5" />
							) : (
								<span>{orgData?.length}</span>
							)}
							Organizations
						</div>
						<ChevronDown className="ml-auto text-black dark:text-white/60 transition-transform group-data-[state=open]/collapsible:rotate-180" />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent>
						<SidebarMenu>
							{isPending ? (
								<div className={cn(!open && "hidden")}>
									<SidebarMenuSkeleton className="w-44" showIcon></SidebarMenuSkeleton>
									<SidebarMenuSkeleton className="w-52" showIcon></SidebarMenuSkeleton>
									<SidebarMenuSkeleton className="w-36" showIcon></SidebarMenuSkeleton>
								</div>
							) : (
								orgData &&
								orgData?.map((mem, index) => (
									<SidebarMenuItem key={index}>
										<SidebarMenuButton asChild>
											<OrgItem
												id={mem.orgId}
												name={mem.name}
												imageUrl={mem.image || "/favicon/chart.svg"}
												memberCount={mem.members.length}
											/>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
