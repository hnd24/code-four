import type {Metadata} from "next";
export const metadata: Metadata = {
	title: {
		template: "Room",
		default: "Code Four",
	},
	description: "website for developers, by developer",
};

export default function RoomLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="w-screen h-screen bg-blackLight">{children}</div>;
}
