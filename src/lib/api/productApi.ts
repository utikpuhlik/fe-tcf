import { env } from "@/env";
import {
	fetchEntity,
	fetchEntityById,
	fetchEntityBySlug,
} from "@/lib/api/generic/fetchEntity";
import { apiRequest } from "@/lib/api/generic/request";
import { fetchAndParse } from "@/lib/api/utils/fetchJson";
import {
	type ProductPaginatedSchema,
	type ProductSchema,
	zProductPaginatedSchema,
	zProductSchema,
} from "@/lib/schemas/productSchema";

const ENTITY = "products";

export const productsApi = {
	// -------------------------------
	// Fetchers
	// -------------------------------
	fetchAll(): Promise<ProductPaginatedSchema> {
		return fetchEntity<ProductPaginatedSchema>(zProductPaginatedSchema, ENTITY);
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
	// -------------------------------
	// POST
	// -------------------------------
	post(data: FormData): Promise<ProductSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}`;
		return apiRequest(url, { method: "POST", body: data }, zProductSchema);
	},

	// -------------------------------
	// PATCH
	// -------------------------------
	patch(id: string, data: FormData): Promise<ProductSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`;
		return apiRequest(url, { method: "PATCH", body: data }, zProductSchema);
	},

	// -------------------------------
	// DELETE
	// -------------------------------
	delete(id: string): Promise<void> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`;
		return apiRequest(url, { method: "DELETE" }, null);
	},
};
