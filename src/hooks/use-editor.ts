import {Language, Theme} from "@/types";
import {parseAsBoolean, parseAsInteger, parseAsStringEnum, useQueryStates} from "nuqs";

export const useEditor = () => {
	const [config, setConfig] = useQueryStates({
		hiddenRemoteSelection: parseAsBoolean.withDefault(false),
		theme: parseAsStringEnum<Theme>(Object.values(Theme)).withDefault(Theme.Default),
		language: parseAsStringEnum<Language>(Object.values(Language)).withDefault(Language.JavaScript),
		textSize: parseAsInteger.withDefault(15),
		input: parseAsBoolean.withDefault(false),
	});

	return {
		config,
		setConfig,
	};
};
