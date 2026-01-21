import { env } from "@/env";
import {
	fetchEntityById,
	fetchEntityBySlug,
} from "@/lib/api/generic/fetchEntity";
import { fetchAndParse } from "@/lib/api/utils/fetchJson";
import { type CountSchema, zCountSchema } from "@/lib/schemas/commonSchema";
import {
	type ProductPaginatedSchema,
	type ProductSchema,
	type ProductWithStatsSchema,
	zProductPaginatedSchema,
	zProductSchema,
	zProductWithStatsSchema,
} from "@/lib/schemas/productSchema";

const ENTITY = "products";

export const productsApi = {
	// -------------------------------
	// Fetchers
	// -------------------------------
	fetchAll(size: number = 10000): Promise<ProductPaginatedSchema> {
		const url = new URL(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}`);
		url.searchParams.set("size", size.toString());
		return fetchAndParse<ProductPaginatedSchema>(url, zProductPaginatedSchema);
	},
	fetchById(id: string): Promise<ProductSchema> {
		return fetchEntityById<ProductSchema>(id, zProductSchema, ENTITY);
	},
	fetchBySlug(slug: string): Promise<ProductSchema> {
		return fetchEntityBySlug<ProductSchema>(slug, zProductSchema, ENTITY);
	},
	fetchBySubCategoryId(
		sub_category_id: string,
	): Promise<ProductPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?sub_category_id=${sub_category_id}`;
		return fetchAndParse(url, zProductPaginatedSchema);
	},
	fetchBySubCategorySlug(
		sub_category_slug: string,
	): Promise<ProductPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?sub_category_slug=${sub_category_slug}`;
		return fetchAndParse(url, zProductPaginatedSchema);
	},
	fetchStatsBySubCategorySlug(
		sub_category_slug: string,
	): Promise<ProductWithStatsSchema[]> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/stats/sub-category/${sub_category_slug}`;
		return fetchAndParse(url, zProductWithStatsSchema.array());
	},
	// -------------------------------
	// Facets
	// -------------------------------
	async fetchFacetsPerCategory(): Promise<Record<string, number>> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/facets/categories`;
		const res = await fetch(url);
		const text = await res.text();
		return JSON.parse(text) as Record<string, number>;
	},

	async fetchFacetsPerSubCategory(
		category_id: string,
	): Promise<Record<string, number>> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/facets/sub-categories?category_id=${category_id}`;
		const res = await fetch(url);
		const text = await res.text();
		return JSON.parse(text) as Record<string, number>;
	},
	fetchCount(
		sub_category_id?: string,
		is_deleted: boolean = false,
	): Promise<CountSchema> {
		const params = new URLSearchParams();
		if (sub_category_id) params.set("sub_category_id", sub_category_id);
		params.set("is_deleted", String(is_deleted));
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count?${params.toString()}`;
		return fetchAndParse(url, zCountSchema);
	},
};
