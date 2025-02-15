import {Language, Theme} from "@/types";
import {CloudMoon, Eclipse, Github, Glasses, LucideIcon, Moon, Sun} from "lucide-react";

export const DRAFT_CODE_KEY = "editor-draft";

type LanguageConfig = {
	label: string;
	value: Language;
	logo: string;
};

export const LANGUAGES: Record<Language, LanguageConfig> = {
	javascript: {
		label: "JavaScript",
		value: Language.JavaScript,
		logo: "/languages/javascript.svg",
	},
	typescript: {
		label: "TypeScript",
		value: Language.TypeScript,
		logo: "/languages/typescript.svg",
	},
	python: {
		label: "Python",
		value: Language.Python,
		logo: "/languages/python.svg",
	},
	java: {
		label: "Java",
		value: Language.Java,
		logo: "/languages/java.svg",
	},
	cpp: {
		label: "C++",
		value: Language.Cpp,
		logo: "/languages/cpp.svg",
	},
	csharp: {
		label: "C#",
		value: Language.CSharp,
		logo: "/languages/csharp.svg",
	},
};
type ThemeItem = {
	label: string;
	value: Theme;
	icon: LucideIcon;
	color: string;
};

export const THEMES: ThemeItem[] = [
	{
		label: "Light",
		value: Theme.Light,
		icon: Sun,
		color: "#1e1e1e",
	},
	{
		label: "Dark",
		value: Theme.Default,
		icon: Moon,
		color: "#1e1e1e",
	},
	{
		label: "Dracula",
		value: Theme.Dracula,
		icon: Glasses,
		color: "#282a36",
	},
	{
		label: "Night Owl",
		value: Theme.NightOwl,
		icon: CloudMoon,
		color: "#011627",
	},
	{
		label: "Github",
		value: Theme.Github,
		icon: Github,
		color: "#24292e",
	},
	{
		label: "Cobalt",
		value: Theme.Cobalt,
		icon: Eclipse,
		color: "#002240",
	},
];
