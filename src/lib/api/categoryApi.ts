import {
	fetchEntity,
	fetchEntityById,
	fetchEntityBySlug,
} from "@/lib/api/generic/fetchEntity";
import {
	type CategoryPaginatedSchema,
	type CategorySchema,
	zCategoryPaginatedSchema,
	zCategorySchema,
} from "@/lib/schemas/categorySchema";

const ENTITY = "categories";

export const categoriesApi = {
	// -------------------------------
	// Fetchers
	// -------------------------------
	fetchAll(): Promise<CategoryPaginatedSchema> {
		return fetchEntity<CategoryPaginatedSchema>(
			zCategoryPaginatedSchema,
			ENTITY,
		);
	},
	fetchById(id: string): Promise<CategorySchema> {
		return fetchEntityById<CategorySchema>(id, zCategorySchema, ENTITY);
	},
	fetchBySlug(slug: string): Promise<CategorySchema> {
		return fetchEntityBySlug<CategorySchema>(slug, zCategorySchema, ENTITY);
	},
};
