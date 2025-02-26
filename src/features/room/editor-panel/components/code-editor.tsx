"use client";

import {Language, Theme} from "@/types";

import {Editor} from "@monaco-editor/react";

import {useEditor} from "@/hooks/use-editor";
import {defineMonacoThemes, setDraftCode} from "@/lib/utils";
import {Cursors} from "@/liveblocks/components/Cursors";
import {useClerk} from "@clerk/nextjs";
import {useRoom} from "@liveblocks/react";
import {getYjsProviderForRoom} from "@liveblocks/yjs";
import {editor} from "monaco-editor";
import {useCallback, useEffect, useState} from "react";
import {MonacoBinding} from "y-monaco";
import {Awareness} from "y-protocols/awareness.js";
import {CodeEditorSkeleton} from "./code-editor-skeleton";

type Props = {
	theme: Theme;
	language: Language;
	textSize?: number;
	value?: string;
	onChange?: (value?: string) => void;
	readonly?: boolean;
};
type OpaqueRoom = any;
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

	const room = useRoom();
	const provider = getYjsProviderForRoom(room as unknown as OpaqueRoom);
	const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

	// Set up Liveblocks Yjs provider and attach Monaco editor
	useEffect(() => {
		let binding: MonacoBinding;

		if (editorRef) {
			const yDoc = provider.getYDoc();
			const yText = yDoc.getText("monaco");

			// Attach Yjs to Monaco
			binding = new MonacoBinding(
				yText,
				editorRef.getModel() as editor.ITextModel,
				new Set([editorRef]),
				provider.awareness as unknown as Awareness,
			);
		}

		return () => {
			binding?.destroy();
		};
	}, [editorRef, room]);

	const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
		setEditorRef(e);
	}, []);

	const handleChange = (value?: string) => {
		if (!onChange) return;

		onChange(value);
		setDraftCode({language, code: value});
	};
	return (
		<>
			{provider ? <Cursors yProvider={provider} /> : null}
			<Editor
				onMount={handleOnMount}
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
		</>
	);
};
