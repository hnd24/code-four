import {Language, Theme} from "@/types";
import {parseAsInteger, parseAsStringEnum, useQueryStates} from "nuqs";

export const useEditor = () => {
	const [config, setConfig] = useQueryStates({
		theme: parseAsStringEnum<Theme>(Object.values(Theme)).withDefault(Theme.Default),
		language: parseAsStringEnum<Language>(Object.values(Language)).withDefault(Language.JavaScript),
		textSize: parseAsInteger.withDefault(15),
	});

	return {
		config,
		setConfig,
	};
};
