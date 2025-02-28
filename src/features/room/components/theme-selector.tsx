import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/select-theme";
import {THEMES} from "@/constants";
import {useEditor} from "@/hooks/use-editor";
import {cn} from "@/lib/utils";
import {Theme} from "@/types";

type Props = {
	className?: string;
};

export default function ThemeSelector({className}: Props) {
	const {
		config: {theme: value},
		setConfig,
	} = useEditor();

	return (
		<Select
			defaultValue={value}
			onValueChange={value => {
				setConfig({theme: value as Theme});
			}}>
			<SelectTrigger
				value={value}
				className={cn("w-fit px-2 sm:min-w-36 border-blackBorder", className)}>
				<SelectValue
					placeholder={
						<div className="flex">
							<div className="ml-2 flex flex-col justify-center">Theme</div>
						</div>
					}
				/>
			</SelectTrigger>
			<SelectContent className="bg-blackLight border-blackBorder text-white">
				{THEMES.map(theme => (
					<SelectItem key={theme.value} value={theme.value}>
						<div className="flex items-center gap-4">
							<theme.icon size={16} />
							{theme.label}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
