"use client";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

type Props = {
	open?: boolean;
	className?: string;
};

export default function SwitchMode({open = false, className}: Props) {
	const {theme, setTheme} = useTheme();
	return (
		<Hint label="switch mode">
			<div className={cn("flex w-full  justify-center items-center", className)}>
				<Button
					className={cn(
						"h-9 w-full !text-white ",
						"dark:bg-indigo-900 dark:hover:bg-indigo-950",
						"bg-black hover:bg-black/80 ",
						className,
					)}
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
					{theme === "dark" ? open ? "Dark mode" : <Moon /> : open ? "Light mode" : <Sun />}
				</Button>
			</div>
		</Hint>
	);
}
