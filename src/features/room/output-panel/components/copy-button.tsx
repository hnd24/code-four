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
				size="default"
				className={cn("text-xs font-normal px-2 dark:text-black/90", className)}
				onClick={() => copyToClipboard(value)}>
				{isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
			</Button>
		</Hint>
	);
};
