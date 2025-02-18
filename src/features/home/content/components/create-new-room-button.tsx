import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

type Props = {
	disabled?: boolean;
};

export default function CreateNewRoomButton({disabled = false}: Props) {
	return (
		<>
			<Hint label={"Create new room"} side="top">
				<Button
					disabled={disabled}
					className="w-64 h-40 bg-blackLight justify-center items-center rounded-xl border-2 border-blackBorder 
  hover:bg-gray-900 hover:border-gray-600 hidden md:flex">
					<div className="h-full w-full flex flex-col justify-center items-center">
						<span className="text-4xl">
							<Plus className="w-20 h-20 text-blackBorder hover:text-gray-600" />
						</span>
					</div>
				</Button>
			</Hint>
			<Button className="text-gray-100/90 bg-indigo-600 flex md:hidden">Create new room</Button>
		</>
	);
}
