"use client";
import {Button} from "@/components/ui/button";
import {useIsMobile} from "@/hooks/use-mobile";
import {SignInButton} from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
	const isMobile = useIsMobile();
	return (
		<div className="max-w-screen-xl h-screen p-4 flex flex-col items-center justify-center mx-auto gap-6 ">
			<div className="p-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-spin-slow">
				<Image
					src={"/favicon/welcome.svg"}
					alt="welcome to Code Four"
					width={isMobile ? 300 : 400}
					height={isMobile ? 300 : 400}
					className="border-white border-4 rounded-full p-4 bg-gradient-to-br from-gray-800 to-gray-950"
				/>
			</div>
			<div className="flex flex-col items-center justify-center text-center gap-3">
				<h1 className="text-5xl lg:text-6xl font-bold text-white ">Welcome to Code Four</h1>
				<p className="text-lg lg:text-2xl text-gray-200">
					Coding is easier when you have teammates!
				</p>
			</div>
			<SignInButton mode="modal">
				<Button
					className="border-4 rounded-full text-lg py-4 px-6 
          hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r 
        hover:from-purple-400 hover:via-pink-500 hover:to-red-500 from-purple-400 via-pink-500 to-red-500">
					Sign in
				</Button>
			</SignInButton>
		</div>
	);
}
