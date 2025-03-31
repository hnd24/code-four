import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {cn} from "@/lib/utils";
import {FileInputType} from "@/types";
import {X} from "lucide-react";

type Props = {
	setInputTem: React.Dispatch<React.SetStateAction<FileInputType[]>>;
	inputTem: FileInputType[];
	checkedFileInput: FileInputType;
	setCheckedFileInput: React.Dispatch<React.SetStateAction<FileInputType>>;
};

export default function ListFileInput({
	setInputTem,
	inputTem,
	checkedFileInput,
	setCheckedFileInput,
}: Props) {
	return (
		<>
			<ScrollArea
				className="w-full overflow-auto"
				onWheel={e => {
					// Get the child element containing the content
					const container = e.currentTarget.querySelector("div");
					if (container) {
						// Convert vertical scrolling to horizontal scrolling
						container.scrollLeft += e.deltaY;
					}
				}}>
				<div className="flex items-start min-w-[100%] gap-2">
					{inputTem.length > 0 &&
						inputTem.map((item, index) => (
							<div
								key={index}
								onClick={() => setCheckedFileInput(item)}
								className={cn(
									"w-fit flex items-center gap-4  border-blackBorder px-2 py-1 rounded-md cursor-pointer  ",
									"border-l-2  bg-gray-300/60 hover:bg-gray-400",
									"dark:border-r-2 dark:border-t-0 dark:bg-gray-200/20 dark:text-white dark:hover:bg-gray-200/60",
									item?.name === checkedFileInput?.name &&
										"bg-gray-400/60 border-t-2 dark:bg-gray-200/60",
								)}>
								<span>{item?.name}</span>
								<div
									onClick={e => {
										setInputTem(inputTem.filter(i => i.name !== item.name));
										setCheckedFileInput({name: "", content: ""});
										e.stopPropagation();
									}}>
									<X
										size={16}
										className="rounded-full hover:bg-gray-500 dark:hover:bg-white/80  dark:hover:text-blue-700"
									/>
								</div>
							</div>
						))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</>
	);
}
