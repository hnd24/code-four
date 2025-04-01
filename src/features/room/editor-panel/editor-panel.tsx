"use client";

import {Button} from "@/components/ui/button";
import {CODE_EXAMPLES} from "@/constants/code-example";
import {useEditor} from "@/hooks/use-editor";
import {useExecuteCode} from "@/hooks/use-execute-code";
import {cn} from "@/lib/utils";
import {
	CodeType,
	FileInputType,
	Language,
	LanguageExtension,
	ListLanguageExtensions,
	outputContent,
} from "@/types";
import {Atom, Contact, FileInput, Loader2, Plus} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import SelectSizeFont from "../components/select-size-font";

import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {api} from "../../../../convex/_generated/api";

import {Hint} from "@/components/hint";
import {useClerk} from "@clerk/nextjs";
import {toast} from "sonner";
import FileDownloader from "../components/file-downloader";
import FileUploader from "../components/file-uploader";
import {CodeEditor} from "./components/code-editor";
import LanguageSelector from "./components/language-selector";
import {RunButton} from "./components/run-button";

type Props = {
	setOutputContent: ({output, error}: outputContent) => void;
	code: CodeType;
	isPending: boolean;
	input?: FileInputType[];
};

export default function EditorPanel({setOutputContent, code, isPending, input}: Props) {
	const [value, setValue] = useState<string | undefined>("");
	const [fileList, setFileList] = useState<FileList>();
	const [isDragging, setIsDragging] = useState(false);

	const clerk = useClerk();

	if (!clerk.loaded) {
		return null;
	}
	const {
		config: {theme, language, textSize, hiddenRemoteSelection, input: inputConfig},
		setConfig,
	} = useEditor();

	const {executeCode, isPending: isExecuting} = useExecuteCode();

	const {mutate: updateCode} = useMutation({
		mutationFn: useConvexMutation(api.code.updateCode),
	});

	const isLoading = isExecuting || isPending;
	const defaultCode = CODE_EXAMPLES[language];

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (!isPending && code?._id) {
				updateCode({codeId: code?._id, code: value || ""});
			}
		}, 1000); // Adjust the delay as needed

		return () => clearTimeout(timeoutId);
	}, [value, isPending, code?._id]);

	const onReset = () => {
		setValue(defaultCode);
	};

	const onExecute = async () => {
		if (!value) return;
		if (language === Language.CSharp || language === Language.Cpp) {
			const data = await executeCode({language, code: value});
			setOutputContent({output: data.stdout, error: data.stderr});
		} else {
			const data = await executeCode({language, code: value, input});
			setOutputContent({output: data.stdout, error: data.stderr});
		}
	};

	useEffect(() => {
		if (!fileList) return;
		if (fileList.length > 1) {
			toast.error("Please upload only one file.");
			return;
		}
		const allowedTypes = [...ListLanguageExtensions, "txt"];
		const file = fileList[0];
		const fileExtension = file.name.split(".").pop()?.toLowerCase();
		if (!fileExtension || !allowedTypes.includes(fileExtension)) {
			toast.error(`Unsupported file type. Please upload a .${allowedTypes.join(", .")} file.`);
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			toast.error("File size exceeds 2MB limit.");
			return;
		}

		// Set the language based on the file extension
		if (fileExtension in LanguageExtension) {
			const languageValue = LanguageExtension[
				fileExtension as keyof typeof LanguageExtension
			] as Language;
			setConfig({language: languageValue});
		}

		const reader = new FileReader();
		reader.onload = e => {
			setValue((e.target?.result as string) || "");
		};
		reader.readAsText(file);
		setFileList(undefined); // Clear the file list after reading
	}, [fileList]);

	return (
		<div
			className="h-full p-[12px] overflow-y-hidden
					flex flex-col my-auto rounded-xl ">
			<div className="mb-3 flex  items-center justify-between overflow-hidden">
				<div className="flex flex-col justify-center">
					{!isPending && code ? (
						<LanguageSelector
							className="hidden sm:flex"
							language={code.language as Language}
							codeId={code._id}
						/>
					) : (
						<div className="bg-transparent w-9 h-9 border-x rounded-lg border-blackBorder md:flex hidden items-start justify-center">
							<Loader2 className="w-6 h-6 text-white animate-spin" />
						</div>
					)}
					<Image
						src={`/languages/${language}.svg`}
						className="flex rounded-sm sm:hidden ml-2"
						alt={language}
						width={28}
						height={28}
					/>
				</div>

				<div className="flex items-center gap-2 h-10">
					{/* ********************** */}
					<Hint label="download file ">
						<div>
							<FileDownloader value={value} />
						</div>
					</Hint>
					{/* ********************** */}
					<Hint label="upload file ">
						<div>
							<FileUploader setValue={setValue} />
						</div>
					</Hint>
					{/* ********************** */}
					<Hint label="file input">
						<Button
							size="icon"
							className={cn(
								" dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80",
								inputConfig ? "dark:bg-gray-200" : "bg-black/50 dark:bg-gray-200/60",
								(language === "cpp" || language === "csharp") && "hidden",
							)}
							onClick={() => setConfig({input: !inputConfig})}>
							<FileInput size={20} />
						</Button>
					</Hint>
					{/* ********************** */}
					<Hint label="display teammate's cursor">
						<Button
							size="icon"
							className={cn(
								"hidden md:flex",
								"dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80 ",
								!hiddenRemoteSelection ? "dark:bg-gray-200" : "bg-black/50 dark:bg-gray-200/60",
							)}
							onClick={() => setConfig({hiddenRemoteSelection: !hiddenRemoteSelection})}>
							<Contact size={20} />
						</Button>
					</Hint>
					<Hint label="Example">
						<Button
							size="icon"
							className="dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80"
							onClick={onReset}>
							<Atom size={20} />
						</Button>
					</Hint>
					<SelectSizeFont />
					<RunButton disabled={!value?.trim()} isLoading={isLoading} onClick={onExecute} />
				</div>
			</div>
			<div
				className="h-full border border-blackBorder rounded-lg overflow-hidden relative"
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
				<CodeEditor
					value={value}
					onChange={setValue}
					theme={theme}
					textSize={textSize}
					language={language}
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
						<span className="">Drop a file here to upload</span>
					</div>
				</div>
			</div>
		</div>
	);
}
