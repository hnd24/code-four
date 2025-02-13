import {random} from "@/lib/utils";
import Image from "next/image";

export default function Loading() {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<Image
				src={`/favicon/loading${random(2)}.svg`}
				alt="Logo"
				width={400}
				height={400}
				className="animate-pulse duration-1000"
			/>
		</div>
	);
}
