"use client";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {FileInputType} from "@/types";
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {Loader2, Plus, Save, X} from "lucide-react";
import {useEffect, useState} from "react";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";

type Props = {
	className?: string;
	setInputTem: (value: FileInputType[]) => void;

	inputTem: FileInputType[] | undefined;
	codeId?: string;
};

export default function InputPanel({className, setInputTem, inputTem, codeId}: Props) {
	let data = inputTem || [];
	const [checkedFileInput, setCheckedFileInput] = useState<FileInputType>({name: "", content: ""});
	const [openCreateFileDialog, setOpenCreateFileDialog] = useState<boolean>(false);
	const [newFile, setNewFile] = useState<FileInputType>({name: "", content: ""});
	const [nameFiles, setNameFiles] = useState<string[]>([]);
	const {mutate: updateInput, isPending} = useMutation({
		mutationFn: useConvexMutation(api.code.updateInputInCodeRoom),
	});

	useEffect(() => {
		const handler = setTimeout(() => {
			data = data?.map(item => (item?.name === checkedFileInput?.name ? checkedFileInput : item));
			setInputTem(data);
		}, 200);
		return () => {
			clearTimeout(handler);
		};
	}, [checkedFileInput]);

	useEffect(() => {
		if (isPending === true) {
			setCheckedFileInput({name: "", content: ""});
		}
	}, [isPending]);

	useEffect(() => {
		return setNameFiles(data.map(item => item.name));
	}, [data]);
	const isDisabled = newFile.name === "" || nameFiles.includes(newFile.name);
	return (
		<div
			className={cn(
				"h-full p-[12px] w-full overflow-y-auto flex flex-col my-auto rounded-xl overflow-hidden",
				className,
			)}>
			<div className="w-full flex mb-2 items-center ">
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
						{data.length > 0 &&
							data.map((item, index) => (
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
											setInputTem(data.filter(i => i.name !== item.name));
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
				<div className="flex items-center h-9 w-20 gap-2 ml-4">
					<Hint label="add file input">
						<Dialog open={openCreateFileDialog} onOpenChange={setOpenCreateFileDialog}>
							<DialogTrigger>
								<Hint label="add file input">
									<div
										className="flex items-center justify-center h-8 w-8  text-white rounded-lg
									bg-black hover:bg-black/80 
								dark:bg-green-700 dark:hover:bg-green-800">
										<Plus size={14} />
									</div>
								</Hint>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="mx-auto">Create Input</DialogTitle>
									<DialogDescription></DialogDescription>
									<div className="w-full flex flex-col gap-4">
										<Label>File Name</Label>
										<Input
											onKeyDown={e => {
												if (e.key === "Enter" && !isDisabled) {
													setInputTem([...data, newFile]);
													setCheckedFileInput(newFile);
													setOpenCreateFileDialog(false);
												}
											}}
											onChange={e => {
												setNewFile({name: e.target.value, content: ""});
											}}
											placeholder="input.txt"
										/>
										<Button
											className="dark:text-black"
											disabled={isDisabled}
											onClick={() => {
												setInputTem([...data, newFile]);
												setCheckedFileInput(newFile);
												setOpenCreateFileDialog(false);
											}}>
											Enter
										</Button>
									</div>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</Hint>
					<Hint label="save files">
						<Button
							disabled={isPending}
							onClick={() => {
								updateInput({codeId: codeId as Id<"code">, input: data});
							}}
							className="h-8 w-8 bg-blue-700 hover:bg-blue-800 text-white rounded-lg !px-0 !py-0 ">
							{isPending ? <Loader2 size={14} className=" animate-spin" /> : <Save size={14} />}
						</Button>
					</Hint>
				</div>
			</div>
			<span className=" dark:text-white/60 h-9 mb-2 w-full text-center uppercase truncate ">
				Remember to save your changes
			</span>
			<Textarea
				value={checkedFileInput?.content || ""}
				disabled={!checkedFileInput?.name}
				placeholder={!checkedFileInput?.name ? "chosen file input..." : ""}
				onChange={e =>
					setCheckedFileInput({name: checkedFileInput?.name || "", content: e.target.value})
				}
				className="w-full h-full  overflow-y-hidden p-4
				bg-gray-200  border-blackBorder
				dark:text-white dark:bg-[#1e1e2e]/50"
			/>
		</div>
	);
}
