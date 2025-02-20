import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";

export default function ShareButton() {
	return (
		<Hint label="feature coming soon">
			<Button
				className="bg-blue-700 py-2 lg:py-1 px-2 lg:px-3 leading-none h-fit text-base font-medium
hover:bg-blue-800 ">
				<Share2 className="text-white flex lg:hidden" />
				<div className="text-white hidden lg:flex">Share</div>
			</Button>
		</Hint>
	);
}
