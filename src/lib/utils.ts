import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CurrencyEnum } from "@/lib/schemas/commonSchema";

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

export function formatCurrency(
	value: number,
	currency: CurrencyEnum = "RUB",
	locales: string = "ru-RU",
): string {
	return new Intl.NumberFormat(locales, {
		style: "currency",
		currency: currency,
		// minimumFractionDigits: 0,
		// maximumFractionDigits: 2,
	}).format(value);
}

export const formatDateToLocal = (
	dateStr: string,
	locales = "ru-RU",
	numeric = false,
) => {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		minute: "2-digit",
		hour: "2-digit",
		day: "numeric",
		month: numeric ? "numeric" : "short",
		year: "numeric",
	};
	const formatter = new Intl.DateTimeFormat(locales, options);
	return formatter.format(date);
};
