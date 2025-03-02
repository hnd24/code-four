import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/features/home/sidebar/sidebar";
import type {Metadata} from "next";
import "../globals.css";
export const metadata: Metadata = {
	title: "Home",
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
			<div className="w-screen h-screen bg-[#E8E8E8] dark:bg-blackLight">{children}</div>
		</SidebarProvider>
	);
}
