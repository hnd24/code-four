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
import {Language} from "@/types";
import Image from "next/image";

export default function LanguageSelector() {
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
				className="w-fit min-w-40 lg:min-w-44 bg-blacklight text-white/90 rounded-md
			border-blackBorder">
				<SelectValue placeholder="Language" />
			</SelectTrigger>
			<SelectContent className="bg-blacklight text-white/90 border-blackBorder ">
				{Object.values(LANGUAGES).map(({label, value}) => (
					<SelectItem key={value} value={value}>
						<div className="flex items-center justify-between gap-4 hover:bg-red">
							<Image src={`/languages/${value}.svg`} alt={label} width={20} height={20} />
							<div>{label}</div>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
