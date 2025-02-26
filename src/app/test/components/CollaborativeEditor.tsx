"use client";

import {useRoom} from "@liveblocks/react/suspense";
import {getYjsProviderForRoom} from "@liveblocks/yjs";
import {Editor} from "@monaco-editor/react";
import {editor} from "monaco-editor";
import {useCallback, useEffect, useState} from "react";
import {MonacoBinding} from "y-monaco";
import {Awareness} from "y-protocols/awareness";
import {Avatars} from "./Avatars";
import {Cursors} from "./Cursors";

type OpaqueRoom = any; // Define OpaqueRoom type

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
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

	return (
		<div className="pt-24 h-screen w-screen">
			<div className="">{provider ? <Avatars /> : null}</div>
			{provider ? <Cursors yProvider={provider} /> : null}
			<div className={"h-full w-full"}>
				<Editor
					onMount={handleOnMount}
					height="100%"
					width="100hw"
					theme="vs-dark"
					defaultLanguage="typescript"
					defaultValue=""
					options={{
						tabSize: 2,
						padding: {top: 20},
					}}
				/>
			</div>
		</div>
	);
}
