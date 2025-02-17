"use client";

import {SidebarTrigger} from "@/components/ui/sidebar";
import {OrganizationSwitcher, SignedIn, UserButton} from "@clerk/nextjs";

export default function page() {
	return (
		<div className="">
			<SignedIn>
				{/* <UserButton /> */}
				<UserButton></UserButton>
				<OrganizationSwitcher />
			</SignedIn>
			<SidebarTrigger className="text-white" />
		</div>
	);
}
