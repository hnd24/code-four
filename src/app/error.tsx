"use client";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {usePathname} from "next/navigation";

export default function Error() {
	const pathname = usePathname() || "";
	return (
		<div
			className="h-screen bg-whiteLight dark:bg-blackLight
      w-full flex flex-col justify-center items-center gap-4">
			<Image
				src={`/favicon/warning.svg`}
				alt="Logo"
				width={300}
				height={300}
				className="bg-black rounded-full w-80 h-[300px] dark:bg-transparent"
			/>
			<div className="text-2xl dark:text-white/90 text-center">Something wrong!!!</div>
			<div className="flex">
				<Button
					onClick={() => window.location.reload()}
					className={cn(
						"dark:bg-blue-700 dark:hover:bg-blue-800  rounded-xl w-32",
						pathname !== "/" && "rounded-r-none",
					)}>
					Reset Page
				</Button>
				{pathname !== "/" && (
					<Button
						className="dark:bg-blue-700 dark:hover:bg-blue-800 rounded-xl rounded-l-none w-32"
						onClick={() => window.location.replace("/")}>
						Return Home
					</Button>
				)}
			</div>
		</div>
	);
}
