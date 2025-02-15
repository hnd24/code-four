"use client";

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
		<Button
			type="button"
			size="sm"
			variant="secondary"
			className={cn("text-xs font-normal ", className)}
			onClick={() => copyToClipboard(value)}>
			{isCopied ? (
				<div className="flex items-center gap-1">
					<CheckCircle className="!size-3.5" />
					<span>Copied!</span>
				</div>
			) : (
				<div className="flex items-center gap-1">
					<Copy className="!size-3.5" />
					Copy
				</div>
			)}
		</Button>
	);
};
