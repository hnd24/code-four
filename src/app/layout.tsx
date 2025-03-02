import {ConvexClientProvider} from "@/providers/ConvexClientProvider";
import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {Metadata} from "next";
import {ThemeProvider} from "next-themes";
import {Geist, Geist_Mono} from "next/font/google";
import {NuqsAdapter} from "nuqs/adapters/next/app";
import {Toaster} from "sonner";
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
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLIC_KEY}
			afterSignOutUrl="/"
			appearance={{
				baseTheme: dark,
			}}>
			<html lang="en" suppressHydrationWarning>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ConvexClientProvider>
						<NuqsAdapter>
							<ThemeProvider attribute="class">{children}</ThemeProvider>
							<Toaster richColors theme="light" />
						</NuqsAdapter>
					</ConvexClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
