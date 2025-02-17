"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	return (
		<div
			className="h-screen bg-blackLight
      w-full flex flex-col justify-center items-center gap-4">
			<Image src={`/favicon/empty1.svg`} alt="Logo" width={300} height={300} />
			<div className="text-2xl text-gray-100/90 text-center">Not Found!!!</div>
			<Link href="/home">
				<Button className="bg-blue-700 text-gray-100/90 rounded-xl w-32 ">Return Home</Button>
			</Link>
		</div>
	);
}
