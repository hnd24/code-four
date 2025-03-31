"use client";
import {Button} from "@/components/ui/button";
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
import {Plus} from "lucide-react";
import {useState} from "react";

type Props = {
	setInputTem: React.Dispatch<React.SetStateAction<FileInputType[]>>;
	setCheckedFileInput: React.Dispatch<React.SetStateAction<FileInputType>>;
	inputTem: FileInputType[];
};

export default function AddFileInput({setInputTem, setCheckedFileInput, inputTem}: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [newFile, setNewFile] = useState<FileInputType>({name: "", content: ""});

	const nameFiles = inputTem.map(item => item.name);
	const isDisabled = newFile.name === "" || nameFiles.includes(newFile.name);

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>
					<div
						className="flex items-center justify-center h-8 w-8  text-white rounded-lg
        bg-black hover:bg-black/80 
      dark:bg-green-700 dark:hover:bg-green-800">
						<Plus size={14} />
					</div>
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
										setInputTem([...inputTem, newFile]);
										setCheckedFileInput(newFile);
										setOpen(false);
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
									setInputTem([...inputTem, newFile]);
									setCheckedFileInput(newFile);
									setOpen(false);
								}}>
								Enter
							</Button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
