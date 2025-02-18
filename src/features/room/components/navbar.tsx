"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
		config: {language: CheckedLanguage, theme: CheckedTheme},
		setConfig,
	} = useEditor();
	return (
		<Sheet>
			<SheetTrigger className={className}>
				<Image src="/favicon/logo.ico" alt="logo" width={50} height={50} />
			</SheetTrigger>
			<SheetContent side="left" className="bg-blackLight text-white/90 w-fit min-w-60">
				<SheetHeader>
					<SheetTitle className="text-white/90 text-start">Code Four</SheetTitle>
					<SheetDescription className="text-white/60 text-start">
						Code together, fun together
					</SheetDescription>
				</SheetHeader>
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger isTrigger={false}>
							<Link href={"/"}>Return home</Link>
						</AccordionTrigger>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Select Language</AccordionTrigger>
						{Object.values(LANGUAGES).map(({label, value}) => (
							<AccordionContent
								key={value}
								className={cn(
									"flex justify-between hover:cursor-pointer text-gray-500",
									CheckedLanguage === value && "text-gray-100",
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
					<AccordionItem value="item-3">
						<AccordionTrigger>Select theme</AccordionTrigger>
						{THEMES.map(theme => {
							return (
								<AccordionContent
									key={theme.value}
									onClick={() => setConfig({theme: theme.value})}
									className={cn(
										"flex items-center justify-between hover:cursor-pointer text-gray-500",
										CheckedTheme === theme.value && "text-gray-100",
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
				</Accordion>
			</SheetContent>
		</Sheet>
	);
}
