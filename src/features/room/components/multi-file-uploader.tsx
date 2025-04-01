import {Button} from "@/components/ui/button";
import {FileInputType} from "@/types";
import {Upload} from "lucide-react";
import {useRef} from "react";
import {toast} from "sonner";

type Props = {
	setInputTem: React.Dispatch<React.SetStateAction<FileInputType[]>>;
	inputTem?: FileInputType[];
};
export default function MultiFileUploader({setInputTem, inputTem = []}: Props) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	// Function to handle button click and trigger file input
	const handleButtonClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files || files.length === 0) return;

		const validFiles: File[] = [];

		// Check if the file type is allowed
		for (const file of files) {
			if (
				!file.type.startsWith("text/") &&
				file.type !== "application/json" &&
				file.type !== "application/xml"
			) {
				toast.error(`File "${file.name}" is not a text-based file.`);
				continue;
			}

			if (file.size > 2 * 1024 * 1024) {
				toast.error(`File "${file.name}" exceeds 2MB limit.`);
				continue;
			}

			validFiles.push(file);
		}

		if (validFiles.length === 0) return;

		validFiles.forEach(file => {
			const reader = new FileReader();
			reader.onload = e => {
				// Check if the file already exists in the inputTem array
				const existingFile = inputTem.find(item => item.name === file.name);
				// If it exists, update the content
				if (existingFile) {
					toast.warning(`File "${file.name}" already exists. Updating content.`);
				}
				// If it doesn't exist, add a new file input
				else {
					const newFile: FileInputType = {
						name: file.name,
						content: e.target?.result as string,
					};
					setInputTem([...inputTem, newFile]);
				}
			};
			reader.onerror = e => {
				toast.error(
					`Error reading file "${file.name}": ${(e.target as FileReader).error?.message || "Unknown error"}`,
				);
			};
			reader.readAsText(file);
		});

		// reset input value
		event.target.value = "";
		inputRef.current!.value = "";
		inputRef.current!.files = null;
	};

	return (
		<>
			<input type="file" className="hidden" ref={inputRef} onChange={handleFileChange} multiple />
			<Button
				className="h-8 w-8 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg !px-0 !py-0 "
				onClick={handleButtonClick}>
				<Upload size={14} />
			</Button>
		</>
	);
}
