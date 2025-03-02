import {DRAFT_CODE_KEY} from "@/constants";
import {MONACO_THEMES} from "@/themes";
import {DraftCode, FileInputType} from "@/types";
import {Monaco} from "@monaco-editor/react";
import {clsx, type ClassValue} from "clsx";
import {format} from "date-fns";
import {twMerge} from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function random(limit: number): number {
	return Math.floor(Math.random() * limit) + 1;
}

export const defineMonacoThemes = (monaco: Monaco) => {
	Object.entries(MONACO_THEMES).forEach(([theme, themeData]) => {
		monaco.editor.defineTheme(theme, themeData);
	});
};

export const setDraftCode = (draft: DraftCode) => {
	if (!draft.code) return;

	localStorage.setItem(DRAFT_CODE_KEY, JSON.stringify(draft));
};

export const getDraftCode = () => {
	const draft = localStorage.getItem(DRAFT_CODE_KEY);
	return draft ? (JSON.parse(draft) as DraftCode) : null;
};

export const setTheme = (theme: string) => {
	localStorage.setItem("theme", theme);
};
export const getTheme = () => {
	return localStorage.getItem("theme");
};

export const setInputTemLocalStorage = (inputTem: FileInputType[], codeId: string) => {
	localStorage.setItem(`inputTem_${codeId}`, JSON.stringify(inputTem));
};

export const getInputTemLocalStorage = (codeId: string) => {
	const inputTem = localStorage.getItem(`inputTem_${codeId}`);
	return inputTem ? (JSON.parse(inputTem) as FileInputType[]) : [];
};

export const formatTime = (time: number) => {
	const formattedDate = format(new Date(time), "M/dd/yyyy, hh:mm:ss a");
	return formattedDate;
};
