import type {Metadata} from "next";
import "../globals.css";
import {Providers} from "../liveblocks/Provider";
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
