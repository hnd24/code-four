import OrganizationProfilePage from "@/app/organization-profile/[[...organization-profile]]/page";
import {Button} from "@/components/ui/button";

import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

type Props = {
	className?: string;
};

export default function OrgProfile({className}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className={cn(
						"w-full truncate bg-green-700 hover:bg-green-800 !important text-gray-100/90 hover:text-white !important",
						className,
					)}>
					Manage Organization
				</Button>
			</DialogTrigger>
			<DialogContent className="w-screen h-screen flex justify-center items-center p-0 bg-transparent border-none ">
				<VisuallyHidden>
					<DialogTitle></DialogTitle>
				</VisuallyHidden>
				<OrganizationProfilePage />
			</DialogContent>
		</Dialog>
	);
}
