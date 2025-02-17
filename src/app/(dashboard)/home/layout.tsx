import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/features/home/side-bar/SideBar";
import type {Metadata} from "next";
import {cookies} from "next/headers";
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
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<>{children}</>
		</SidebarProvider>
	);
}
