"use client";

import SwitchMode from "@/components/switch-mode";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {LANGUAGES, THEMES} from "@/constants";
import {useEditor} from "@/hooks/use-editor";
import {cn} from "@/lib/utils";

import {Check} from "lucide-react";

import Image from "next/image";
import Link from "next/link";

type Props = {
	className?: string;
};

export default function Navbar({className}: Props) {
	const {
		config: {language: CheckedLanguage, theme: CheckedTheme, hiddenRemoteSelection},
		setConfig,
	} = useEditor();

	return (
		<Sheet>
			<SheetTrigger className={className}>
				<Image src="/favicon/logo.ico" alt="logo" width={50} height={50} />
			</SheetTrigger>
			<SheetContent
				side="left"
				className=" w-fit min-w-60 
				bg-whiteLight/90
			dark:bg-blackLight dark:text-white/90">
				<SheetHeader>
					<SheetTitle className="dark:text-white/90 text-start">Code Four</SheetTitle>
					<SheetDescription className="dark:text-white/60 text-start">
						Code together, fun together
					</SheetDescription>
				</SheetHeader>
				<div className="w-full h-[1px] my-4 bg-black dark:bg-blackBorder "></div>
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger className="font-bold text-black/80 dark:text-white/60">
							Select Language
						</AccordionTrigger>
						{Object.values(LANGUAGES).map(({label, value}) => (
							<AccordionContent
								key={value}
								className={cn(
									"flex items-center justify-between hover:cursor-pointer text-black/50 dark:text-white/30 py-2 px-2 rounded-lg",
									CheckedLanguage === value && "text-black/80 dark:text-white/80 bg-gray-400",
								)}
								onClick={() => setConfig({language: value})}>
								<div className="flex items-center gap-4 ">
									<Image src={`/languages/${value}.svg`} alt={label} width={20} height={20} />
									<div>{label}</div>
								</div>

								{CheckedLanguage === value && <Check size={20} />}
							</AccordionContent>
						))}
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="font-bold text-black/80 dark:text-white/60">
							Select theme
						</AccordionTrigger>
						{THEMES.map(theme => {
							return (
								<AccordionContent
									key={theme.value}
									onClick={() => setConfig({theme: theme.value})}
									className={cn(
										"flex items-center justify-between hover:cursor-pointer text-black/50 dark:text-white/30 py-2 px-2 rounded-lg",
										CheckedTheme === theme.value && "text-black/80 dark:text-white/80 bg-gray-400",
									)}>
									<div className={"flex gap-4"}>
										<theme.icon size={16} />
										{theme.label}
									</div>
									{CheckedTheme === theme.value && <Check size={20} />}
								</AccordionContent>
							);
						})}
					</AccordionItem>
					<div className="pt-4 pb-2 border-none ">
						<Button
							onClick={() => setConfig({hiddenRemoteSelection: !hiddenRemoteSelection})}
							className={cn(
								"w-full ",
								!hiddenRemoteSelection ? "dark:bg-sky-800" : "bg-black/60 dark:bg-sky-800/60",
							)}>
							Teammate's cursor
						</Button>
					</div>
					<div className=" py-2 border-none">
						<SwitchMode open />
					</div>
					<div className=" py-2 border-none">
						<Link href={"/"} className="w-full">
							<Button className="w-full dark:bg-blue-800">Return home</Button>
						</Link>
					</div>
				</Accordion>
			</SheetContent>
		</Sheet>
	);
}
