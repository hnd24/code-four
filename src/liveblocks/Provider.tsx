"use client";

import {LiveblocksProvider} from "@liveblocks/react";
import {PropsWithChildren} from "react";

export function Providers({children}: PropsWithChildren) {
	return (
		<LiveblocksProvider
			// publicApiKey={process.env.LIVEBLOCKS_PUBLIC_KEY!}
			authEndpoint="/api/liveblocks-auth">
			{children}
		</LiveblocksProvider>
	);
}
