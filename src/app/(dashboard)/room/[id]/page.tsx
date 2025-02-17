"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import HeaderRoom from "@/features/room/components/header-room";
import EditorPanel from "@/features/room/editor-panel/editor-panel";
import {OutputPanel} from "@/features/room/output-panel/output-panel";
import {useIsMobile} from "@/hooks/use-mobile";
import {outputContent} from "@/types";
import {useState} from "react";

export default function RoomPage() {
	const [outputContent, setOutputContent] = useState<outputContent>({output: "", error: ""});
	const isMobile = useIsMobile();
	return (
		<div className="h-screen max-w-screen-2xl flex flex-col items-center mx-auto p-4 gap-4">
			<HeaderRoom />
			<ResizablePanelGroup
				direction={!isMobile ? "horizontal" : "vertical"}
				className="h-full max-h-[1280px] w-full bg-blackLight/90 rounded-xl border-2 border-blackBorder overflow-hidden ">
				<ResizablePanel defaultSize={60}>
					<EditorPanel setOutputContent={setOutputContent} />
				</ResizablePanel>
				<ResizableHandle className="w-0 bg-blackBorder" withHandle />
				<ResizablePanel defaultSize={40}>
					<OutputPanel outputContent={outputContent} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
