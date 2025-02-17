import type {Metadata} from "next";
import {Toaster} from "sonner";
export const metadata: Metadata = {
	title: {
		template: "%s | Code Four",
		default: "Code Four",
	},
	description: "website for developers, by developer",
};

export default function DashBoardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-screen w-screen bg-blackLight">
			{children}
			<Toaster richColors theme="light" />
		</div>
	);
}
