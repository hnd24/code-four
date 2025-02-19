"use client";

import IntroductionPage from "@/components/introduction-page";
import NoOrg from "@/components/no-org";
import Content from "@/features/home/content/content";
import HeaderHome from "@/features/home/header/header-home";
import {useOrganization, useUser} from "@clerk/nextjs";
export default function HomePage() {
	const {isSignedIn} = useUser();
	const {organization} = useOrganization();
	if (!isSignedIn) return <IntroductionPage />;
	return (
		<>
			<div className="flex flex-col h-full w-full py-1 px-2">
				<HeaderHome />
				<div className="h-full w-full mt-4 md:mt-6">{organization ? <Content /> : <NoOrg />}</div>
			</div>
		</>
	);
}
