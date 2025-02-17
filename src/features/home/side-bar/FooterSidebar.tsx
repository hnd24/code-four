"use client";

import {Button} from "@/components/ui/button";
import {SidebarFooter, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import {SignOutButton} from "@clerk/nextjs";
import {LogOut} from "lucide-react";

type Props = {
	open: boolean;
};

export default function FooterSidebar({open}: Props) {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SignOutButton>
						<div className="flex w-full justify-center items-center">
							<Button className="w-full bg-red-600 hover:bg-red-500">
								{open ? "Log out" : <LogOut />}
							</Button>
						</div>
					</SignOutButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
