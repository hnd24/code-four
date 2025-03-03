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
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import Image from "next/image";
import {useEffect} from "react";
import {api} from "../../../../../convex/_generated/api";
import {Id} from "../../../../../convex/_generated/dataModel";

type Props = {
	className?: string;
	codeId: Id<"code">;
	language: Language;
};

export default function LanguageSelector({className, codeId, language}: Props) {
	const {
		config: {language: languageConfig},
		setConfig,
	} = useEditor();
	const {mutate: updateLanguage} = useMutation({
		mutationFn: useConvexMutation(api.code.updateLanguageInCodeRoom),
	});
	useEffect(() => {
		setConfig({language});
	}, [language]);
	return (
		<>
			<Select
				value={languageConfig}
				onValueChange={async value => {
					setConfig({language: value as Language});
					updateLanguage({codeId, language: value});
				}}>
				<SelectTrigger
					className={cn(
						"w-fit min-w-40 lg:min-w-44 rounded-md border-x-2 ",
						"border-black dark:border-blackBorder",
						"dark:text-white/90  dark:border-blackBorder",
						className,
					)}>
					<SelectValue placeholder="Language" />
				</SelectTrigger>
				<SelectContent className=" dark:text-white/90 border border-black dark:border-blackBorder ">
					{Object.values(LANGUAGES).map(({label, value}) => (
						<SelectItem
							key={value}
							value={value}
							className="hover:bg-gray-300 dark:hover:bg-gray-600 ">
							<div className="flex items-center justify-between gap-4 text-black dark:!text-white/60">
								<Image src={`/languages/${value}.svg`} alt={label} width={20} height={20} />
								<div>{label}</div>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
}
