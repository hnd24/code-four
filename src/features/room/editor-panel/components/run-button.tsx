import {Button} from "@/components/ui/button";

import {Loader2, Play} from "lucide-react";

// import {useCurrentUser} from "@/hooks/use-current-user";

type Props = {
	disabled: boolean;
	onClick: () => void;
	isLoading?: boolean;
};

export const RunButton = ({disabled, isLoading, onClick}: Props) => {
	const onExecute = () => {
		onClick();
	};

	return (
		<Button
			disabled={disabled || isLoading}
			onClick={onExecute}
			className="bg-blue-700 hover:bg-blue-800">
			{isLoading ? (
				<>
					<Loader2 size={16} className="text-white animate-spin" />
					<div className="hidden lg:flex">Executing</div>
				</>
			) : (
				<>
					<Play size={16} className="text-white" />
					<div className="hidden lg:flex ">Run Code</div>
				</>
			)}
		</Button>
	);
};
