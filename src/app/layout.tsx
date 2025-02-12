import {ConvexClientProvider} from "@/providers/ConvexClientProvider";
import {ClerkProvider} from "@clerk/nextjs";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Code Four",
		default: "Code Four",
	},
	description: "website for developers, by developer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLIC_KEY}>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
