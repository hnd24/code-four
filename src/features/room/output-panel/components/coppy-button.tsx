"use client";

import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {useCopyToClipboard} from "@/hooks/use-copy-clipboard";
import {cn} from "@/lib/utils";
import {CheckCircle, Copy} from "lucide-react";
type Props = {
	value?: string;
	className?: HTMLButtonElement["className"];
};

export const CopyButton = ({value, className}: Props) => {
	const {isCopied, copyToClipboard} = useCopyToClipboard();

	return (
		<Hint label="Copy to clipboard" side="left">
			<Button
				type="button"
				size="default"
				variant="secondary"
				className={cn("text-xs font-normal px-2", className)}
				onClick={() => copyToClipboard(value)}>
				{isCopied ? (
					<div className="flex items-center gap-1">
						<CheckCircle className="!size-3.5" />
					</div>
				) : (
					<div className="flex items-center gap-1">
						<Copy className="!size-3.5" />
					</div>
				)}
			</Button>
		</Hint>
	);
};
