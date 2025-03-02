"use client";
import {cn} from "@/lib/utils";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Hint} from "./hint";
import {Button} from "./ui/button";

type Props = {
	open?: boolean;
	className?: string;
};

export default function SwitchMode({open = false, className}: Props) {
	const {theme, setTheme} = useTheme();
	return (
		<>
			<Hint label="switch mode">
				<div className={cn("flex w-full justify-center items-center", className)}>
					<Button
						className={cn(
							"hidden w-full truncate bg-indigo-900 hover:bg-indigo-950 text-black dark:text-white",
							theme === "dark" && "flex",
							className,
						)}
						onClick={() => setTheme("light")}>
						{open ? "Dark theme" : <Moon />}
					</Button>
					<Button
						className={cn(
							"hidden w-full truncate bg-black hover:bg-black/80",
							theme === "light" && "flex",
							className,
						)}
						onClick={() => setTheme("dark")}>
						{open ? "Light theme" : <Sun />}
					</Button>
				</div>
			</Hint>
		</>
	);
}
