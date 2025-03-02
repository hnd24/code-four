import {Id} from "../../convex/_generated/dataModel";

export enum Theme {
	Light = "light",
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
	idRoom?: string;
};

export type outputContent = {
	output: string;
	error?: string;
};

export type orgType = {
	_id: Id<"organizations">;
	_creationTime: number;
	rooms?: Id<"rooms">[] | undefined;
	image?: string | undefined;
	name: string;
	orgId: string;
	members: string[];
};

export type roomType = {
	_id: Id<"rooms">;
	_creationTime: number;
	name: string;
	author: string;
	deletionCountup?: number | undefined;
	orgId: string;
};

export type roomTableType = {
	_id: Id<"rooms">;
	_creationTime: string;
	name: string;
	author: string;
	deletionCountup?: number | undefined;
	orgId: string;
};

export type FileInputType = {
	name: string;
	content: string;
};

export type CodeType =
	| {
			_id: Id<"code">;
			_creationTime: number;
			input?:
				| {
						name: string;
						content: string;
				  }[]
				| undefined;
			code: string;
			roomId: Id<"rooms">;
			language: string;
	  }
	| null
	| undefined;
