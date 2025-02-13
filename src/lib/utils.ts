import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function random(limit: number): number {
	return Math.floor(Math.random() * limit) + 1;
}
