import {parseAsString, useQueryStates} from "nuqs";

export const useTable = () => {
	const [config, setConfig] = useQueryStates({
		search: parseAsString,
		typeRooms: parseAsString.withDefault("Organization"),
	});

	return {
		config,
		setConfig,
	};
};
