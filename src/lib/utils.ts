import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CategorySchema } from "@/lib/schemas/categorySchema";
import type { CurrencyEnum } from "@/lib/schemas/commonSchema";
import type { OfferSchema } from "@/lib/schemas/offerSchema";
import type { ProductSchema } from "@/lib/schemas/productSchema";
import type { SubCategorySchema } from "@/lib/schemas/subCategorySchema";

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
		minimumFractionDigits: 0,
		// maximumFractionDigits: 2,
	}).format(value);
}

type CatalogPathInput =
	| CategorySchema
	| SubCategorySchema
	| ProductSchema
	| OfferSchema;

export function buildCatalogPath(
	input?: CatalogPathInput,
	basePath = "/catalog/ford",
) {
	if (!input) {
		return basePath;
	}

	const segments = [basePath];

	if ("product" in input) {
		const { product } = input;
		segments.push(
			product.sub_category.category.slug,
			product.sub_category.slug,
			product.slug,
		);
		return segments.join("/");
	}

	if ("sub_category" in input) {
		segments.push(
			input.sub_category.category.slug,
			input.sub_category.slug,
			input.slug,
		);
		return segments.join("/");
	}

	if ("category" in input) {
		segments.push(input.category.slug, input.slug);
		return segments.join("/");
	}

	segments.push(input.slug);
	return segments.join("/");
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
