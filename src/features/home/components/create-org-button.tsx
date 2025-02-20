import CreateOrganizationPage from "@/app/create-organization/[[...create-organization]]/page";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

type Props = {
	className?: string;
};

export default function CreateOrgButton({className}: Props) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className={cn(
						"w-full truncate bg-blue-700 hover:!bg-blue-800 hover:!text-white text-gray-100/90",
						className,
					)}>
					Create Organization
				</Button>
			</DialogTrigger>
			<DialogContent className="w-screen h-screen flex justify-center items-center p-0 bg-transparent border-none ">
				<VisuallyHidden>
					<DialogTitle></DialogTitle>
				</VisuallyHidden>
				<CreateOrganizationPage />
			</DialogContent>
		</Dialog>
	);
}
