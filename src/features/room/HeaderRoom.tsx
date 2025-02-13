import {Button} from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {themes} from "@/constants/types";
import {Palette, Share2} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderRoom() {
	return (
		<div
			className="flex w-full text-white justify-between bg-gradient-to-r from-blackBlue to-[#f0040423]
rounded-lg border-2 border-gray-300 border-opacity-20">
			<Link href={"/"} className="flex items-center ">
				<Image
					src="/favicon/logo.ico"
					alt="logo"
					width={50}
					height={50}
					className=" transition-all duration-500 "
				/>
				<div className="hidden md:flex flex-col justify-around group-hover:ring-white/20 transition-all ">
					<div className="text-lg leading-5 font-bold ">Code Four</div>
					<div className="text-[12px] leading-5">Code together, fun together</div>
				</div>
			</Link>
			<div className="flex items-center mr-3 gap-2 sm:gap-3">
				<div className="">
					<Select>
						<SelectTrigger className="w-fit px-3 min-w-20 md:min-w-40 bg-gray-900 ">
							<SelectValue
								placeholder={
									<div className="flex ">
										<Palette className="w-4" />
										<div className="ml-2 flex flex-col justify-center">Theme</div>
									</div>
								}
							/>
						</SelectTrigger>
						<SelectContent className="bg-gray-900 text-white">
							{themes.map(theme => {
								return (
									<SelectItem key={theme.value} value={theme.value}>
										{theme.label}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>
				<Button
					className="bg-blue-600 py-2 sm:py-1 px-1 sm:px-3 leading-none h-fit text-base font-medium
    hover:bg-blue-500 ">
					<Share2 className="text-white flex sm:hidden" />
					<div className="text-white hidden sm:flex">Share</div>
				</Button>
			</div>
		</div>
	);
}
