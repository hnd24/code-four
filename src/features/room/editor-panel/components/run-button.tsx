import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";

import {Loader2, Play} from "lucide-react";

// import {useCurrentUser} from "@/hooks/use-current-user";

type Props = {
	disabled: boolean;
	onClick: () => void;
};

export const RunButton = ({disabled, onClick}: Props) => {
	// const {isAuthenticated} = useCurrentUser();

	const onExecute = () => {
		// if (!isAuthenticated || disabled) return;

		onClick();
	};

	return (
		// <Hint label={isAuthenticated ? "Run this code" : "You need to Login/Sing up to Run"}>
		/* <Button disabled={disabled || !isAuthenticated} onClick={onExecute}> */
		<Hint label={true ? "Run this code" : "You need to Login/Sing up to Run"}>
			<Button disabled={disabled} onClick={onExecute} className="bg-blue-700 hover:bg-blue-800">
				{disabled ? (
					<>
						<Loader2 className="animate-spin text-white/60" />
						<div className="hidden lg:flex">Executing</div>
					</>
				) : (
					<>
						<Play className="text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
						<div className="hidden lg:flex">Run Code</div>
					</>
				)}
			</Button>
		</Hint>
	);
};
