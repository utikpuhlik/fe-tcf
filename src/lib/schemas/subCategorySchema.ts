import { z } from "zod";

import { zCategorySchema } from "@/lib/schemas/categorySchema";
import { zPaginatedSchema } from "@/lib/schemas/commonSchema";

export const zSubCategoryBaseSchema = z.object({
	name: z.string().min(1, "Название не может быть пустым"),
	category_id: z.string(),
});
export const zSubCategorySchema = zSubCategoryBaseSchema.extend({
	id: z.string(),
	slug: z.string(),
	category: zCategorySchema,
	image_url: z.url(),
});
export const zSubCategoryArraySchema = z.array(zSubCategorySchema);
export const zSubCategoryPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zSubCategorySchema),
});
export const zSubCategoryPostSchema = zSubCategoryBaseSchema.extend({});
export const zSubCategoryPutSchema = zSubCategoryBaseSchema.extend({});

/** TypeScript helper */
export type SubCategorySchema = z.infer<typeof zSubCategorySchema>;
export type SubCategoryPaginatedSchema = z.infer<
	typeof zSubCategoryPaginatedSchema
>;
export type SubCategoryPostSchema = z.infer<typeof zSubCategoryPostSchema>;
export type SubCategoryPutSchema = z.infer<typeof zSubCategoryPutSchema>;
