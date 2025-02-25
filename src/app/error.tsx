"use client";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {usePathname} from "next/navigation";

export default function Error() {
	const pathname = usePathname();
	return (
		<div
			className="h-screen bg-blackLight
      w-full flex flex-col justify-center items-center gap-4">
			<Image src={`/favicon/warning.svg`} alt="Logo" width={300} height={300} />
			<div className="text-2xl text-gray-100/90 text-center">Something wrong!!!</div>
			<div className="flex">
				<Button
					onClick={() => window.location.reload()}
					className={cn(
						"bg-blue-700 hover:bg-blue-800 text-gray-100/90 rounded-xl w-32",
						pathname !== "/" && "rounded-r-none",
					)}>
					Reset Page
				</Button>
				{pathname !== "/" && (
					<Button
						className="bg-blue-700 hover:bg-blue-800 text-gray-100/90 rounded-xl rounded-l-none w-32"
						onClick={() => window.location.replace("/")}>
						Return Home
					</Button>
				)}
			</div>
		</div>
	);
}
