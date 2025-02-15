export enum Theme {
	Default = "vs-dark",
	Dracula = "dracula",
	NightOwl = "nightOwl",
	Github = "github",
	Cobalt = "cobalt",
}

export enum Language {
	JavaScript = "javascript",
	TypeScript = "typescript",
	Python = "python",
	Java = "java",
	Cpp = "cpp",
	CSharp = "csharp",
}

export type DraftCode = {
	language: Language;
	code?: string;
};

export type outputContent = {
	output: string;
	error?: string;
};
