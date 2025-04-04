"use client";
import {Hint} from "@/components/hint";
import {useSidebar} from "@/components/ui/sidebar";
import {cn} from "@/lib/utils";
import {useOrganization, useOrganizationList} from "@clerk/nextjs";
import Image from "next/image";

type ItemProps = {
	id: string;
	name: string;
	imageUrl: string;
	memberCount: number;
};

export default function OrgItem({id, name, imageUrl, memberCount}: ItemProps) {
	const {organization} = useOrganization();
	const {open, openMobile} = useSidebar();
	const {setActive} = useOrganizationList();

	const isActive = organization?.id === id;
	const isOpen = open || openMobile;
	const onClick = () => {
		if (!setActive) return;

		setActive({organization: id});
	};

	return (
		<Hint label={name} side="right">
			<div
				className={cn(
					"flex gap-2 overflow-hidden cursor-pointer rounded-lg  opacity-60 ",
					"text-white hover:bg-gray-400",
					" dark:hover:opacity-100 dark:hover:bg-gray-600/60",
					isActive && "bg-gray-300 opacity-100 dark:bg-gray-600/60",
					isOpen && "px-2 py-1",
				)}
				onClick={onClick}>
				<div className="flex items-center justify-center aspect-square w-8 h-8 ">
					<Image
						src={imageUrl}
						alt={name}
						width={32}
						height={32}
						className=" rounded-lg border-2 border-white dark:border-blackBorder transition"
					/>
				</div>
				<div
					className={cn(
						"w-full hidden justify-between font-medium text-black dark:text-white ",
						isOpen && "flex",
					)}>
					<div className="w-full truncate flex items-center">{name}</div>
					<div className={"truncate flex items-center w-fit"}>{memberCount}</div>
				</div>
			</div>
		</Hint>
	);
}
