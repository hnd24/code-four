import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {THEMES} from "@/constants";
import {useEditor} from "@/hooks/use-editor";
import {cn} from "@/lib/utils";
import {Theme} from "@/types";
import {useTheme} from "next-themes";
import {useEffect} from "react";

type Props = {
	className?: string;
};

export default function ThemeSelector({className}: Props) {
	const {
		config: {theme: value},
		setConfig,
	} = useEditor();
	const {theme} = useTheme();
	useEffect(() => {
		if (theme === "light") {
			setConfig({theme: Theme.Light});
		}
		if (theme === "dark") {
			setConfig({theme: Theme.Default});
		}
	}, [theme]);
	return (
		<Select
			value={value}
			onValueChange={value => {
				setConfig({theme: value as Theme});
			}}>
			<SelectTrigger
				className={cn(
					"w-fit px-2 sm:min-w-36 border-2",
					"border-black dark:border-blackBorder",
					"dark:text-white/90  dark:border-blackBorder",
					className,
				)}>
				<SelectValue
					placeholder={
						<div className="flex">
							<div className="ml-2 flex flex-col justify-center">Theme</div>
						</div>
					}
				/>
			</SelectTrigger>
			<SelectContent className=" border-blackBorder ">
				{THEMES.map(theme => (
					<SelectItem
						key={theme.value}
						value={theme.value}
						className="hover:bg-gray-300 dark:hover:bg-gray-600 ">
						<div className="flex items-center gap-4  text-black dark:!text-white/60">
							<theme.icon size={16} />
							{theme.label}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
