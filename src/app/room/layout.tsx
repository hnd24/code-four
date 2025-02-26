import type {Metadata} from "next";
import {Providers} from "../../liveblocks/Provider";
import "../globals.css";
export const metadata: Metadata = {
	title: "Room",
	description: "website for developers, by developer",
};

export default function RoomLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-screen h-screen bg-blackLight">
			<Providers>{children}</Providers>
		</div>
	);
}
