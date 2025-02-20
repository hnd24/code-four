"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import EditorPanel from "@/features/room/editor-panel/editor-panel";
import {OutputPanel} from "@/features/room/output-panel/output-panel";
import {useIsMobile} from "@/hooks/use-mobile";
import {outputContent} from "@/types";
import {useState} from "react";

export default function ContentRoom() {
	const [outputContent, setOutputContent] = useState<outputContent>({output: "", error: ""});
	const isMobile = useIsMobile();
	return (
		<ResizablePanelGroup
			direction={!isMobile ? "horizontal" : "vertical"}
			className="h-full max-h-[1280px] w-full bg-blackLight/90 rounded-xl border-2 border-blackBorder overflow-hidden ">
			<ResizablePanel defaultSize={60}>
				<EditorPanel setOutputContent={setOutputContent} />
			</ResizablePanel>
			<ResizableHandle className="w-0 bg-blackBorder " withHandle />
			<ResizablePanel defaultSize={40}>
				<OutputPanel outputContent={outputContent} />
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
