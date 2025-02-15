import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/SelectTheme";
import {themes} from "@/constants";
import {useEditor} from "@/hooks/use-editor";
import {Theme} from "@/types";

export default function ThemeSelector() {
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
			<SelectTrigger value={value} className="w-fit px-2  md:min-w-40  border-blackBorder ">
				<SelectValue
					placeholder={
						<div className="flex ">
							<div className="ml-2 flex flex-col justify-center">Theme</div>
						</div>
					}
				/>
			</SelectTrigger>
			<SelectContent className="bg-blacklight border-blackBorder text-white">
				{themes.map(theme => {
					return (
						<SelectItem key={theme.value} value={theme.value}>
							<div className="flex items-center">{theme.label}</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
