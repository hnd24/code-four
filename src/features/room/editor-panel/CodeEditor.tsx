"use client";

import {Language, Theme} from "@/types";

import {Editor} from "@monaco-editor/react";

import {defineMonacoThemes, setDraftCode} from "@/lib/utils";

import {useEditor} from "@/hooks/use-editor";
import {useClerk} from "@clerk/nextjs";
import {CodeEditorSkeleton} from "./CodeEditorSkeleton";

type Props = {
	theme: Theme;
	language: Language;
	textSize?: number;
	value?: string;
	onChange?: (value?: string) => void;
	readonly?: boolean;
};

export const CodeEditor = ({
	theme,
	readonly = false,
	language,
	value,
	textSize,
	onChange,
}: Props) => {
	// Monaco Editor causes ClerkJS to fail loading
	// https://github.com/clerk/javascript/issues/1643

	const {} = useEditor();
	const clerk = useClerk();

	if (!clerk.loaded) {
		return null;
	}

	const handleChange = (value?: string) => {
		if (!onChange) return;

		onChange(value);
		setDraftCode({language, code: value});
	};
	return (
		<Editor
			language={language}
			theme={theme}
			value={value}
			onChange={handleChange}
			beforeMount={defineMonacoThemes}
			options={{
				readOnly: readonly,
				fontSize: textSize,
				automaticLayout: true,
				scrollBeyondLastLine: false,
				padding: {top: 16, bottom: 16},
				fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
				fontLigatures: true,
				cursorBlinking: "smooth",
				smoothScrolling: true,
				renderLineHighlight: "none",
				lineHeight: 1.6,
				letterSpacing: 0.5,
				scrollbar: {
					verticalScrollbarSize: 8,
					horizontalScrollbarSize: 8,
				},
			}}
			loading={<CodeEditorSkeleton />}
		/>
	);
};
