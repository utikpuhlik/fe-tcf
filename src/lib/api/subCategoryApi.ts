import { env } from "@/env";
import {
	fetchEntity,
	fetchEntityById,
	fetchEntityBySlug,
} from "@/lib/api/generic/fetchEntity";
import { fetchAndParse } from "@/lib/api/utils/fetchJson";
import {
	type SubCategoryPaginatedSchema,
	zSubCategoryPaginatedSchema,
} from "@/lib/schemas/subCategorySchema";
import {
	type SubCategorySchema,
	zSubCategorySchema,
} from "../schemas/subCategorySchema";

const ENTITY = "sub-categories";

export const subCategoriesApi = {
	// -------------------------------
	// Fetchers
	// -------------------------------
	fetchAll(): Promise<SubCategoryPaginatedSchema> {
		return fetchEntity<SubCategoryPaginatedSchema>(
			zSubCategoryPaginatedSchema,
			ENTITY,
		);
	},
	fetchById(id: string): Promise<SubCategorySchema> {
		return fetchEntityById<SubCategorySchema>(id, zSubCategorySchema, ENTITY);
	},
	fetchBySlug(slug: string): Promise<SubCategorySchema> {
		return fetchEntityBySlug<SubCategorySchema>(
			slug,
			zSubCategorySchema,
			ENTITY,
		);
	},
	fetchByCategoryId(category_id: string): Promise<SubCategoryPaginatedSchema> {
		const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?category_id=${category_id}&order_by=name`;
		return fetchAndParse(url, zSubCategoryPaginatedSchema);
	},
};
