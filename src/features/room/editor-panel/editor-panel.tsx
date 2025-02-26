import {Button} from "@/components/ui/button";
import {CODE_EXAMPLES} from "@/constants/code-example";
import {useEditor} from "@/hooks/use-editor";
import {useExecuteCode} from "@/hooks/use-execute-code";
import {getDraftCode} from "@/lib/utils";
import {outputContent} from "@/types";

import {Hint} from "@/components/hint";
import {Atom} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import SelectSizeFont from "../components/select-size-font";

import {CodeEditor} from "./components/code-editor";
import LanguageSelector from "./components/language-selector";
import {RunButton} from "./components/run-button";

type Props = {
	setOutputContent: ({output, error}: outputContent) => void;
};

export default function EditorPanel({setOutputContent}: Props) {
	const {
		config: {theme, language, textSize},
		setConfig,
	} = useEditor();

	const [value, setValue] = useState<string | undefined>("");
	const {executeCode, isPending: isExecuting} = useExecuteCode();
	// chưa hoàn thiện cơ sở dữ liệu
	// const save = useSaveExecution();

	// const {data, isPending: isLoading} = useGetLastExecution();

	const defaultCode = CODE_EXAMPLES[language];

	// useEffect(() => {
	// 	if (isLoading) return;

	// 	const draftCode = getDraftCode();

	// 	if (draftCode?.language === language) {
	// 		setValue(draftCode.code);
	// 	} else if (data?.language === language) {
	// 		setValue(data.code);
	// 	} else {
	// 		setValue(CODE_EXAMPLES[language]);
	// 	}
	// }, [data, isLoading, language]);

	// được thiết kế để dùng tạm
	//******************************* */
	useEffect(() => {
		const draftCode = getDraftCode();
		if (draftCode?.language === language) {
			setValue(draftCode.code);
		} else {
			setValue(CODE_EXAMPLES[language]);
		}
	}, [language]);
	//******************************* */

	const onReset = () => {
		setValue(defaultCode);
	};

	const onExecute = async () => {
		if (!value) return;

		const data = await executeCode({language, code: value});

		setOutputContent({output: data.stdout, error: data.stderr});
		// chưa hoàn thiện cơ sở dư liệu
		// save.mutate({
		// 	code: value,
		// 	language,
		// 	error: data.stderr,
		// 	output: data.stdout,
		// });
	};

	// const isPending = isExecuting || save.isPending;
	const isPending = isExecuting;

	return (
		<div
			className="h-full p-[12px] overflow-y-hidden
					flex flex-col my-auto rounded-xl ">
			<div className="mb-3 flex  items-center justify-between overflow-hidden">
				<div className="flex flex-col justify-center">
					<LanguageSelector className="hidden sm:flex" />
					<Image
						src={`/languages/${language}.svg`}
						className="flex rounded-sm sm:hidden ml-2"
						alt={language}
						width={28}
						height={28}
					/>
				</div>

				<div className="flex gap-2">
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
					<RunButton disabled={isPending} onClick={onExecute} />
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
