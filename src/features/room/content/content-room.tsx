"use client";

import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import EditorPanel from "@/features/room/editor-panel/editor-panel";
import {OutputPanel} from "@/features/room/output-panel/output-panel";
import {useIsMobile} from "@/hooks/use-mobile";

import {useEditor} from "@/hooks/use-editor";
import {FileInputType, outputContent} from "@/types";
import {convexQuery, useConvexMutation} from "@convex-dev/react-query";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import InputPanel from "../input-panel/input-panel";

type Props = {
	roomId: string;
};

export default function ContentRoom({roomId}: Props) {
	const {
		config: {input: inputConfig, language},
		setConfig,
	} = useEditor();
	const [outputContent, setOutputContent] = useState<outputContent>({output: "", error: ""});
	const [inputTem, setInputTem] = useState<FileInputType[]>([]);
	const isMobile = useIsMobile();

	const {data: code, isPending} = useQuery(
		convexQuery(api.code.getCodeByRoomId, {roomId: roomId as Id<"rooms">}),
	);

	useEffect(() => {
		if (code?.input) {
			setInputTem(code.input);
		}
	}, [code]);

	useEffect(() => {
		if (language === "cpp" || language === "csharp") {
			setConfig({input: false});
		}
	}, [language]);

	return (
		<ResizablePanelGroup
			direction={!isMobile ? "horizontal" : "vertical"}
			className="h-full max-h-[1280px] w-full overflow-hidden rounded-xl border-2 shadow-2xl
			bg-whiteLight border-black
			dark:bg-blackLight/90 dark:border-blackBorder  ">
			<ResizablePanel defaultSize={60}>
				<EditorPanel
					setOutputContent={setOutputContent}
					code={code}
					isPending={isPending}
					input={inputTem}
				/>
			</ResizablePanel>
			<ResizableHandle className="w-0 bg-bg-blackBlue " withHandle />
			<ResizablePanel defaultSize={40}>
				{!inputConfig ? (
					<OutputPanel outputContent={outputContent} />
				) : (
					<ResizablePanelGroup direction="vertical" className="w-full  overflow-hidden">
						<ResizablePanel defaultSize={40}>
							<OutputPanel outputContent={outputContent} />
						</ResizablePanel>
						<ResizableHandle className="h-0  " withHandle />
						<ResizablePanel defaultSize={60}>
							<InputPanel setInputTem={setInputTem} codeId={code?._id} inputTem={inputTem} />
						</ResizablePanel>
					</ResizablePanelGroup>
				)}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
