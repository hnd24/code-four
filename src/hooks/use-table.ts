import {parseAsString, useQueryStates} from "nuqs";

export const useTable = () => {
	const [config, setConfig] = useQueryStates({
		search: parseAsString.withDefault(""),
		typeRooms: parseAsString.withDefault("Organization"),
	});

	return {
		config,
		setConfig,
	};
};
