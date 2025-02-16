"use client";

import {Button} from "@/components/ui/button";
import {Link} from "lucide-react";
import Image from "next/image";

export default function Error() {
	return (
		<div
			className="h-screen bg-blacklight
      w-full flex flex-col justify-center items-center gap-4">
			<Image src={`/favicon/404.svg`} alt="Logo" width={400} height={400} />
			<div className="text-2xl text-gray-100/90 text-center">Something wrong!!!</div>
			<div className="flex">
				<Button
					onClick={() => window.location.reload()}
					className="bg-blue-700 text-gray-100/90 rounded-xl rounded-r-none">
					Reset Page
				</Button>
				<Link href="/home">
					<Button className="bg-blue-700 text-gray-100/90 rounded-xl rounded-l-none ">
						Return Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
