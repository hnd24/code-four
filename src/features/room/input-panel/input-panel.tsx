"use client";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";

import {FileInputType} from "@/types";
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {Loader2, Plus, Save} from "lucide-react";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import FileDownloader from "../components/file-downloader";
import MultiFileUploader from "../components/multi-file-uploader";
import AddFileInput from "./components/add-file-input";
import ListFileInput from "./components/list-file-input";

type Props = {
	className?: string;
	setInputTem: React.Dispatch<React.SetStateAction<FileInputType[]>>;

	inputTem: FileInputType[];
	codeId?: string;
};

export default function InputPanel({className, setInputTem, inputTem, codeId}: Props) {
	const [checkedFileInput, setCheckedFileInput] = useState<FileInputType>({name: "", content: ""});
	const [fileList, setFileList] = useState<FileList>();
	const [isDragging, setIsDragging] = useState(false);

	const {mutate: updateInput, isPending} = useMutation({
		mutationFn: useConvexMutation(api.code.updateInputInCodeRoom),
	});

	// setInputTem when the codeId changes
	useEffect(() => {
		setInputTem(
			inputTem.map(item => (item?.name === checkedFileInput?.name ? checkedFileInput : item)),
		);
	}, [checkedFileInput]);

	// if isPending is true, set checkedFileInput to empty
	useEffect(() => {
		if (isPending === true) {
			setCheckedFileInput({name: "", content: ""});
		}
	}, [isPending]);

	useEffect(() => {
		if (!fileList || fileList.length === 0) return;
		const validFiles: File[] = [];

		// Check if the file type is allowed
		for (const file of fileList) {
			if (
				!file.type.startsWith("text/") &&
				file.type !== "application/json" &&
				file.type !== "application/xml"
			) {
				toast.error(`File "${file.name}" is not a text-based file.`);
				continue;
			}

			if (file.size > 2 * 1024 * 1024) {
				toast.error(`File "${file.name}" exceeds 2MB limit.`);
				continue;
			}

			validFiles.push(file);
		}

		if (validFiles.length === 0) return;

		validFiles.forEach(file => {
			const reader = new FileReader();
			reader.onload = e => {
				// Check if the file already exists in the inputTem array
				const existingFile = inputTem.find(item => item.name === file.name);
				// If it exists, update the content
				if (existingFile) {
					toast.warning(`File "${file.name}" already exists. Updating content.`);
				}
				// If it doesn't exist, add a new file input
				else {
					const newFile: FileInputType = {
						name: file.name,
						content: e.target?.result as string,
					};
					setInputTem([...inputTem, newFile]);
				}
			};
			reader.onerror = e => {
				toast.error(
					`Error reading file "${file.name}": ${(e.target as FileReader).error?.message || "Unknown error"}`,
				);
			};
			reader.readAsText(file);
			setFileList(undefined); // Clear the file list after reading
		});
	}, [fileList]);

	return (
		<div
			className={cn(
				"h-full p-[12px] w-full overflow-y-auto flex flex-col my-auto rounded-xl overflow-hidden",
				className,
			)}>
			<div className="w-full flex mb-2 items-center  ">
				<ListFileInput
					setInputTem={setInputTem}
					inputTem={inputTem}
					checkedFileInput={checkedFileInput}
					setCheckedFileInput={setCheckedFileInput}
				/>
				<div className="flex items-center h-9 w-30 gap-2 ml-4">
					{/* **************************************** */}
					<Hint label="add file input">
						<AddFileInput
							setCheckedFileInput={setCheckedFileInput}
							setInputTem={setInputTem}
							inputTem={inputTem}
						/>
					</Hint>
					{/* **************************************** */}
					<Hint label="upload files input">
						<div>
							<MultiFileUploader setInputTem={setInputTem} inputTem={inputTem} />
						</div>
					</Hint>

					{/* **************************************** */}
					<Hint label="save files">
						<Button
							disabled={isPending}
							onClick={() => {
								updateInput({codeId: codeId as Id<"code">, input: inputTem});
							}}
							className="h-8 w-8 bg-blue-700 hover:bg-blue-800 text-white rounded-lg !px-0 !py-0 ">
							{isPending ? <Loader2 size={14} className=" animate-spin" /> : <Save size={14} />}
						</Button>
					</Hint>
					{/* **************************************** */}
				</div>
			</div>
			<div className="w-full flex items-center justify-center h-9 mb-2 relative">
				<span className=" dark:text-white/60	uppercase truncate ">
					Remember to save your changes
				</span>
				{/* **************************************** */}
				<Hint label="download file input">
					<div className=" absolute right-0">
						<FileDownloader
							value={checkedFileInput.content}
							fileName={checkedFileInput.name}
							className=" h-8 w-8 !bg-teal-700 !hover:bg-teal-800 !text-white"
							size={14}
						/>
					</div>
				</Hint>
				{/* **************************************** */}
			</div>

			<div
				className="h-full w-full flex items-center justify-center overflow-hidden relative"
				// handle drag and drop events
				onDragEnter={e => {
					e.preventDefault();
					e.stopPropagation();
					setIsDragging(true);
				}}
				// avoid dragging file to the editor
				onDragOver={e => {
					e.preventDefault();
				}}
				// handle drag leave event
				// check if the drag leave event is outside the editor
				onDragLeave={e => {
					e.preventDefault();
					if (!e.currentTarget.contains(e.relatedTarget as Node)) {
						setIsDragging(false);
						console.log("onDragLeave");
					}
				}}
				// handle drop event
				// check if the drop event is outside the editor
				// and set the file list to the state
				// and hide the form after dropping the file
				onDrop={e => {
					e.preventDefault();
					setIsDragging(false);
					setFileList(e.dataTransfer.files);
					e.dataTransfer.items.clear();
				}}>
				<Textarea
					value={checkedFileInput?.content || ""}
					disabled={!checkedFileInput?.name}
					placeholder={!checkedFileInput?.name ? "chosen file input..." : ""}
					onChange={e =>
						setCheckedFileInput({name: checkedFileInput?.name || "", content: e.target.value})
					}
					className="w-full h-full  overflow-x-hidden overflow-y-scroll p-4 rounded-none
				bg-gray-200  border-blackBorder 
				dark:text-white dark:bg-[#1e1e2e]/50 custom-scrollbar dark:border-gray-600"
				/>
				<div
					className={cn(
						"hidden absolute h-full w-full rounded-lg border-2 border-blue-500",
						"transition-all duration-300 ease-in-out",
						"bg-blue-800/10",
						"inset-0 items-center justify-center z-50",
						isDragging ? "flex" : "hidden",
					)}>
					<div className="size-44 gap-4 flex flex-col items-center justify-center text-center">
						<div
							className="
							size-36 flex items-center justify-center 
							border-2 border-blue-500 border-dashed text-blue-500 
						dark:text-white ">
							<Plus size={80} className=" " />
						</div>
						<span className="">Drop files here to upload</span>
					</div>
				</div>
			</div>
		</div>
	);
}
