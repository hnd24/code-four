import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Download} from "lucide-react";
import {toast} from "sonner";

type Props = {
	value: string | undefined;
	fileName?: string;
	className?: string;
	size?: number;
};

export default function FileDownloader({
	value,
	fileName = "download.txt",
	className,
	size = 20,
}: Props) {
	const isDisabled = value?.trim() !== "";
	const handleDownload = () => {
		if (!value) {
			toast.error("No file content available to download.");
			return;
		}

		const blob = new Blob([value], {type: "text/plain"});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	return (
		<Button
			size="icon"
			onClick={handleDownload}
			className={cn(
				"dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80",
				className,
				isDisabled ? "flex" : "hidden",
			)}>
			<Download size={size} />
		</Button>
	);
}
