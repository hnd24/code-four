import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/features/home/sidebar/sidebar";

import type {Metadata} from "next";
export const metadata: Metadata = {
	title: {
		template: "Home",
		default: "Code Four",
	},
	description: "website for developers, by developer",
};

export default async function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />
			<div className="w-screen h-screen bg-blackLight">{children}</div>
		</SidebarProvider>
	);
}
