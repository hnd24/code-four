import type {Metadata} from "next";
import {Toaster} from "sonner";
export const metadata: Metadata = {
	title: {
		template: "%s | Code Four",
		default: "Code Four",
	},
	description: "website for developers, by developer",
};

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			<Toaster richColors theme="light" />
		</>
	);
}
