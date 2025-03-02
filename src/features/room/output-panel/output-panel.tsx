"use client";

import {Terminal} from "lucide-react";

import {outputContent} from "@/types";
import {CopyButton} from "./components/copy-button";
import {OutputArea} from "./components/output-area";

type Props = {
	outputContent: outputContent;
};

export const OutputPanel = ({outputContent: data}: Props) => {
	const output = data?.output;
	const error = data?.error;

	const hasContent = Boolean(output || error);

	return (
		<div
			className="h-full p-[12px] overflow-y-auto
		flex flex-col my-auto rounded-xl ">
			<div className="hidden lg:flex h-10 mb-3 items-center justify-between overflow-hidden">
				<div className="flex items-center gap-2">
					<div className="flex size-9 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
						<Terminal className="text-white/60 dark:text-blue-400 size-4" />
					</div>
					<span className="text-sm font-medium dark:text-gray-300 ">Output</span>
				</div>

				{hasContent && <CopyButton value={error || output} />}
			</div>
			<OutputArea output={output} error={error} />
		</div>
	);
};
