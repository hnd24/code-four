import OrganizationProfilePage from "@/app/organization-profile/[[...organization-profile]]/page";
import {Button} from "@/components/ui/button";

import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

type Props = {
	className?: string;
	disabled?: boolean;
};

export default function OrgProfile({className, disabled = false}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					disabled={disabled}
					className={cn(
						"w-full truncate ",
						"hover:!bg-black/80 !text-white",
						"dark:bg-green-700 dark:hover:!bg-green-800 dark:text-white/90 dark:hover:!text-white",
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
