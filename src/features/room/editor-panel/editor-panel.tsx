"use client";
import {Button} from "@/components/ui/button";
import {CODE_EXAMPLES} from "@/constants/code-example";
import {useEditor} from "@/hooks/use-editor";
import {useExecuteCode} from "@/hooks/use-execute-code";
import {cn} from "@/lib/utils";
import {Language, outputContent} from "@/types";

import {Hint} from "@/components/hint";
import {Atom, Contact, Loader2} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import SelectSizeFont from "../components/select-size-font";

import {convexQuery, useConvexMutation} from "@convex-dev/react-query";
import {useMutation, useQuery} from "@tanstack/react-query";
import {usePathname} from "next/navigation";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import {CodeEditor} from "./components/code-editor";
import LanguageSelector from "./components/language-selector";
import {RunButton} from "./components/run-button";

type Props = {
	setOutputContent: ({output, error}: outputContent) => void;
};

export default function EditorPanel({setOutputContent}: Props) {
	const {
		config: {theme, language, textSize, hiddenRemoteSelection},
		setConfig,
	} = useEditor();

	const [value, setValue] = useState<string | undefined>("");
	const {executeCode, isPending: isExecuting} = useExecuteCode();

	const pathname = usePathname();
	const roomId = pathname.split("/").pop();
	const {data: code, isPending} = useQuery(
		convexQuery(api.code.getCodeByRoomId, {roomId: roomId as Id<"rooms">}),
	);

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

		const data = await executeCode({language, code: value});
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

				<div className="flex gap-2">
					<Hint label="display teammate's cursor">
						<Button
							variant="outline"
							size="icon"
							className={cn(
								" border-none text-gray-900 hover:bg-gray-200/80 hidden md:flex",
								hiddenRemoteSelection ? "bg-gray-200" : "bg-gray-200/60",
							)}
							onClick={() => setConfig({hiddenRemoteSelection: !hiddenRemoteSelection})}>
							<Contact size={20} />
						</Button>
					</Hint>
					<SelectSizeFont />
					<Hint label="Example">
						<Button
							variant="outline"
							size="icon"
							className="bg-gray-200 border-none text-gray-900 hover:bg-gray-200/80"
							onClick={onReset}>
							<Atom size={20} />
						</Button>
					</Hint>
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
