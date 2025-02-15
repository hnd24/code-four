"use client";

import {useRunCode} from "@/hooks/use-run-code";
import {AlertTriangle, CheckCircle, CircleEllipsis, Clock} from "lucide-react";
import {OutputAreaSkeleton} from "./OutputAreaSkeleton";

type Props = {
	isLoading?: boolean;
	error?: string | null;
	output?: string | null;
};

export const OutputArea = ({error, output}: Props) => {
	const {isRunning} = useRunCode();

	return (
		<div className="h-full overflow-hidden rounded-xl border border-blackBorder bg-[#1e1e2e]/50 p-4 font-mono text-sm">
			<OutputAreaContent isLoading={isRunning} error={error} output={output} />
		</div>
	);
};

function OutputAreaContent({isLoading, error, output}: Props) {
	if (isLoading) {
		return (
			<div className="h-full flex flex-col overflow-hidden ">
				<div className="flex items-center gap-2 text-yellow-500">
					<CircleEllipsis className="size-5" />
					<span className="font-medium">Execution loading</span>
				</div>
				<OutputAreaSkeleton />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-start gap-3 text-red-400">
				<AlertTriangle className="mt-1 size-5 flex-shrink-0" />
				<div className="space-y-1">
					<div className="font-medium">Execution Error</div>
					<pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
				</div>
			</div>
		);
	}

	if (output) {
		return (
			<div className="space-y-2">
				<div className="mb-3 flex items-center gap-2 text-emerald-400">
					<CheckCircle className="size-5" />
					<span className="font-medium">Execution Successful</span>
				</div>
				<pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col items-center justify-center text-gray-500">
			<div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50">
				<Clock className="size-6" />
			</div>
			<p className="text-center">Run your code to see the output here...</p>
		</div>
	);
}
