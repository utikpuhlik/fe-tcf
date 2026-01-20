import { z } from "zod";

import { zPaginatedSchema } from "@/lib/schemas/commonSchema";

export const zCategoryBaseSchema = z.object({
	name: z.string().min(1, "Название не может быть пустым"),
});

export const zCategorySchema = zCategoryBaseSchema.extend({
	id: z.uuid(),
	slug: z.string(),
	image_url: z.url(),
	created_at: z.iso.datetime(),
	updated_at: z.iso.datetime(),
});

export const zCategoryPostSchema = zCategoryBaseSchema.extend({});

export const zCategoryPutSchema = zCategoryBaseSchema.extend({});
export const zCategoryPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zCategorySchema),
});

/** TypeScript helper */
export type CategoryPostSchema = z.infer<typeof zCategoryPostSchema>;
export type CategoryPutSchema = z.infer<typeof zCategoryPutSchema>;
export type CategorySchema = z.infer<typeof zCategorySchema>;
export type CategoryPaginatedSchema = z.infer<typeof zCategoryPaginatedSchema>;
