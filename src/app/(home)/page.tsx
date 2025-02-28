"use client";

import IntroductionPage from "@/app/pages/introduction-page";
import NoOrg from "@/components/no-org";
import Content from "@/features/home/content/content";
import HeaderHome from "@/features/home/header/header-home";
import {useOrganization, useUser} from "@clerk/nextjs";
export default function HomePage() {
	const {isSignedIn, user} = useUser();
	const {organization} = useOrganization();
	if (!isSignedIn) return <IntroductionPage />;
	return (
		<>
			<div className="flex flex-col h-full w-full py-1 px-2 relative">
				<HeaderHome />
				<div className="h-full w-full mt-4 md:mt-6">
					{organization ? (
						<Content
							user={{id: user.id, fullName: user.fullName || ""}}
							org={{id: organization.id, name: organization.name, image: organization.imageUrl}}
						/>
					) : (
						<NoOrg />
					)}
				</div>
			</div>
		</>
	);
}
