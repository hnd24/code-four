"use client";
import {Hint} from "@/components/hint";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";

import {FileInputType} from "@/types";
import {useConvexMutation} from "@convex-dev/react-query";
import {useMutation} from "@tanstack/react-query";
import {Loader2, Save} from "lucide-react";
import {useEffect, useState} from "react";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import FileDownloader from "../components/file-downloader";
import MultiFileUploader from "../components/multi-file-uploader";
import AddFileInput from "./components/add-file-input";
import ListFileInput from "./components/list-file-input";

type Props = {
	className?: string;
	setInputTem: React.Dispatch<React.SetStateAction<FileInputType[]>>;

	inputTem: FileInputType[];
	codeId?: string;
};

export default function InputPanel({className, setInputTem, inputTem, codeId}: Props) {
	const [checkedFileInput, setCheckedFileInput] = useState<FileInputType>({name: "", content: ""});

	const {mutate: updateInput, isPending} = useMutation({
		mutationFn: useConvexMutation(api.code.updateInputInCodeRoom),
	});

	// setInputTem when the codeId changes
	useEffect(() => {
		setInputTem(
			inputTem.map(item => (item?.name === checkedFileInput?.name ? checkedFileInput : item)),
		);
	}, [checkedFileInput]);

	// if isPending is true, set checkedFileInput to empty
	useEffect(() => {
		if (isPending === true) {
			setCheckedFileInput({name: "", content: ""});
		}
	}, [isPending]);

	return (
		<div
			className={cn(
				"h-full p-[12px] w-full overflow-y-auto flex flex-col my-auto rounded-xl overflow-hidden",
				className,
			)}>
			<div className="w-full flex mb-2 items-center  ">
				<ListFileInput
					setInputTem={setInputTem}
					inputTem={inputTem}
					checkedFileInput={checkedFileInput}
					setCheckedFileInput={setCheckedFileInput}
				/>
				<div className="flex items-center h-9 w-30 gap-2 ml-4">
					{/* **************************************** */}
					<Hint label="add file input">
						<AddFileInput
							setCheckedFileInput={setCheckedFileInput}
							setInputTem={setInputTem}
							inputTem={inputTem}
						/>
					</Hint>
					{/* **************************************** */}
					<Hint label="upload files input">
						<div>
							<MultiFileUploader setInputTem={setInputTem} />
						</div>
					</Hint>

					{/* **************************************** */}
					<Hint label="save files">
						<Button
							disabled={isPending}
							onClick={() => {
								updateInput({codeId: codeId as Id<"code">, input: inputTem});
							}}
							className="h-8 w-8 bg-blue-700 hover:bg-blue-800 text-white rounded-lg !px-0 !py-0 ">
							{isPending ? <Loader2 size={14} className=" animate-spin" /> : <Save size={14} />}
						</Button>
					</Hint>
					{/* **************************************** */}
				</div>
			</div>
			<div className="w-full flex items-center justify-center h-9 mb-2 relative">
				<span className=" dark:text-white/60	uppercase truncate ">
					Remember to save your changes
				</span>
				{/* **************************************** */}
				<Hint label="download file input">
					<div className=" absolute right-0">
						<FileDownloader
							value={checkedFileInput.content}
							fileName={checkedFileInput.name}
							className=" h-8 w-8 !bg-teal-700 !hover:bg-teal-800 !text-white"
							size={14}
						/>
					</div>
				</Hint>
				{/* **************************************** */}
			</div>

			<Textarea
				value={checkedFileInput?.content || ""}
				disabled={!checkedFileInput?.name}
				placeholder={!checkedFileInput?.name ? "chosen file input..." : ""}
				onChange={e =>
					setCheckedFileInput({name: checkedFileInput?.name || "", content: e.target.value})
				}
				className="w-full h-full  overflow-x-hidden overflow-y-scroll p-4 rounded-none
				bg-gray-200  border-blackBorder 
				dark:text-white dark:bg-[#1e1e2e]/50 custom-scrollbar dark:border-gray-600"
			/>
		</div>
	);
}
