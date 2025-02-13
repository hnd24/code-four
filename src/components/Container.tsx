import {cn} from "@/lib/utils";

export default function Container({
	children,
	className = "",
}: Readonly<{
	children: React.ReactNode;
	className?: string;
}>) {
	return (
		<div
			className={cn(
				"max-w-screen-xl h-screen p-4 flex flex-col items-center justify-center mx-auto",
				className,
			)}>
			{children}
		</div>
	);
}
