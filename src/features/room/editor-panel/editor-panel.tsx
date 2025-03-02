"use client";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {CODE_EXAMPLES} from "@/constants/code-example";
import {useEditor} from "@/hooks/use-editor";
import {useExecuteCode} from "@/hooks/use-execute-code";
import {cn} from "@/lib/utils";
import {CodeType, FileInputType, Language, outputContent} from "@/types";
import {Atom, Contact, FileInput, Loader2} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import SelectSizeFont from "../components/select-size-font";

import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {api} from "../../../../convex/_generated/api";

import {useClerk} from "@clerk/nextjs";
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
	const clerk = useClerk();

	if (!clerk.loaded) {
		return null;
	}
	const {
		config: {theme, language, textSize, hiddenRemoteSelection, input: inputConfig},
		setConfig,
	} = useEditor();

	console.log("🚀 ~ Edi	torPanel ~ language:", language === "cpp");
	const [value, setValue] = useState<string | undefined>("");
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

		const data = await executeCode({language, code: value, input});
		setOutputContent({output: data.stdout, error: data.stderr});
	};

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
						<div className="bg-transparent w-9 h-9 border-x rounded-lg border-blackBorder flex items-start justify-center">
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
					<Hint label="display teammate's cursor">
						<Button
							size="icon"
							className={cn(
								"hidden md:flex",
								"dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80 ",
								hiddenRemoteSelection ? "dark:bg-gray-200" : "bg-black/50 dark:bg-gray-200/60",
							)}
							onClick={() => setConfig({hiddenRemoteSelection: !hiddenRemoteSelection})}>
							<Contact size={20} />
						</Button>
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
					<Hint label="Example">
						<Button
							size="icon"
							className="dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80"
							onClick={onReset}>
							<Atom size={20} />
						</Button>
					</Hint>
					<SelectSizeFont />
					<RunButton disabled={isLoading} onClick={onExecute} />
				</div>
			</div>
			<div className="h-full border border-blackBorder rounded-lg overflow-hidden">
				<CodeEditor
					value={value}
					onChange={setValue}
					theme={theme}
					textSize={textSize}
					language={language}
				/>
			</div>
		</div>
	);
}
