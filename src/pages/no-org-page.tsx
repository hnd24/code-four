import CreateOrgButton from "@/features/home/components/create-org-button";
import Image from "next/image";

export default function NoOrgPage() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<Image
				src={"/favicon/no-organization.svg"}
				alt="no-org"
				width={300}
				height={300}
				className="dark:bg-transparent bg-blackLight rounded-full w-[300px] h-[300px]"
			/>
			<span className="text-3xl dark:text-white font-bold text-center">
				Create an organization to get started
			</span>
			<CreateOrgButton className="w-fit" />
		</div>
	);
}
