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

	return (
		<div
			className={cn(
				"h-full p-[12px] w-full overflow-y-auto flex flex-col my-auto rounded-xl overflow-hidden",
				className,
			)}>
			<div className="w-full flex mb-3 items-center ">
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
									onClick={() => !isPending && setCheckedFileInput(item)}
									className={cn(
										"flex items-center gap-4 border-r-2 border-blackBorder text-white px-2 py-1 rounded-md hover:bg-gray-200/10 cursor-pointer",
										item?.name === checkedFileInput?.name && "bg-gray-200/20",
									)}>
									<span>{item?.name}</span>
									<div
										onClick={e => {
											setInputTem(data.filter(i => i.name !== item.name));
											setCheckedFileInput({name: "", content: ""});
											e.stopPropagation();
										}}>
										<X size={16} className="hover:bg-white/80 rounded-full hover:text-blue-700" />
									</div>
								</div>
							))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<div className="flex items-center h-9 w-20 gap-2 ml-4">
					<Hint label="add file input">
						<Dialog open={openCreateFileDialog} onOpenChange={setOpenCreateFileDialog}>
							<DialogTrigger asChild>
								<Button
									disabled={isPending}
									className="h-8 w-8 bg-green-700 hover:bg-green-800 text-white rounded-lg !px-0 !py-0 ">
									<Plus size={14} />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="mx-auto">Create Input</DialogTitle>
									<DialogDescription></DialogDescription>
									<div className="w-full flex flex-col gap-4">
										<Label>File Name</Label>
										<Input
											onChange={e => {
												setNewFile({name: e.target.value, content: ""});
											}}
											placeholder="input.txt"
										/>
										<Button
											disabled={newFile.name === ""}
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
			<span className="text-white w-full text-center uppercase truncate mb-2">
				Remember to save your changes
			</span>
			<Textarea
				value={checkedFileInput?.content || ""}
				disabled={!checkedFileInput?.name}
				placeholder="chosen file input..."
				onChange={e =>
					setCheckedFileInput({name: checkedFileInput?.name || "", content: e.target.value})
				}
				className="w-full h-full text-white bg-[#1e1e2e]/50 border-blackBorder overflow-y-hidden p-4"
			/>
		</div>
	);
}
