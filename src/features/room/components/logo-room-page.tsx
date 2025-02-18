import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
	className?: string;
	isLogo?: boolean;
	isSlogan?: boolean;
};

export default function Logo({className, isLogo = true, isSlogan = true}: Props) {
	return (
		<Link href={"/"} className={cn("flex items-center group", className)}>
			<Image
				src="/favicon/logo.ico"
				alt="logo"
				width={50}
				height={50}
				className={cn("opacity-60 group-hover:opacity-100", isLogo ? "flex" : "hidden")}
			/>
			<div className={isSlogan ? "flex" : "hidden"}>
				<div className="hidden md:flex flex-col justify-around group-hover:ring-white/20 transition-all text-white/60 group-hover:text-white">
					<div className="text-lg leading-5 font-bold ">Code Four</div>
					<div className="text-[12px] leading-5">Code together, fun together</div>
				</div>
			</div>
		</Link>
	);
}
