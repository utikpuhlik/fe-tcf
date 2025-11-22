import { z } from "zod";

import { zPaginatedSchema } from "@/lib/schemas/commonSchema";
import { zProductSchema } from "@/lib/schemas/productSchema";

export const zOfferBaseSchema = z.object({
	sku: z.string().nullable(),
	brand: z.string().min(1, "Бренд не может быть пустым"),
	internal_description: z.string().nullable(),
	manufacturer_number: z
		.string()
		.min(1, "Номер производителя не может быть пустым"),
	price_rub: z.number().nonnegative({
		error: "Цена не может быть меньше нуля",
	}),
	super_wholesale_price_rub: z.number().nonnegative({
		error: "Цена не может быть меньше нуля",
	}),
	product_id: z.uuid(),
});

export const zOfferSchema = zOfferBaseSchema.extend({
	id: z.uuid(),
	offer_bitrix_id: z.string().nullable().optional(),
	image_url: z.url(),
	quantity: z.number().int({ error: "Поле должно быть целым числом" }),
	product: zProductSchema,
	wholesale_price_rub: z.number().nonnegative(),
});

export const zOfferPostSchema = zOfferBaseSchema.extend({});

export const zOfferPutSchema = zOfferBaseSchema.extend({});

export const zOfferPaginatedSchema = zPaginatedSchema.extend({
	items: z.array(zOfferSchema),
});

/** TypeScript helper */
export type OfferSchema = z.infer<typeof zOfferSchema>;
export type OfferPostSchema = z.infer<typeof zOfferPostSchema>;
export type OfferPutSchema = z.infer<typeof zOfferPutSchema>;
export type OfferPaginatedSchema = z.infer<typeof zOfferPaginatedSchema>;
