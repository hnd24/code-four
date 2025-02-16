import Image from "next/image";

export default function Loading() {
	return (
		<div
			className="h-screen bg-gradient-to-tl from-gray-800 to-gray-950
      w-full flex flex-col justify-center items-center">
			<Image
				src={`/favicon/loading2.svg`}
				alt="Logo"
				width={400}
				height={400}
				className="animate-pulse duration-1000"
			/>
		</div>
	);
}
