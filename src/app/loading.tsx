import Image from "next/image";

export default function Loading() {
	return (
		<div
			className="h-screen bg-blackLight
			w-full flex flex-col justify-center items-center">
			<Image
				src={`/favicon/loading1.svg`}
				alt="Logo"
				width={300}
				height={300}
				className="animate-pulse duration-1000"
			/>
		</div>
	);
}
