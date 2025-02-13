import type {Metadata} from "next";
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
		<div className="bg-gradient-to-tl from-gray-800 to-gray-950 min-h-screen">
			<div>{children}</div>
		</div>
	);
}
