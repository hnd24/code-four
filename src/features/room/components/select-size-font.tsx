"use client";
import {Hint} from "@/components/hint";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Slider} from "@/components/ui/slider";
import {useEditor} from "@/hooks/use-editor";
import {DropdownMenuSeparator} from "@radix-ui/react-dropdown-menu";

import {Type} from "lucide-react";

export default function SelectSizeFont() {
	const {
		config: {textSize},
		setConfig,
	} = useEditor();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Hint label="Font size">
					<div
						className="w-9 h-9 flex items-center justify-center 
					bg-gray-200  rounded-lg border-none text-gray-900 hover:bg-gray-200/80 !outline-none">
						<Type size={16} />
					</div>
				</Hint>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-fit border-2 border-blackBorder bg-gray-200">
				<DropdownMenuSeparator />
				<div className="w-40 h-8 flex flex-col justify-center bg-gray-200 ">
					<Slider
						value={[textSize]}
						onValueChange={value => setConfig({textSize: value[0]})}
						defaultValue={[15]}
						min={6}
						max={40}
						step={1}
						className="bg-slate-200 rounded-xl"
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
