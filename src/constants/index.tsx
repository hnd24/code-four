import {Language} from "@/types";

export const DRAFT_CODE_KEY = "editor-draft";

export const themes = [
	{
		value: "vs-dark",
		label: "vs dark",
	},
	{
		value: "vs",
		label: "vs light",
	},
	{
		value: "dracula",
		label: "Dracula",
	},
	{
		value: "cobalt",
		label: "Cobalt",
	},
	{
		value: "nightOwl",
		label: "Night Owl",
	},
];

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
