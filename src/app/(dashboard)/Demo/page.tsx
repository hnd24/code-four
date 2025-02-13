"use client";

import HeaderRoom from "@/features/room/HeaderRoom";

import {Monaco} from "@monaco-editor/react";
import {useRef} from "react";

export default function EditorPanel() {
	const editorRef = useRef<{getValue: () => string} | null>(null);

	const handleEditorDidMount = (editor: any, monaco: Monaco) => {
		editorRef.current = editor;
	};

	function showValue() {
		if (editorRef.current) alert(editorRef.current.getValue());
	}

	return (
		<div className="h-screen max-w-screen-2xl flex flex-col items-center mx-auto p-4">
			<HeaderRoom />
		</div>
	);
}
