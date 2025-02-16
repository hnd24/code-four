"use client";

import Loading from "@/app/loading";
import {ClerkLoaded, ClerkLoading, useAuth} from "@clerk/nextjs";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ReactNode} from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const queryClient = new QueryClient();

export function ConvexClientProvider({children}: {children: ReactNode}) {
	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			<QueryClientProvider client={queryClient}>
				<ClerkLoading>
					<Loading />
				</ClerkLoading>
				<ClerkLoaded>{children}</ClerkLoaded>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ConvexProviderWithClerk>
	);
}
