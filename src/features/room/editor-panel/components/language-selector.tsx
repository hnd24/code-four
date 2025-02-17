"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {LANGUAGES} from "@/constants";
import {useEditor} from "@/hooks/use-editor";
import {cn} from "@/lib/utils";
import {Language} from "@/types";
import Image from "next/image";

type Props = {
	className?: string;
};

export default function LanguageSelector({className}: Props) {
	const {
		config: {language: value},
		setConfig,
	} = useEditor();

	return (
		<Select
			defaultValue={LANGUAGES.javascript.value}
			value={value}
			onValueChange={value => {
				setConfig({language: value as Language});
			}}>
			<SelectTrigger
				className={cn(
					"w-fit min-w-40 lg:min-w-44 bg-blackLight text-white/90 rounded-md border-blackBorder",
					className,
				)}>
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent className="bg-blackLight text-white/90 border-blackBorder ">
				{Object.values(LANGUAGES).map(({label, value}) => (
					<SelectItem key={value} value={value}>
						<div className="flex items-center justify-between gap-4 ">
							<Image src={`/languages/${value}.svg`} alt={label} width={20} height={20} />
							<div>{label}</div>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
