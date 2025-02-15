import {Theme} from "@/types";
import {cobalt} from "./cobalt";
import {dracula} from "./dracula";
import {github} from "./github";
import {nightOwl} from "./night-owl";
import {light} from "./light";
export const MONACO_THEMES: Omit<Record<Theme, any>, Theme.Default> = {
	dracula,
	github,
	nightOwl,
	cobalt,
	light, // Add a placeholder for Theme.Light
};
