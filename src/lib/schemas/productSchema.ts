import { z } from "zod";

import { zPaginatedSchema } from "@/lib/schemas/commonSchema";
import { zSubCategorySchema } from "@/lib/schemas/subCategorySchema";

const zProductBaseSchema = z.object({
	name: z.string().min(1, "Название не может быть пустым"),
	cross_number: z.string().nullable(),
	sub_category_id: z.string(),
});

export const zProductSchema = zProductBaseSchema.extend({
	id: z.uuid(),
	slug: z.string(),
	image_url: z.url(),
	total_quantity: z.number(),
	min_price_rub: z.number().nullable(),
	sub_category: zSubCategorySchema,
	created_at: z.iso.datetime(),
	updated_at: z.iso.datetime(),
});

export const zProductPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zProductSchema),
});

/** TypeScript helper */
export type ProductSchema = z.infer<typeof zProductSchema>;
export type ProductPaginatedSchema = z.infer<typeof zProductPaginatedSchema>;
