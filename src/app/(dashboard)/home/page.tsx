import {SignedIn, UserButton} from "@clerk/nextjs";

export default function page() {
	return (
		<div className="h-screen w-screen bg-blacklight">
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
}
