import {SignIn} from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="h-screen w-screen bg-gradient-to-b from-[#1f1f23] to-blackLight  flex justify-center items-center">
			<SignIn />
		</div>
	);
}
