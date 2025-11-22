import { z } from "zod";

import { zPaginatedSchema } from "@/lib/schemas/commonSchema";
import { zSubCategorySchema } from "@/lib/schemas/subCategorySchema";

const zProductBaseSchema = z.object({
	name: z.string().min(1, "Название не может быть пустым"),
	cross_number: z.string().nullable(),
	sub_category_id: z.string(),
});

export const zProductPostSchema = zProductBaseSchema.extend({});

export const zProductPutSchema = zProductBaseSchema.extend({
	name: z.string().min(1, "Название не может быть пустым"),
});

export const zProductSchema = zProductBaseSchema.extend({
	id: z.uuid(),
	bitrix_id: z.string().optional().nullable(),
	slug: z.string().nullable(),
	image_url: z.url(),
	sub_category: zSubCategorySchema,
});

export const zProductPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zProductSchema),
});

/** TypeScript helper */
export type ProductPutSchema = z.infer<typeof zProductPutSchema>;
export type ProductPostSchema = z.infer<typeof zProductPostSchema>;
export type ProductSchema = z.infer<typeof zProductSchema>;
export type ProductPaginatedSchema = z.infer<typeof zProductPaginatedSchema>;
