"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div
			className="h-screen bg-whiteLight dark:bg-blackLight
      w-full flex flex-col justify-center items-center gap-4">
			<Image
				src={`/favicon/empty1.svg`}
				alt="Logo"
				width={300}
				height={300}
				className="bg-black rounded-full w-80 h-[300px] dark:bg-transparent"
			/>
			<div className="text-2xl dark:text-white/90 text-center">Not Found!!!</div>
			<Link href="/">
				<Button className="dark:bg-blue-700 dark:hover:bg-blue-800  rounded-xl w-32 ">
					Return Home
				</Button>
			</Link>
		</div>
	);
}
