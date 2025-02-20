import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";

import {Loader2, Play} from "lucide-react";

// import {useCurrentUser} from "@/hooks/use-current-user";

type Props = {
	disabled: boolean;
	onClick: () => void;
};

export const RunButton = ({disabled, onClick}: Props) => {
	const onExecute = () => {
		onClick();
	};

	return (
		<Hint label={"Run this code"}>
			<Button disabled={disabled} onClick={onExecute} className="bg-blue-700 hover:bg-blue-800">
				{disabled ? (
					<>
						<Loader2 size={16} className="text-white" />
						<div className="hidden lg:flex">Executing</div>
					</>
				) : (
					<>
						<Play size={16} className="text-white" />
						<div className="hidden lg:flex">Run Code</div>
					</>
				)}
			</Button>
		</Hint>
	);
};
