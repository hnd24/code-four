import {OrganizationSwitcher, SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
export default function Home() {
	return (
		<div className="">
			<div className="">
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
					<OrganizationSwitcher />
				</SignedIn>
			</div>
		</div>
	);
}
