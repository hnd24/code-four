import CreateOrgButton from "@/features/home/components/create-org-button";
import Image from "next/image";

export default function NoOrg() {
	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<Image src={"/favicon/no-organization.svg"} alt="no-org" width={300} height={300} />
			<span className="text-3xl dark:text-white font-bold text-center">
				Create an organization to get started
			</span>
			<CreateOrgButton className="w-fit" />
		</div>
	);
}
