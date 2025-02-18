import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

type Props = {
	className?: string;
};

export default function Search({className}: Props) {
	return (
		<Input
			placeholder={"search rooms"}
			className={cn("border-2 border-blackBorder w-64 lg:w-80 focus:border-gray-600", className)}
		/>
	);
}
