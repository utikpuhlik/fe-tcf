import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateAvatarFallback(string: string) {
	const names = string.split(" ").filter((first_name: string) => first_name);
	const mapped = names.map((first_name: string) =>
		first_name.charAt(0).toUpperCase(),
	);

	return mapped.join("");
}
