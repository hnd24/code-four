import {Button} from "@/components/ui/button";
import {useEditor} from "@/hooks/use-editor";
import {cn} from "@/lib/utils";
import {Language, LanguageExtension, ListLanguageExtensions} from "@/types";
import {Upload} from "lucide-react";
import {useRef} from "react";
import {toast} from "sonner";

type Props = {
	setValue: (value: string) => void;
	className?: string;
	size?: number;
};

export default function FileUploader({setValue, className, size = 20}: Props) {
	const {setConfig} = useEditor();
	const inputRef = useRef<HTMLInputElement | null>(null);

	// List of allowed file types
	// ["txt", "ts", "js", "java", "c", "cpp", "py"]
	const allowedTypes = [...ListLanguageExtensions, "txt"];

	// Function to handle button click and trigger file input
	const handleButtonClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;
		// Check if the file type is allowed
		const fileExtension = file.name.split(".").pop()?.toLowerCase();
		if (!fileExtension || !allowedTypes.includes(fileExtension)) {
			toast.error(`Unsupported file type. Please upload a .${allowedTypes.join(", .")} file.`);
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			toast.error("File size exceeds 2MB limit.");
			return;
		}

		// Set the language based on the file extension
		if (fileExtension in LanguageExtension) {
			const languageValue = LanguageExtension[
				fileExtension as keyof typeof LanguageExtension
			] as Language;
			setConfig({language: languageValue});
		}

		const reader = new FileReader();
		reader.onload = e => {
			setValue((e.target?.result as string) || "");
		};
		reader.readAsText(file);
		event.target.value = "";
		inputRef.current!.value = "";
		inputRef.current!.files = null;
	};

	return (
		<>
			<input type="file" className="hidden" ref={inputRef} onChange={handleFileChange} />
			<Button
				size="icon"
				onClick={handleButtonClick}
				className={cn(
					"dark:bg-gray-200 dark:border-none dark:text-black dark:hover:bg-gray-200/80",
					className,
				)}>
				<Upload size={size} />
			</Button>
		</>
	);
}
